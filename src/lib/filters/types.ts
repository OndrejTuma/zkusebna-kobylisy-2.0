import { SortOrder } from 'mongoose'

export type QueryType = {
  filter?: string
  range?: string
  sort?: string
}

export type RangeType = [from: number, to: number]

export interface IRangeFilter {
  from: number
  to: number
  print(): string
  itemsCount(): number
}
export interface ISortFilter {
  key: string
  value: SortOrder
  sortFn(a: FilterType, b: FilterType): number
  mongoFormat(): { [key: string]: SortOrder }
}
export interface IFilter {
  allFilters: FilterType
  add(key: string, value: FilterValueType): void
  pop(key: string): FilterValueType
  popMany(keys: string[]): FilterValueType[]
  get(key: string): FilterValueType
  mongoFormat(): FilterType
}

export interface IMongoFilter {
  getFilter(): FilterType
}

export type SortType = [key: string, value: 'ASC' | 'DESC']

export type FilterType = { [key: string]: FilterValueType }
export type FilterValueType = any

export type FilterOptionsType = {
  filter: IFilter
  range: IRangeFilter
  sort: ISortFilter
}
