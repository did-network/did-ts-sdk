import { ParsedAccount } from '../models/account'
import { AccountChangeCallback, AccountInfo, Connection, PublicKey } from '@solana/web3.js'
import emitter from './EventEmitter'
import { parsePubkey } from '../utils/parsePubkey'
import { Buffer } from 'buffer'

type AccountParser = (pubkey: PublicKey, data: AccountInfo<Buffer>) => ParsedAccount | undefined
type AccountAddress = string

const pendingCalls = new Map<AccountAddress, Promise<ParsedAccount | undefined>>()
const accountCache = new Map<AccountAddress, ParsedAccount>()
const accountChangeCallbacks = new Map<AccountAddress, { id: number; callback: AccountChangeCallback }>()
const accountParsers = new Map<AccountAddress, AccountParser>()
let cachedConnection: Connection | undefined = undefined

async function query(connection: Connection, pubKey: string | PublicKey) {
  const { address, pubkey } = parsePubkey(pubKey)

  const account = accountCache.get(address)
  if (account) {
    return account
  }

  const pending = pendingCalls.get(address)
  if (pending) {
    return pending
  }

  const query = connection.getAccountInfo(pubkey).then(data => {
    if (!data) {
      throw new Error('Account not found')
    }
    return add(connection, pubkey, data)
  })

  pendingCalls.set(address, query)
  return query
}

function add(connection: Connection, pubKey: PublicKey | string, accountInfo: AccountInfo<Buffer>) {
  const { address, pubkey } = parsePubkey(pubKey)

  pendingCalls.delete(address)

  const parser = accountParsers.get(address)
  if (!parser) {
    throw new Error(`Parser needs to be registered: ${address}`)
  }

  const account = parser(pubkey, accountInfo)
  if (!account) {
    return
  }

  accountCache.set(address, account)

  if (!accountChangeCallbacks.has(address)) {
    const callback = (info: AccountInfo<Buffer>) => {
      console.log('cache | onAccountChange callback:', address)
      add(connection, address, info)
    }
    console.log('cache | add onAccountChange:', address)
    const subId = connection.onAccountChange(pubkey, callback)
    accountChangeCallbacks.set(address, { id: subId, callback })
  }
  emitter.raiseCacheUpdated(address)

  return account
}

function get(pubKey: string | PublicKey) {
  const { address } = parsePubkey(pubKey)
  return accountCache.get(address)
}

function registerParser(pubKey: string | PublicKey, parser: AccountParser) {
  const { address } = parsePubkey(pubKey)
  accountParsers.set(address, parser)
  return address
}

function remove(connection: Connection, pubKey: string | PublicKey) {
  const { address } = parsePubkey(pubKey)

  const cachedCallback = accountChangeCallbacks.get(address)
  if (cachedCallback) {
    connection.removeAccountChangeListener(cachedCallback.id).catch(console.error)
    accountChangeCallbacks.delete(address)
  }

  if (accountCache.has(address)) {
    accountCache.delete(address)
  }

  emitter.raiseCacheDeleted(address)
}

function resetConnection(connection: Connection) {
  if (cachedConnection && connection && cachedConnection !== connection) {
    console.info('cache | connection changed')
    accountChangeCallbacks.forEach(({ id, callback }, address) => {
      cachedConnection?.removeAccountChangeListener(id).catch(console.error)
      const subId = connection.onAccountChange(new PublicKey(address), callback)
      accountChangeCallbacks.set(address, { id: subId, callback })
    })
  }
  cachedConnection = connection
}

export const cache = {
  query,
  add,
  remove,
  get,
  registerParser,
  resetConnection,
  onCacheUpdate: emitter.onCacheUpdate,
  onCacheDelete: emitter.onCacheDelete,
}
