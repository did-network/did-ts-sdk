import { AccountInfo, PublicKey } from '@solana/web3.js'
import { MintInfo, MintLayout, u64 } from '@solana/spl-token'
import { ParsedAccount } from '../account'

export const MintParser = (pubKey: PublicKey, account: AccountInfo<Buffer>): ParsedAccount<MintInfo> => {
  return {
    pubkey: pubKey,
    account: { ...account },
    info: deserializeMint(account.data),
  }
}

const deserializeMint = (data: Buffer) => {
  if (data.length !== MintLayout.span) {
    throw new Error(`Not a valid Mint. data.length: ${data.length}, MintLayout.span: ${MintLayout.span}`)
  }

  const mintInfo = MintLayout.decode(data)

  if (mintInfo.mintAuthorityOption === 0) {
    mintInfo.mintAuthority = null
  } else {
    mintInfo.mintAuthority = new PublicKey(mintInfo.mintAuthority)
  }

  mintInfo.supply = u64.fromBuffer(mintInfo.supply)
  mintInfo.isInitialized = mintInfo.isInitialized !== 0

  if (mintInfo.freezeAuthorityOption === 0) {
    mintInfo.freezeAuthority = null
  } else {
    mintInfo.freezeAuthority = new PublicKey(mintInfo.freezeAuthority)
  }

  return mintInfo as MintInfo
}
