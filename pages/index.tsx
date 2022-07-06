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

      {error && <h2>{error}</h2>}

      <Dashboard events={events?.data.items} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch('http://localhost:3000/api/events')
  const { events, error } = await res.json()

  const props = {
    events,
  }

  if (error) {
    Object.assign(props, { error })
  }

  return {
    props
  }
}

export default Home
