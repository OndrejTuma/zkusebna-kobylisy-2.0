import { useField } from 'formik'
import React, { useMemo } from 'react'
import calculatePriceForReservation from 'Utils/calculatePriceForReservation'
import formatNumberToCZK from 'Utils/formatNumberToCZK'
import { useGetAllItems, useGetAllReservationTypes } from 'Hooks/queries'
import { MultiDataLoader } from 'Components/generic/DataLoader/DataLoader'
import { ReservationItem, ReservationType } from 'LocalTypes'

const Price = () => {
  const itemsQuery = useGetAllItems()
  const reservationTypesQuery = useGetAllReservationTypes()

  return (
    <MultiDataLoader queries={[itemsQuery, reservationTypesQuery]}>
      {([items, reservationTypes]) => (
        <PriceDisplay items={items} reservationTypes={reservationTypes} />
      )}
    </MultiDataLoader>
  )
}

type PriceDisplayProps = {
  items: ReservationItem[]
  reservationTypes: ReservationType[]
}

const PriceDisplay = ({ items, reservationTypes }: PriceDisplayProps) => {
  const [{ value: reservationTypeId }] = useField('reservationType')
  const [{ value: itemIds }] = useField('itemIds')

  const price = useMemo(() => {
    if (!reservationTypeId) {
      return 0
    }

    return calculatePriceForReservation(
      {
        reservationType: reservationTypeId,
        itemIds,
      },
      items,
      reservationTypes
    )
  }, [reservationTypeId, items, reservationTypes, itemIds])

  return reservationTypeId ? <>{formatNumberToCZK(price)}</> : null
}

export default Price
