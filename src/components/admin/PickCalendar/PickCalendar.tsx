import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import GoogleCalendarList from 'Components/client/GoogleCalendarList'
import Button from 'Components/generic/Button'
import React, { useContext } from 'react'
import { AuthContext } from '../Auth'
import { useCreateAuthToken } from 'Hooks/queries'
import DataLoader from 'Components/generic/DataLoader'

type Props = {
  code: string
}

const PickCalendar = ({ code }: Props) => {
  const query = useCreateAuthToken(code)
  const { logOut } = useContext(AuthContext)

  return (
    <Grid container direction='column' spacing={2} textAlign='center' mt={4}>
      <Grid item>
        <Typography variant='h4'>Vyberte kalendář pro rezervace</Typography>
      </Grid>
      <Grid item>
        <DataLoader query={query}>
          {({ calendars, tokenId }) => (
            <GoogleCalendarList
              calendars={calendars.data.items}
              tokenId={tokenId}
            />
          )}
        </DataLoader>
      </Grid>
      <Grid item>
        <Button variant='outlined' onClick={logOut}>
          Bezpečně odhlásit
        </Button>
      </Grid>
    </Grid>
  )
}

export default PickCalendar
