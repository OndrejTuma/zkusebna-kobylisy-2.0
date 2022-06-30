import { calendar_v3 } from 'googleapis'

import type { BasicApiResponse } from 'LocalTypes'

import Schema$Event = calendar_v3.Schema$Event

export type CalendarEvents = {
  data: {
    items: Schema$Event[]
  }
}

export type ResponseCalendarEvents = BasicApiResponse & {
  events: CalendarEvents | null,
}