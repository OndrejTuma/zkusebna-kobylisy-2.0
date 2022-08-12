import { AxiosError } from 'axios'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Loader from 'Components/generic/Loader'
import { useField } from 'formik'
import { getAllCategories, getAvailableItems, getReservationType } from 'Lib/queries'
import React from 'react'
import { useQueries } from 'react-query'
import ItemsTree from '../items-tree'

const Step3 = () => {
  const [ { value: reservationTypeId } ] = useField('reservationType')
  const [ { value: dateStart } ] = useField('dateStart')
  const [ { value: dateEnd } ] = useField('dateEnd')
  const [ {
    error: itemsError,
    isError: itemsIsError,
    isSuccess: itemsIsSuccess,
    data: itemsData,
  }, {
    error: categoriesError,
    isError: categoriesIsError,
    isSuccess: categoriesIsSuccess,
    data: categoriesData,
  }, {
    error: reservationTypeError,
    isError: reservationTypeIsError,
    isSuccess: reservationTypeIsSuccess,
    data: reservationTypeData,
  } ] = useQueries([ {
    queryKey: 'getAvailableItems',
    queryFn: () => getAvailableItems(dateStart, dateEnd),
  }, {
    queryKey: 'getAllCategories',
    queryFn: getAllCategories,
  }, {
    queryKey: 'getDiscount',
    queryFn: () => getReservationType(reservationTypeId),
  } ])

  if (itemsIsError || categoriesIsError || reservationTypeIsError) {
    return <ErrorAxios error={(itemsError || categoriesError || reservationTypeError) as AxiosError}/>
  }

  if (itemsIsSuccess && categoriesIsSuccess && reservationTypeIsSuccess) {
    return <ItemsTree items={itemsData!.data} categories={categoriesData!.data}
                      reservationType={reservationTypeData!.data}/>
  }

  return <Loader/>
}

export default Step3