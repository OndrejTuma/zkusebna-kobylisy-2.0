import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'
// import Image from 'next/image'
import Calendar from '../src/components/Calendar'

const parseGoogleCalendarEventsToReactCalendarEvents = events => events.map(({description, end, extendedProperties, summary, start}) => ({
  title: summary,
  start: new Date(start.dateTime),
  end: new Date(end.dateTime),
  resource: {
    private: extendedProperties?.private,
    description,
  },
}))

const Home: NextPage = ({ events: {data: {items}} }) => {
  const calendarEvents = useMemo(() => parseGoogleCalendarEventsToReactCalendarEvents(items), [items])
  const handleSelectEvent = e => {
    alert(JSON.stringify(e, null, 2))
  }
  return (
    <div>
      <Head>
        <title>Zkušebna Kobylisy 2.0</title>
      </Head>

      <Calendar events={calendarEvents} onSelectEvent={handleSelectEvent}/>
      <pre>
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch('http://localhost:3000/api/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const { events } = await res.json()

  return {
    props: {
      events,
    }
  }
}

export default Home
