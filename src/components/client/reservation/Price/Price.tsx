import { AxiosResponse } from 'axios'
import { useField } from 'formik'
import { ReservationItem, ResponseReservationTypes } from 'LocalTypes'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import calculatePriceForReservation from 'Utils/calculatePriceForReservation'
import getAllReservationTypes from 'Utils/fetch/getAllReservationTypes'
import formatNumberToCZK from 'Utils/formatNumberToCZK'

const Price = () => {
  const [price, setPrice] = useState(0)
  const { isSuccess: itemsLoaded, data: itemsData } = useQuery<AxiosResponse<ReservationItem[]>>('getAllItems')
  const { isSuccess: reservationTypesLoaded, data: reservationTypesData } = useQuery<AxiosResponse<ResponseReservationTypes>>('getAllReservationTypes', getAllReservationTypes)
  const [ { value: reservationTypeId } ] = useField('reservationType')
  const [ { value: itemIds } ] = useField('itemIds')

  useEffect(() => {
    if (!itemsLoaded || !reservationTypesLoaded || !reservationTypeId) {
      return
    }

    setPrice(calculatePriceForReservation({
      reservationType: reservationTypeId,
      itemIds,
    }, itemsData.data, reservationTypesData.data))
  }, [itemsLoaded, reservationTypesLoaded, reservationTypeId, itemIds])

  return <>{formatNumberToCZK(price)}</>
}

export default Price