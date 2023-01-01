import { FilterType, SortFilter, SortType } from './types'

class Sort implements SortFilter {
  key: string
  value: 1 | -1

  constructor(sort: SortType) {
    const [key, value] = sort
    
    this.key = key
    this.value = value === 'ASC' ? 1 : -1

    this.sortFn = this.sortFn.bind(this)
  }

  public sortFn(a: FilterType, b: FilterType) {
    return (a[this.key] > b[this.key] ? 1 : -1) * this.value
  }

  public mongoFormat() {
    return {
      [this.key]: this.value,
    }
  }
}

export default Sort
