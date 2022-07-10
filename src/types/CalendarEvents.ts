import { calendar_v3 } from 'googleapis'

export type CalendarEvent = calendar_v3.Schema$Event
export type CalendarEvents = calendar_v3.Schema$Events

export type ResponseCalendarEvents = {
  events: {
    data: CalendarEvents
  },
}