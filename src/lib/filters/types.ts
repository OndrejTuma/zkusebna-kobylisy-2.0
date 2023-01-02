import { SortOrder } from 'mongoose'

export type QueryType = {
  filter?: string
  range?: string
  sort?: string
}

export type RangeType = [from: number, to: number]

export interface RangeFilter {
  from: number
  to: number
  print(): string
  itemsCount(): number
}
export interface SortFilter {
  key: string
  value: SortOrder
  sortFn(a: FilterType, b: FilterType): number
  mongoFormat(): { [key: string]: SortOrder }
}
export interface FilterFilter {
  allFilters: FilterType
  add(key: string, value: string): void
  remove(key: string): void
  get(): FilterType
  mongoFormat(): FilterType
}

export type SortType = [key: string, value: 'ASC' | 'DESC']

export type FilterType = { [key: string]: any }

export type FilterOptionsType = {
  filter: FilterType
  range: RangeFilter
  sort: SortFilter
}
