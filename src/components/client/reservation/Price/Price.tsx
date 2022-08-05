import { AxiosResponse } from 'axios'
import { useField } from 'formik'
import { ReservationItem, ResponseReservationTypes } from 'LocalTypes'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import getAllReservationTypes from 'Utils/fetch/getAllReservationTypes'
import formatNumberToCZK from 'Utils/formatNumberToCZK'
import getDiscountPrice from 'Utils/getDiscountPrice'

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

    const reservationType = reservationTypesData.data.find(({id}) => id === reservationTypeId)
    const price: number = itemsData.data.filter(({id}) => itemIds.includes(id)).map(({price}) => price).reduce<number>((sum, price) => sum + price, 0)
    const reducedPrice = getDiscountPrice(price, reservationType!.discount)

    setPrice(reducedPrice)
  }, [itemsLoaded, reservationTypesLoaded, reservationTypeId, itemIds])

  return <>{formatNumberToCZK(price)}</>
}

export default Price