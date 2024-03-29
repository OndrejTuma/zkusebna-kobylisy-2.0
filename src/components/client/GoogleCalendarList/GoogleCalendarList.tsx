import CalendarMonth from '@mui/icons-material/CalendarMonth'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Success from 'Components/generic/Success'
import { CalendarEntry } from 'LocalTypes'
import React from 'react'
import { useSetCalendarId } from 'Hooks/queries'
import ErrorAxios from 'Components/generic/ErrorAxios'

type Props = {
  calendars?: CalendarEntry[],
  tokenId: string,
}

const GoogleCalendarList = ({ calendars, tokenId }: Props) => {
  const {
    isError,
    error,
    mutate,
    isSuccess,
  } = useSetCalendarId()

  const handleCalendarSelect = async (calendarId: string) => mutate({ calendarId, tokenId })

  return (
    <Container>
      {isError && <ErrorAxios error={error}/>}
      {isSuccess ? <Success>Je to připravené!</Success> : (
        <List>
          {calendars?.map(({ id, summary }) => (
            <ListItemButton key={id} onClick={() => handleCalendarSelect(id!)}>
              <ListItemIcon>
                <CalendarMonth/>
              </ListItemIcon>
              <ListItemText primary={summary}/>
            </ListItemButton>
          ))}
        </List>
      )}
    </Container>
  )
}

export default GoogleCalendarList
