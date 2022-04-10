import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import Dashboard from 'Components/client/Dashboard'
import type { CalendarEvents } from 'LocalTypes'

type HomeProps = {
  events: CalendarEvents
}

const Home: NextPage<HomeProps> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>Zkušebna Kobylisy 2.0</title>
      </Head>

      <pre>
        {JSON.stringify(events, null, 2)}
      </pre>

      <Dashboard events={events?.data.items} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch('http://localhost:3000/api/events')
  const { events } = await res.json()

  return {
    props: {
      events,
    }
  }
}

export default Home
