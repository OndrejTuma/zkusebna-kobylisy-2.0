import { calendar_v3 } from 'googleapis'

import Schema$Event = calendar_v3.Schema$Event

export type CalendarEvents = {
  data: {
    items: Schema$Event[]
  }
}