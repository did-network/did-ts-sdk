import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { AbstractConnector } from '@web3-react/abstract-connector'

export interface WalletInfo {
  connector?: AbstractConnector,
  name: string,
  show: boolean,
}

export function getSupportedWallets(chainIds: number[]) {
  const isMetaMask = !!window.ethereum?.isMetaMask
  const isImToken = !!window.ethereum?.isImToken

  const injected = new InjectedConnector({ supportedChainIds: chainIds })
  const walletConnect = new WalletConnectConnector({ rpc: {}, qrcode: true })
  const wallets: { [key: string]: WalletInfo } = {
    METAMASK: {
      connector: injected,
      name: 'MetaMask',
      show: isMetaMask,
    },
    IMTOKEN: {
      connector: injected,
      name: 'imToken',
      show: isImToken,
    },
    WALLET_CONNECT: {
      connector: walletConnect,
      name: 'WalletConnect',
      show: true,
    },
  }
  return {
    wallets,
    isMetaMask,
    isImToken,
    injected,
    walletConnect,
  }
}
