import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'
import sub from 'date-fns/sub'

import Calendar from 'Components/Calendar'

const parseGoogleCalendarEventsToReactCalendarEvents = events => events.map(({description, end, extendedProperties, summary, start}) => ({
  title: summary,
  start: start.date || start.dateTime,
  end: end.date ? sub(new Date(end.date), { days: 1 }) : end.dateTime,
  allDay: !!start.date,
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
      <pre>{JSON.stringify(items, null, 2)}</pre>
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
