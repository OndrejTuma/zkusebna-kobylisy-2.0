import { ResponseCalendarList } from './Calendars'

export type ResponseAuthToken = ResponseCalendarList & {
  tokenId: string,
}

export type ResponseAuthUrl = {
  url: string
}