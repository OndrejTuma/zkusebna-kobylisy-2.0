import setTimeFromDateToDate from './setTimeFromDateToDate'

describe('setTimeFromDateToDate', () => {
  it('should set time from date to date', () => {
    const fromDate = new Date('2021-05-24T11:00:00.000Z')
    const toDate = new Date('2021-04-22T08:12:12.999Z')

    const result = setTimeFromDateToDate(fromDate, toDate)

    expect(result).toEqual(new Date('2021-04-22T11:00:00.000Z'))
  })
})
