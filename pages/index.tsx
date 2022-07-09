import Error from 'Components/generic/Error'
import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import Dashboard from 'Components/client/Dashboard'
import type { ResponseCalendarEvents } from 'LocalTypes'

const Home: NextPage<ResponseCalendarEvents> = ({ events, error }) => {
  return (
    <div>
      <Head>
        <title>Zkušebna Kobylisy 2.0</title>
      </Head>

      {error && <Error sx={{ marginBottom: 2 }}>{error}</Error>}

      <Dashboard events={events?.data.items} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch('http://localhost:3000/api/events')
  const { events, error } = await res.json()

  if (error) {
    return {
      props: {
        error,
      }
    }
  }

  return {
    props: {
      events,
    }
  }
}

export default Home
