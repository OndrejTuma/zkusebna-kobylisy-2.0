import axios, { AxiosError, AxiosResponse } from 'axios'
import Dashboard from 'Components/client/Dashboard'
import ErrorAxios from 'Components/generic/ErrorAxios'
import type { ResponseCalendarEvents } from 'LocalTypes'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'

const getEvents = () => axios.get('/api/events')

const Home: NextPage = () => {
  const {
    isSuccess,
    error,
    isError,
    data,
  } = useQuery<AxiosResponse<ResponseCalendarEvents>, AxiosError>('getEvents', getEvents)

  return (
    <div>
      <Head>
        <title>Zkušebna Kobylisy 2.0</title>
      </Head>

      {isError && <ErrorAxios sx={{ marginBottom: 2 }} error={error}/>}
      {isSuccess && <Dashboard events={data.data.events.data.items}/>}
    </div>
  )
}

export default Home
