import axios, { AxiosError, AxiosResponse } from 'axios'
import ChooseItems from 'Components/client/reservation/ChooseItems'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Loader from 'Components/generic/Loader'
import { ReservationItem, ReservationItemCategory } from 'LocalTypes'
import React from 'react'
import { useQueries } from 'react-query'

const getAllItems = () => axios.get('/api/items?range=[0,999]')
const getAllCategories = () => axios.get('/api/categories?range=[0,99]')

const Step3 = () => {
  const [{
    error,
    isError,
    isSuccess,
    data: itemsData,
  }, {
    data: categoriesData,
  }] = useQueries([{
    queryKey: 'getAllItems',
    queryFn: getAllItems,
  }, {
    queryKey: 'getAllCategories',
    queryFn: getAllCategories
  }])

  if (isError) {
    return <ErrorAxios error={error}/>
  }

  if (isSuccess) {
    return <ChooseItems items={itemsData.data}/>
  }

  return <Loader/>
}

export default Step3