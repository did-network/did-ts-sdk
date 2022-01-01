import { AccountInfo, Commitment } from '@solana/web3.js'

export async function getMultipleAccounts(connection: any, keys: string[], commitment: Commitment) {
  const args = connection._buildArgs([keys], commitment, 'base64')

  const unsafeRes = await connection._rpcRequest('getMultipleAccounts', args)
  if (unsafeRes.error) {
    throw new Error('failed to get info about account ' + unsafeRes.error.message)
  }
  if (!unsafeRes.result.value) {
    throw new Error()
  }

  const accounts = unsafeRes.result.value as AccountInfo<string[]>[]
  return accounts.map((i) => {
    if (!i) {
      return undefined
    }
    const { data, ...rest } = i
    return {
      ...rest,
      data: Buffer.from(data[0], 'base64'),
    } as AccountInfo<Buffer>
  })
}
