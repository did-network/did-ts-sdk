import { cache, getMultipleAccounts, NativeAccountParser } from '../src'
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { devAccount } from './constants'

const connection = new Connection(clusterApiUrl('devnet'), { commitment: 'confirmed' })
const devWallet = devAccount.publicKey.toBase58()
const toWallet = new PublicKey('AAWzpYNhp6YGXME3E8JLgk8fvKC3akDAZZtk9XFGD38B')

describe('cache tests', () => {
  it('native account', async () => {
    cache.registerParser(devWallet, NativeAccountParser)
    const [account] = await getMultipleAccounts(connection, [devWallet], 'single')

    let resultCount = 0
    cache.onCacheUpdate(address => {
      if (address === devWallet) {
        resultCount += 1
      }
    })
    await cache.add(connection, devWallet, account!)
    expect(resultCount).toBe(1)

    let tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: devAccount.publicKey,
        toPubkey: toWallet,
        lamports: 1,
      })
    )
    const sign = await connection.sendTransaction(tx, [devAccount])
    await connection.confirmTransaction(sign)

    await new Promise(r => setTimeout(r, 2000))

    expect(resultCount).toBe(2)
  })
})
