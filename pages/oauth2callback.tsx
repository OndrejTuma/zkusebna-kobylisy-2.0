import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import GoogleCalendarList from 'Components/client/GoogleCalendarList'
import Error from 'Components/generic/Error'
import type { NetworkState, ResponseAuthToken } from 'LocalTypes'
import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'

const Oauth2callback: NextPage<NetworkState<ResponseAuthToken>> = (props) => {
  if (!props.success) {
    return <Error>{props.error}</Error>
  }

  const { calendars, tokenId } = props

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant="h4">Vyberte kalendář pro rezervace</Typography>
      <GoogleCalendarList calendars={calendars.data.items} tokenId={tokenId}/>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code } = context.query

  try {
    const {
      data: {
        calendars,
        tokenId,
      },
    } = await axios.post<ResponseAuthToken>('http://localhost:3000/api/auth/createAuthToken', {
      code,
    })

    return {
      props: {
        success: true,
        calendars,
        tokenId,
      },
    }
  } catch (e) {
    return {
      props: {
        success: false,
        error: e.response?.data?.error || e.message,
      },
    }
  }
}

export default Oauth2callback