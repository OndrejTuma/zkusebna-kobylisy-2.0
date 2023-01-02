import CalendarMonth from '@mui/icons-material/CalendarMonth'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { AxiosResponse } from 'axios'
import Error from 'Components/generic/Error'
import Success from 'Components/generic/Success'
import { setCalendarId } from 'Lib/queries'
import { CalendarEntry, RequestSetCalendarId } from 'LocalTypes'
import React from 'react'
import { useMutation } from 'react-query'

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
  } = useMutation<AxiosResponse, string, RequestSetCalendarId>('setCalendarId', setCalendarId)

  const handleCalendarSelect = async (calendarId: string) => mutate({ calendarId, tokenId })

  return (
    <Container>
      {isError && <Error>{error}</Error>}
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
