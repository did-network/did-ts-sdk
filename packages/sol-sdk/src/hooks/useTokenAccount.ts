import { useEffect, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { TokenAccount } from '../models/account'
import { cache } from '../cache'
import { TokenAccountParser } from '../models/parsers/TokenAccountParser'

export function useTokenAccount(connection: Connection, walletPubkey: PublicKey | null, mintAddress?: string) {
  const [ataPubkey, setAtaPubkey] = useState<PublicKey>()
  const [account, setAccount] = useState<TokenAccount>()

  useEffect(() => {
    ;(async () => {
      if (!mintAddress || !walletPubkey) {
        return
      }
      setAtaPubkey(await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, new PublicKey(mintAddress), walletPubkey))
    })()
  }, [walletPubkey, mintAddress])

  useEffect(() => {
    if (ataPubkey) {
      const ataAddress = ataPubkey.toBase58()
      setAccount(cache.get(ataAddress))
      const dispose = cache.onCacheUpdate((address) => {
        if (address === ataAddress) {
          setAccount(cache.get(ataAddress))
        }
      })
      cache.registerParser(ataAddress, TokenAccountParser)
      cache.query(connection, ataAddress).then()
      return () => {
        dispose()
      }
    } else {
      setAccount(undefined)
    }
  }, [ataPubkey, connection])

  return account
}
