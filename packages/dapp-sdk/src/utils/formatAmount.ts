import BigNumber from 'bignumber.js'

export const formatAmount = (balance?: any, decimals: number = 0, fixed?: number): string => {
  const bn = new BigNumber(balance?.toString() ?? '')
  if (bn.isNaN()) {
    return '-'
  }

  const displayBalance = bn.div(new BigNumber(10).pow(decimals))

  if (displayBalance.lt(1000)) {
    if (displayBalance.eq(0)) {
      fixed = fixed ?? 2
    }
    if (displayBalance.lt(1)) {
      fixed = fixed ?? 4
    }
    fixed = fixed ?? 2
    return displayBalance.toFixed(fixed, BigNumber.ROUND_FLOOR)
  }

  if (displayBalance.gte(1000000)) {
    fixed = fixed ?? 0
  }

  fixed = fixed ?? 2
  return displayBalance.toNumber().toLocaleString(undefined, { minimumFractionDigits: fixed, maximumFractionDigits: fixed })
}
