import {
  parseRecurrence,
  updateRecurrenceUntil,
  createRecurrence,
} from './recurrence'

describe('recurrence', () => {
  describe('parseRecurrence', () => {
    it('should parse recurrence', () => {
      const recurrence = 'RRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20230908T145800Z'

      const result = parseRecurrence(recurrence)

      expect(result).toEqual({
        FREQ: 'WEEKLY',
        INTERVAL: 2,
        UNTIL: '20230908T145800Z',
      })
    })

    it('should throw error if invalid recurrence', () => {
      const recurrence = 'FREQ=WEEKLY;INTERVAL=2'

      expect(() => parseRecurrence(recurrence)).toThrowError(
        'Invalid recurrence'
      )
    })

    it('should throw error if invalid recurrence', () => {
      const recurrence = 'RRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL'

      expect(() => parseRecurrence(recurrence)).toThrowError(
        'Invalid recurrence'
      )
    })

    it('should parse recurrence with scrambled order', () => {
      const recurrence = 'RRULE:INTERVAL=2;FREQ=WEEKLY;UNTIL=20230908T145800Z'

      const result = parseRecurrence(recurrence)

      expect(result).toEqual({
        FREQ: 'WEEKLY',
        INTERVAL: 2,
        UNTIL: '20230908T145800Z',
      })
    })
  })

  describe('updateRecurrenceUntil', () => {
    it('should update recurrence until', () => {
      const recurrence = 'RRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20230908T145800Z'

      const result = updateRecurrenceUntil(
        recurrence,
        '2023-09-08T14:58:00.000Z'
      )

      expect(result).toEqual(
        'RRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20230908T145800Z'
      )
    })
  })

  describe('createRecurrence', () => {
    it('should create recurrence', () => {
      const result = createRecurrence({
        FREQ: 'WEEKLY',
        INTERVAL: 2,
        UNTIL: '2023-09-08T14:58:00.000Z',
      })

      expect(result).toEqual(
        'RRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20230908T145800Z'
      )
    })
  })
})
