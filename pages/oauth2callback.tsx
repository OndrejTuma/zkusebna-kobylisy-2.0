import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import GoogleCalendarList from 'Components/client/GoogleCalendarList'
import Error from 'Components/generic/Error'
import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'

import type { ResponseCalendarList } from 'LocalTypes'

const Oauth2callback:NextPage<ResponseCalendarList> = ({ error, calendars, tokenId }) => {
  if (error) {
    return <Error>{error}</Error>
  }

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant="h4">Vyberte kalendář pro rezervace</Typography>
      <GoogleCalendarList calendars={calendars!.data.items} tokenId={tokenId} />
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code } = context.query

  const res = await fetch('http://localhost:3000/api/auth/createAuthToken', {
    method: 'POST',
    body: JSON.stringify({
      code
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const { error, calendars, tokenId } = await res.json()

  if (error) {
    return {
      props: {
        error
      }
    }
  }

  return {
    props: {
      calendars,
      tokenId,
    },
  }
}

export default Oauth2callback