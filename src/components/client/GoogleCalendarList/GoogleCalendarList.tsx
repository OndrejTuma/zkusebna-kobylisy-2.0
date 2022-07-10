import CalendarMonth from '@mui/icons-material/CalendarMonth'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import axios, { AxiosResponse, AxiosError } from 'axios'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Success from 'Components/generic/Success'
import { CalendarEntry, RequestSetCalendarId } from 'LocalTypes'
import React  from 'react'
import { useMutation } from 'react-query'

type Props = {
  calendars?: CalendarEntry[],
  tokenId: string,
}

const setCalendarId = (requestData: RequestSetCalendarId) => axios.post('/api/auth/setCalendarId', requestData)

const GoogleCalendarList = ({ calendars, tokenId }: Props) => {
  const { isError, error, mutate, isSuccess } = useMutation<AxiosResponse, AxiosError, RequestSetCalendarId>('setCalendarId', setCalendarId)

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