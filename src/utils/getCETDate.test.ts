import timezoneMock from 'timezone-mock'

import getCETDate from './getCETDate'

describe('getCETDate', () => {
  const dateString = '2023-03-07T16:00:00+01:00' // 16hr CET
  const dateString2 = '2023-04-13T12:00:00.000Z' // 14hr CET

  afterEach(() => {
    timezoneMock.unregister()
  })

  it('returns CET date from UTC timezone', () => {
    timezoneMock.register('UTC')

    const result = getCETDate(dateString)
    const result2 = getCETDate(dateString2)

    expect(result.getHours()).toEqual(16)
    expect(result2.getHours()).toEqual(14)
  })

  it('returns CET date from Brazil timezone', () => {
    timezoneMock.register('Brazil/East')

    const result = getCETDate(dateString)
    const result2 = getCETDate(dateString2)

    expect(result.getHours()).toEqual(16)
    expect(result2.getHours()).toEqual(14)
  })

  it('returns CET date from Australia timezone', () => {
    timezoneMock.register('Australia/Adelaide')

    const result = getCETDate(dateString)
    const result2 = getCETDate(dateString2)

    expect(result.getHours()).toEqual(16)
    expect(result2.getHours()).toEqual(14)
  })

  it('returns CET date from London timezone', () => {
    timezoneMock.register('Europe/London')

    const result = getCETDate(dateString)
    const result2 = getCETDate(dateString2)

    expect(result.getHours()).toEqual(16)
    expect(result2.getHours()).toEqual(14)
  })

  it('returns CET date from US Eastern timezone', () => {
    timezoneMock.register('US/Eastern')

    const result = getCETDate(dateString)
    const result2 = getCETDate(dateString2)

    expect(result.getHours()).toEqual(16)
    expect(result2.getHours()).toEqual(14)
  })
})
