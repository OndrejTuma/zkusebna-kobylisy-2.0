import { ReservationItem, ReservationItemCategory } from 'LocalTypes'

import type { StructuredCategory } from '../ItemsTree'

const getSubcategoriesAndItems = (category: ReservationItemCategory, categories: ReservationItemCategory[], items: ReservationItem[]): StructuredCategory => ({
  ...category,
  subcategories: categories.filter(({ parent_id }) => parent_id === category.id).map(category => getSubcategoriesAndItems(category, categories, items)),
  items: items.filter(({ category_id }) => category_id === category.id),
})

export default getSubcategoriesAndItems