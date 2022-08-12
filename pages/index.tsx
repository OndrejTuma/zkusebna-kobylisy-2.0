import { AxiosError } from 'axios'
import Dashboard from 'Components/client/Dashboard'
import ErrorAxios from 'Components/generic/ErrorAxios'
import { getAllCategories, getAllItems, getAllReservations } from 'Lib/queries'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useQueries } from 'react-query'

const Home: NextPage = () => {
  const [ {
    error: reservationsError,
    isError: reservationsIsError,
    isSuccess: reservationsIsSuccess,
    data: reservationsData,
  }, {
    error: itemsError,
    isError: itemsIsError,
    isSuccess: itemsIsSuccess,
  }, {
    error: categoriesError,
    isError: categoriesIsError,
    isSuccess: categoriesIsSuccess,
  } ] = useQueries([ {
    queryKey: 'getAllReservations',
    queryFn: getAllReservations,
  }, {
    queryKey: 'getAllItems',
    queryFn: getAllItems,
  }, {
    queryKey: 'getAllCategories',
    queryFn: getAllCategories,
  } ])

  return (
    <div>
      <Head>
        <title>Zkušebna Kobylisy</title>
      </Head>

      {(reservationsIsError || itemsIsError || categoriesIsError) && (
        <ErrorAxios sx={{ marginBottom: 2 }}
                    error={(reservationsError || itemsError || categoriesError) as AxiosError}/>
      )}
      {(reservationsIsSuccess && itemsIsSuccess && categoriesIsSuccess) && (
        <Dashboard reservations={reservationsData!.data}/>
      )}
    </div>
  )
}

export default Home
