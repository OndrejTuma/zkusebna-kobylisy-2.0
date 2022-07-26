import axios, { AxiosError } from 'axios'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Loader from 'Components/generic/Loader'
import { useField } from 'formik'
import React from 'react'
import { useQueries } from 'react-query'
import ItemsTree from '../items-tree'

const getAllItems = () => axios.get('/api/items?range=[0,999]')
const getAllCategories = () => axios.get('/api/categories?range=[0,99]')
const getReservationType = (id: string) => axios.get(`/api/reservation-types/${id}`)

const Step3 = () => {
  const [{ value: reservationTypeId }] = useField('reservationType')
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
    queryKey: 'getAllItems',
    queryFn: getAllItems,
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
    return <ItemsTree items={itemsData!.data} categories={categoriesData!.data} reservationType={reservationTypeData!.data}/>
  }

  return <Loader/>
}

export default Step3