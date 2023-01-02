import { MongoFilter } from '.'
import { FilterType } from './types'

class Filters {
  public allFilters: FilterType

  constructor(filters?: FilterType) {
    this.allFilters = filters || {}
  }

  public add(key: string, value: string) {
    this.allFilters[key] = value
  }

  public pop(key: string) {
    const value = this.allFilters[key]
      
    delete this.allFilters[key]

    return value
  }

  public popMany(keys: string[]) {
    return keys.map(this.pop.bind(this))
  }

  public get(key: string) {
    return this.allFilters[key]
  }

  public mongoFormat() {
    return Object.entries(this.allFilters).reduce((result, [key, value]) => {
      const filter = new MongoFilter(key, value).getFilter()
      
      return {
        ...result,
        ...filter,
      }
    }, {})
  }
}

export default Filters
