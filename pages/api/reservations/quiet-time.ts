import { calendar } from '@googleapis/calendar'
import { NextApiRequest, NextApiResponse } from 'next'

import { Filter, parseRAFilters } from 'Lib/filters'
import { NetworkState } from 'LocalTypes'
import getTokenData from 'Utils/api/getTokenData'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'

const [churchCalendarId, libraryCalendarId] = [
  'c_3d6h6nih1uklhsfa95c82076g8@group.calendar.google.com',
  'strediskokobylisy.cz_37bcihcjpu1ho01ofmjr2dk30g@group.calendar.google.com',
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<boolean>>
) {
  console.log('QUIET TIME METHOD', req.method)

  try {
    const { token } = await getTokenData()

    setOAuthCredentials(token)

    const { events } = calendar({ version: 'v3', auth: oAuth2Client })

    switch (req.method) {
      case 'GET':
        const {
          filter: {
            allFilters: { timeMin, timeMax },
          },
        } = parseRAFilters(req.query)

        const churchFilter = new Filter({
          calendarId: churchCalendarId,
          singleEvents: true,
          timeMin,
          timeMax,
        })
        const libraryFilter = new Filter({
          calendarId: libraryCalendarId,
          singleEvents: true,
          timeMin,
          timeMax,
        })

        const {
          data: { items: churchEvents },
        } = await events.list(churchFilter.allFilters)
        const {
          data: { items: libraryEvents },
        } = await events.list(libraryFilter.allFilters)

        const isQuietTime = Boolean([...churchEvents || [], ...libraryEvents || []].length)

        res.status(200).json(isQuietTime)

        break
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
