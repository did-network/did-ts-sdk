import BigNumber from 'bignumber.js'

export const ZERO = new BigNumber(0)
export const TWO = new BigNumber(2)
export const TEN = new BigNumber(10)
export const HUNDRED = new BigNumber(100)

export const FLOAT_DECIMAL = 6

export const TEN_POW = (decimal: number) => new BigNumber(10).pow(decimal)

export const MaxUint64: BigNumber = TWO.pow(64).minus(1)
export const MaxUint256: BigNumber = new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
export const MaxInt256: BigNumber = new BigNumber('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
export const MinInt256: BigNumber = new BigNumber('-0x8000000000000000000000000000000000000000000000000000000000000000')
