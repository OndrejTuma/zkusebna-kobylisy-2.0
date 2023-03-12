import Dashboard from 'Components/client/Dashboard'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zkušebna Kobylisy</title>
      </Head>

      <Dashboard />
    </div>
  )
}

export default Home
