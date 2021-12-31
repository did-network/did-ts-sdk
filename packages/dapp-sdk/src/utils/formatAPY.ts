import BigNumber from 'bignumber.js'

export const formatAPY = (balance?: string | number | null): string => {
  const bn = new BigNumber(balance ?? '')
  if (bn.isNaN()) {
    return '-'
  }
  return bn.times(100).toFixed(2)
}
