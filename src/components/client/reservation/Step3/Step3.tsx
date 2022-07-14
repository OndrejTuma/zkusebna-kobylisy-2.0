import axios, { AxiosError } from 'axios'
import ChooseItems from 'Components/client/reservation/ChooseItems'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Loader from 'Components/generic/Loader'
import React from 'react'
import { useQueries } from 'react-query'

const getAllItems = () => axios.get('/api/items?range=[0,999]')
const getAllCategories = () => axios.get('/api/categories?range=[0,99]')

const Step3 = () => {
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
  } ] = useQueries([ {
    queryKey: 'getAllItems',
    queryFn: getAllItems,
  }, {
    queryKey: 'getAllCategories',
    queryFn: getAllCategories,
  } ])

  if (itemsIsError || categoriesIsError) {
    return <ErrorAxios error={(itemsError || categoriesError) as AxiosError}/>
  }

  if (itemsIsSuccess && categoriesIsSuccess) {
    return <ChooseItems items={itemsData!.data} categories={categoriesData!.data}/>
  }

  return <Loader/>
}

export default Step3