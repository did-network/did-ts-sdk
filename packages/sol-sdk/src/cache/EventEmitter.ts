import { EventEmitter as Emitter } from 'eventemitter3'

export const CACHE_UPDATE = 'CacheUpdate'
export const CACHE_DELETE = 'CacheDelete'

const emitter = new Emitter()

export default {
  onCacheUpdate: (callback: (address: string) => void) => {
    emitter.on(CACHE_UPDATE, callback)
    return () => emitter.removeListener(CACHE_UPDATE, callback)
  },
  raiseCacheUpdated: (address: string) => {
    emitter.emit(CACHE_UPDATE, address)
  },
  onCacheDelete: (callback: (address: string) => void) => {
    emitter.on(CACHE_DELETE, callback)
    return () => emitter.removeListener(CACHE_DELETE, callback)
  },
  raiseCacheDeleted: (address: string) => {
    emitter.emit(CACHE_DELETE, address)
  },
}
