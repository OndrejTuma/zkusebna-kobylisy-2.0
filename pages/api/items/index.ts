import { NetworkFailedState, ReservationItem } from 'LocalTypes'
import { NextApiRequest, NextApiResponse } from 'next'
import getBusyItems from 'Utils/api/getBusyItems'
import getTokenData from 'Utils/api/getTokenData'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import dbConnect from 'Lib/dbConnect'
import Item from 'Models/Item'
import transformRAParameters from 'Utils/transformRAParameters'
import { google } from 'googleapis'

type Data = ReservationItem | ReservationItem[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | NetworkFailedState>
) {
  await dbConnect()

  console.log('ITEMS METHOD', req.method)

  try {
    switch (req.method) {
      case 'GET':
        const { sort, range, parsedRange: [from, to], filter } = transformRAParameters(req.query.filter, req.query.range, req.query.sort)

        // TODO: validate authorization token in firebase
        if (!req.headers.authorization) {
          Object.assign(filter, {
            active: true
          })
        }

        const items = await Item.find(filter).skip(from).limit(to - from + 1).sort(sort)
        const itemsCount = await Item.count()

        const busyItems = await getBusyItems(req, res)

        res.setHeader('Content-Range', `categories ${range}/${itemsCount}`)
        res.status(200).json(items.map(({ id, category_id, title, code, price, image, active }) => ({
          id,
          category_id,
          title,
          code,
          price,
          image,
          active,
          busy: busyItems.includes(id),
        })))

        break
      case 'POST':
        const { title, category_id, code, price, image, active } = req.body

        const item: unknown = await Item.create({
          title,
          category_id,
          code,
          price,
          image,
          active,
        })

        res.status(201).json(item as ReservationItem)

        break
      default:
        res.status(400).end()
    }
  } catch (e) {
    res.status(401).json({ error: e.message })
  }
}