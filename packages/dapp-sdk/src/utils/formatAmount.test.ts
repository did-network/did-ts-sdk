import { formatAmount } from '../index'

type TestCase = [string, number, number | undefined, string]

describe('formatAmount', () => {
  it('should work for 0', () => {
    const cases: TestCase[] = [
      ['0', 0, 1, '0.0'],
      ['0', 0, 2, '0.00'],
      ['0', 0, 3, '0.000'],
      ['0', 0, undefined, '0.00'],
    ]
    cases.forEach(([input, decimals, fixed, expectedOutput]) => {
      const output = formatAmount(input, decimals, fixed)
      expect(output).toBe(expectedOutput)
    })
  })

  it('should work when number is less than fixed', () => {
    const cases: TestCase[] = [
      ['0.000000123', 0, 1, '0.0'],
      ['0.000000456', 0, 2, '0.00'],
      ['0.000000789', 0, 3, '0.000'],
      ['0.000000999', 0, undefined, '0.00'],
    ]

    cases.forEach(([input, decimals, fixed, expectedOutput]) => {
      const output = formatAmount(input, decimals, fixed)
      expect(output).toBe(expectedOutput)
    })
  })

  it('should work for number less than 1', () => {
    const cases: TestCase[] = [
      ['0.05', 0, 1, '0.0'],
      ['0.05', 0, 2, '0.05'],
      ['0.05', 0, 3, '0.050'],
      ['0.056789', 0, 3, '0.056'],
      ['0.056789', 0, undefined, '0.0567'],
    ]
    cases.forEach(([input, decimals, fixed, expectedOutput]) => {
      const output = formatAmount(input, decimals, fixed)
      expect(output).toBe(expectedOutput)
    })
  })

  it('should work when number is less than 1000', () => {
    const cases: TestCase[] = [
      ['1', 0, 0, '1'],
      ['1', 0, 1, '1.0'],
      ['1', 0, 2, '1.00'],
      ['9.99', 0, 4, '9.9900'],
      ['9.999999', 0, undefined, '9.99'],
      ['11.12', 0, 0, '11'],
      ['11.12', 0, 1, '11.1'],
      ['11.12', 0, 2, '11.12'],
      ['11.12', 0, 3, '11.120'],
      ['12.99999', 0, 4, '12.9999'],
      ['12.999999', 0, undefined, '12.99'],
      ['123.999999', 0, undefined, '123.99'],
    ]
    cases.forEach(([input, decimals, fixed, expectedOutput]) => {
      const output = formatAmount(input, decimals, fixed)
      expect(output).toBe(expectedOutput)
    })
  })

  it('should give expected result when number is greater than 1000', () => {
    const cases: TestCase[] = [
      ['12345.6789', 0, 0, '12,346'],
      ['12345.6789', 0, 1, '12,345.7'],
      ['12345.6789', 0, 2, '12,345.68'],
      ['12345.67', 0, 4, '12,345.6700'],
      ['1234.6789', 0, undefined, '1,234.68'],
      ['12345.6789', 0, undefined, '12,345.68'],
      ['123456.6789', 0, undefined, '123,456.68'],
      ['1234567.6789', 0, undefined, '1,234,568'],
      ['12345678.6789', 0, undefined, '12,345,679'],
      ['123456789.6789', 0, undefined, '123,456,790'],
    ]
    cases.forEach(([input, decimals, fixed, expectedOutput]) => {
      const output = formatAmount(input, decimals, fixed)
      expect(output).toBe(expectedOutput)
    })
  })

  it('should give expected result for decimals', () => {
    const cases: TestCase[] = [
      ['12345678', 4, 6, '1,234.567800'],
      ['1234567890', 4, 2, '123,456.79'],
    ]
    cases.forEach(([input, decimals, fixed, expectedOutput]) => {
      const output = formatAmount(input, decimals, fixed)
      expect(output).toBe(expectedOutput)
    })
  })
})
