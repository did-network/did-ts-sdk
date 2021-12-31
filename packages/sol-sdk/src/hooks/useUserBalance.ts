import { Connection, PublicKey } from '@solana/web3.js'
import { useNativeAccount } from './useNativeAccount'
import BigNumber from 'bignumber.js'
import { useTokenAccount } from './useTokenAccount'
import { useMemo } from 'react'
import { isWrapperSol } from '../utils/isWrapperSol'

export function useUserBalance(connection: Connection, walletPubkey: PublicKey | null, mintAddress?: string) {
  const { lamports: solLamports } = useNativeAccount(connection, walletPubkey)
  const tokenAccount = useTokenAccount(connection, walletPubkey, mintAddress)

  const lamportsNumber = useMemo(() => {
    return isWrapperSol(mintAddress) ? solLamports : tokenAccount?.info.amount.toString()
  }, [mintAddress, solLamports, tokenAccount])

  return {
    balance: lamportsNumber ? new BigNumber(lamportsNumber) : undefined,
  }
}
