import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { AxiosError, AxiosResponse } from 'axios'
import GoogleCalendarList from 'Components/client/GoogleCalendarList'
import Button from 'Components/generic/Button'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Loader from 'Components/generic/Loader'
import { createAuthToken } from 'Lib/queries'
import type { ResponseAuthToken } from 'LocalTypes'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { AuthContext } from '../Auth'

type Props = {
  code: string
}

const PickCalendar = ({ code }: Props) => {
  const { data, error, isError, isLoading, isSuccess } = useQuery<
    AxiosResponse<ResponseAuthToken>,
    AxiosError
  >('createAuthToken', () => createAuthToken(code as string), {
    enabled: !!code,
  })
  const { logOut } = useContext(AuthContext)

  return (
    <Grid container direction="column" spacing={2} textAlign="center" mt={4}>
      <Grid item>
        <Typography variant='h4'>Vyberte kalendář pro rezervace</Typography>
      </Grid>
      <Grid item>
        {isError && <ErrorAxios error={error} />}
        {isLoading && <Loader />}
        {isSuccess && (
          <GoogleCalendarList
            calendars={data.data.calendars.data.items}
            tokenId={data.data.tokenId}
          />
        )}
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={logOut}>Bezpečně odhlásit</Button>
      </Grid>
    </Grid>
  )
}

export default PickCalendar
