import { Filter, Range, Sort } from '.'
import { FilterOptionsType, QueryType } from './types'

const parseFromQuery = (query: QueryType): FilterOptionsType => {
  const { filter, range, sort } = query

  return {
    filter: new Filter(filter ? JSON.parse(filter.toString()) : {}),
    range: new Range(range ? JSON.parse(range.toString()) : [0, 9]),
    sort: new Sort(sort ? JSON.parse(sort.toString()) : ['title', 'ASC']),
  }
}

export default parseFromQuery
