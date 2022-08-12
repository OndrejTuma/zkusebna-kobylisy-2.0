import { SortOrder, Types } from 'mongoose'

const getParsedFilter = (filter?: string | string[]): {} => {
  if (!filter) {
    return {}
  }

  const raFilter = JSON.parse(filter.toString())

  return Object.entries(raFilter).reduce((result, [key, value]) => {
    if (key !== 'id') {
      return {
        ...result,
        [key]: Array.isArray(value) ? { $in: value } : {$regex: value, $options: 'i'}
      }
    }

    return {
      ...result,
      _id: Array.isArray(value) ? {
        $in: value.map(id => new Types.ObjectId(id))
      } : new Types.ObjectId(value as string)
    }
  }, {})
}

const transformRAParameters = (filter?: string | string[], range?: string | string[], sort?: string | string[]) => {
  const parsedRange: number[] = range ? JSON.parse(range.toString()) : [0, 9]
  const parsedSort: string[] = sort ? JSON.parse(sort.toString()) : ['id', 'ASC']

  return {
    parsedRange,
    filter: getParsedFilter(filter),
    range: parsedRange.join('-'),
    sort: {
      [parsedSort[0]]: parsedSort[1] === 'ASC' ? 1 : -1 as SortOrder,
    },
  }
}

export default transformRAParameters