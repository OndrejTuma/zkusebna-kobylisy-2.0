import { calendar_v3 } from 'googleapis'

import type { BasicApiResponse } from 'LocalTypes'

export type CalendarEvent = calendar_v3.Schema$Event
export type CalendarEvents = calendar_v3.Schema$Events

export type ResponseCalendarEvents = BasicApiResponse & {
  events?: {
    data: CalendarEvents
  },
}