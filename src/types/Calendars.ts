import { calendar_v3 } from '@googleapis/calendar'

export type CalendarList = calendar_v3.Schema$CalendarList

export type CalendarEntry = calendar_v3.Schema$CalendarListEntry

export type RequestSetCalendarId = {
  calendarId: string,
  tokenId: string,
}

export type ResponseCalendarList = {
  calendars: {
    data: CalendarList
  }
}