import timezoneMock from 'timezone-mock'

import getCETDate from './getCETDate'

describe('getCETDate', () => {
  const dateString = '2023-03-07T16:00:00+01:00'

  afterEach(() => {
    timezoneMock.unregister()
  })

  it('returns CET date from UTC timezone', () => {
    timezoneMock.register('UTC')

    const result = getCETDate(dateString)

    expect(result.getHours()).toEqual(16)
  })

  it('returns CET date from Brazil timezone', () => {
    timezoneMock.register('Brazil/East')

    const result = getCETDate(dateString)

    expect(result.getHours()).toEqual(16)
  })
})
