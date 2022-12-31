import { AxiosError } from 'axios'
import Dashboard from 'Components/client/Dashboard'
import ErrorAxios from 'Components/generic/ErrorAxios'
import { getAllCategories, getAllItems } from 'Lib/queries'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useQueries } from 'react-query'

const Home: NextPage = () => {
  const [ {
    error: itemsError,
    isError: itemsIsError,
    isSuccess: itemsIsSuccess,
  }, {
    error: categoriesError,
    isError: categoriesIsError,
    isSuccess: categoriesIsSuccess,
  } ] = useQueries([ {
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

      {(itemsIsError || categoriesIsError) && (
        <ErrorAxios sx={{ marginBottom: 2 }}
                    error={(itemsError || categoriesError) as AxiosError}/>
      )}
      {(itemsIsSuccess && categoriesIsSuccess) && (
        <Dashboard />
      )}
    </div>
  )
}

export default Home
