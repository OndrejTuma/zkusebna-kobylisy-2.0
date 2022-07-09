import Container from '@mui/material/Container'
import Error from 'Components/generic/Error'
import Success from 'Components/generic/Success'
import { CalendarEntry } from 'LocalTypes'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonth from '@mui/icons-material/CalendarMonth'
import React, { useState } from 'react'

type Props = {
  calendars?: CalendarEntry[],
  tokenId?: string,
}

const GoogleCalendarList = ({ calendars, tokenId }: Props) => {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const handleCalendarSelect = async (calendarId: string) => {
    const res = await fetch('/api/auth/setCalendarId', {
      method: 'POST',
      body: JSON.stringify({
        calendarId,
        tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 200) {
      setSuccess('Je to připravené!')

      return
    }

    const { error } = await res.json()

    setError(error)
  }

  return (
    <Container>
      {error && <Error>{error}</Error>}
      {success ? <Success>{success}</Success> : (
        <List>
          {calendars?.map(({ id, summary }) => (
            <ListItemButton key={id} onClick={() => handleCalendarSelect(id!)}>
              <ListItemIcon>
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText primary={summary} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Container>
  )
}

export default GoogleCalendarList