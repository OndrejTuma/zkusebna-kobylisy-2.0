import { RecurrenceType } from 'LocalTypes'
import convertToGoogleCalendarUntil from './convertToGoogleCalendarUntil'

// Composed based on recurring event rules https://developers.google.com/calendar/api/concepts/events-calendars#recurring_events
export const createRecurrence = ({ FREQ, INTERVAL, UNTIL }: RecurrenceType) => {
  return `RRULE:FREQ=${FREQ};INTERVAL=${INTERVAL};UNTIL=${convertToGoogleCalendarUntil(
    UNTIL
  )}`
}

export const parseRecurrence = (recurrence: string): RecurrenceType => {
  const rules = recurrence.split(':').pop()

  if (!rules) {
    throw new Error('Invalid recurrence')
  }

  const { FREQ, INTERVAL, UNTIL } = rules.split(';').reduce((acc, rule) => {
    const [key, value] = rule.split('=')

    return {
      ...acc,
      [key]: value,
    }
  }, {} as Record<string, string>)

  if (!FREQ || !INTERVAL || !UNTIL) {
    throw new Error('Invalid recurrence')
  }

  return {
    FREQ: FREQ as RecurrenceType['FREQ'],
    INTERVAL: parseInt(INTERVAL) as RecurrenceType['INTERVAL'],
    UNTIL,
  }
}

export const updateRecurrenceUntil = (
  recurrence: string,
  UNTIL: RecurrenceType['UNTIL']
) => {
  const { FREQ, INTERVAL } = parseRecurrence(recurrence)

  return createRecurrence({ FREQ, INTERVAL, UNTIL })
}
