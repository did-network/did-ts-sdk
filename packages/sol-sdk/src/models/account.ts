import { AccountInfo, PublicKey } from '@solana/web3.js'
import { AccountInfo as TokenAccountInfo } from '@solana/spl-token'

export interface ParsedAccount<T = any> {
  pubkey: PublicKey
  account: AccountInfo<Buffer>
  info: T
}

export type TokenAccount = ParsedAccount<TokenAccountInfo>
