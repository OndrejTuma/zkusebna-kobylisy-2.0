import { IRangeFilter, RangeType } from './types'

class Range implements IRangeFilter {
  from: number
  to: number

  constructor(range: RangeType) {
    const [from, to] = range

    this.from = from
    this.to = to
  }

  print() {
    return `${this.from}-${this.to}`
  }

  itemsCount() {
    return this.to - this.from + 1
  }
}

export default Range
