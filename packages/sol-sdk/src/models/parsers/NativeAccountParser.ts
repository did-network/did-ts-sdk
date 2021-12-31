import { AccountInfo, PublicKey } from '@solana/web3.js'
import { u64 } from '@solana/spl-token'
import { ParsedAccount, TokenAccount } from '../account'
import { WRAPPED_SOL_MINT } from '@project-serum/serum/lib/token-instructions'

export const NativeAccountParser = (pubKey: PublicKey, account: AccountInfo<Buffer>): ParsedAccount<TokenAccount> => {
  const data = wrapNativeAccount(pubKey, account)
  return {
    pubkey: pubKey,
    account: { ...account },
    info: data,
  }
}

function wrapNativeAccount(pubKey: PublicKey, account: AccountInfo<Buffer>): TokenAccount {
  return {
    pubkey: pubKey,
    account,
    info: {
      address: pubKey,
      mint: WRAPPED_SOL_MINT,
      owner: pubKey,
      amount: new u64(account.lamports),
      delegate: null,
      delegatedAmount: new u64(0),
      isInitialized: true,
      isFrozen: false,
      isNative: true,
      rentExemptReserve: null,
      closeAuthority: null,
    },
  }
}
