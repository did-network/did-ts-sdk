export const shorten = (
  str?: string | null,
  start: number = 4,
  end: number = 4
): string => {
  if (!str) {
    return ''
  }
  if (str.length <= start + end) {
    return str
  }

  return str.slice(0, start) + '...' + str.slice(-end)
}
