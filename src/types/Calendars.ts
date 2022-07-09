import { calendar_v3 } from 'googleapis'

import type { BasicApiResponse } from 'LocalTypes'

export type CalendarList = calendar_v3.Schema$CalendarList

export type CalendarEntry = calendar_v3.Schema$CalendarListEntry

export type ResponseCalendarList = BasicApiResponse & {
  tokenId?: string,
  calendars?: {
    data: CalendarList
  }
}