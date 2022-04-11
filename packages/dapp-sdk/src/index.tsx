import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
  ROUNDING_MODE: BigNumber.ROUND_FLOOR,
})

export * from './constants/math'

export * from './hooks/useCryptoBan'
export * from './hooks/useFetch'
export * from './hooks/useLocalStorageState'
export * from './hooks/useQuery'
export * from './hooks/usePrevious'
export * from './hooks/useRecursiveTimeout'

export * from './utils/formatAmount'
export * from './utils/formatAPY'
export * from './utils/shorten'
export * from './utils/sendGaEvent'
