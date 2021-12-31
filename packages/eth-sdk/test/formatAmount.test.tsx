import { formatAmount } from '../src'

describe('it', () => {
  it('validate', () => {
    const cases: [string, number, number, string][] = [
      ['0', 0, 0, '0'],
      ['0', 0, 2, '0.00'],
    ]
    cases.forEach(([input, decimals, fixed, expectedOutput]) => {
      const output = formatAmount(input, decimals, fixed)
      expect(output).toBe(expectedOutput)
    })
  })
})
