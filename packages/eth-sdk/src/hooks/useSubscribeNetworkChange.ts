import { useEffect } from 'react'
import { useEthers } from '@usedapp/core'
import { InjectedConnector } from '@web3-react/injected-connector'

export function useSubscribeNetworkChange(injected: InjectedConnector) {
  const { active, error, activate } = useEthers()

  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = () => {
        activate(injected).catch((error) => {
          console.error('Failed to activate after chain changed', error)
        })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(injected).catch((error) => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
  }, [active, error, activate])
}
