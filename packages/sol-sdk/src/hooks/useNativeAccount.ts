import { useEffect, useState } from 'react'
import { TokenAccount } from '../models/account'
import { cache } from '../cache'
import { Connection, PublicKey } from '@solana/web3.js'
import { NativeAccountParser } from '../models/parsers/NativeAccountParser'

export function useNativeAccount(connection: Connection, walletPubkey: PublicKey | null) {
  const [account, setAccount] = useState<TokenAccount>()

  useEffect(() => {
    if (walletPubkey) {
      const walletAddress = walletPubkey.toBase58()
      setAccount(cache.get(walletAddress))
      const dispose = cache.onCacheUpdate(address => {
        if (address === walletAddress) {
          setAccount(cache.get(walletAddress))
        }
      })
      cache.registerParser(walletAddress, NativeAccountParser)
      cache.query(connection, walletAddress).then()
      return () => {
        dispose()
      }
    } else {
      setAccount(undefined)
    }
  }, [walletPubkey, connection])

  return { account, lamports: account?.account.lamports }
}
