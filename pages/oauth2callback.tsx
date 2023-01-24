import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { AxiosError, AxiosResponse } from 'axios'
import GoogleCalendarList from 'Components/client/GoogleCalendarList'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Loader from 'Components/generic/Loader'
import { createAuthToken } from 'Lib/queries'
import type { ResponseAuthToken } from 'LocalTypes'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

const Oauth2callback: NextPage = () => {
  const { query: { code } } = useRouter()
  const { data, error, isError, isLoading, isSuccess } = useQuery<
    AxiosResponse<ResponseAuthToken>,
    AxiosError
  >('createAuthToken', () => createAuthToken(code as string), {
    enabled: !!code,
  })

  if (isError) {
    return <ErrorAxios error={error} />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant='h4'>Vyberte kalendář pro rezervace</Typography>
      {isSuccess && (
        <GoogleCalendarList
          calendars={data.data.calendars.data.items}
          tokenId={data.data.tokenId}
        />
      )}
    </Container>
  )
}

export default Oauth2callback
