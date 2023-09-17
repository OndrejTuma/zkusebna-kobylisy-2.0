import { useField } from 'formik'
import React from 'react'

import ItemsTree from '../items-tree'
import {
  useGetAllCategories,
  useGetAvailableItems,
  useGetReservationType,
  useIsQuietTime,
} from 'Hooks/queries'
import { MultiDataLoader } from 'Components/generic/DataLoader/DataLoader'

const Step3 = () => {
  const [{ value: reservationTypeId }] = useField('reservationType')
  const [{ value: dateStart }] = useField('dateStart')
  const [{ value: dateEnd }] = useField('dateEnd')
  const itemsQuery = useGetAvailableItems(dateStart, dateEnd)
  const isQuietTimeQuery = useIsQuietTime(dateStart, dateEnd)
  const categoriesQuery = useGetAllCategories()
  const reservationTypeQuery = useGetReservationType(reservationTypeId)

  return (
    <MultiDataLoader
      queries={[
        itemsQuery,
        reservationTypeQuery,
        categoriesQuery,
        isQuietTimeQuery,
      ]}
    >
      {([items, reservationType, categories, isQuietTime]) => (
        <ItemsTree
          items={items}
          isQuietTime={isQuietTime}
          categories={categories}
          reservationType={reservationType}
        />
      )}
    </MultiDataLoader>
  )
}

export default Step3
