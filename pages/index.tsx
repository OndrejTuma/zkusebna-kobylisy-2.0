import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { calendar_v3 } from 'googleapis'
import Schema$Event = calendar_v3.Schema$Event

import Dashboard from 'Components/client/Dashboard'

type HomeProps = {
  events: {
    data: {
      items: Schema$Event[]
    }
  }
}

const Home: NextPage<HomeProps> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>Zkušebna Kobylisy 2.0</title>
      </Head>

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
