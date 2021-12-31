import { PublicKey } from '@solana/web3.js'

export function parsePubkey(pubKey: PublicKey | string) {
  const key = typeof pubKey === 'string' ? new PublicKey(pubKey) : pubKey
  return {
    pubkey: key,
    address: key.toBase58(),
  }
}
