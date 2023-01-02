import { NetworkFailedState, ReservationItem } from 'LocalTypes'
import { NextApiRequest, NextApiResponse } from 'next'
import getBusyItems from 'Utils/api/getBusyItems'
import dbConnect from 'Lib/dbConnect'
import Item from 'Models/Item'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'
import Category from 'Models/Category'
import { Filter, parseRAFilters, MongoFilter } from 'Lib/filters'

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
        const { filter, range, sort } = parseRAFilters(req.query)

        const [categoryName, timeMin, timeMax, ignoreBusyItems] = filter.popMany([
          'categoryName',
          'timeMin',
          'timeMax',
          'ignoreBusyItems',
        ])
        

        // return only active items for unauthenticated users (clients)
        try {
          authorizeRequest(req)
        } catch (error) {
          filter.add('active', true)
        }
        
        // Filter items by category
        if (categoryName) {
          const byCategoryFilter = new Filter({ title: categoryName })

          const categories = await Category.find(byCategoryFilter.mongoFormat())

          const categoryIds = categories.map(MongoFilter.getId)

          filter.add('category_id', categoryIds)
        }

        const items = await Item.find(filter.mongoFormat()).skip(range.from).limit(range.itemsCount()).sort(sort.mongoFormat())
        const itemsCount = await Item.find(filter.mongoFormat()).count()

        const busyItems = await getBusyItems(timeMin, timeMax)
        const filteredBusyItems = busyItems.filter((id) => !ignoreBusyItems?.includes(id))

        res.setHeader('Content-Range', `categories ${range.print()}/${itemsCount}`)
        res.status(200).json(items.map(({ id, category_id, title, code, price, image, active }) => ({
          id,
          category_id,
          title,
          code,
          price,
          image,
          active,
          busy: filteredBusyItems.includes(id),
        })))

        break
      case 'POST':
        authorizeRequest(req)
        
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
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
