import { PublicKey } from '@solana/web3.js'
import { WRAPPED_SOL_MINT } from '@project-serum/serum/lib/token-instructions'

export function isWrapperSol(mint: PublicKey | string | undefined | null) {
  const address = typeof mint === 'string' ? mint : mint?.toBase58()
  return address === WRAPPED_SOL_MINT.toBase58()
}
