import axios from 'axios'
import { RequestSetCalendarId, Reservation } from 'LocalTypes'

// ITEMS
export const getAllItems = () => axios.get('/api/items?range=[0,999]')
export const getAvailableItems = (timeMin: Date, timeMax: Date) =>
  axios.get(
    `/api/items?range=[0,999]&filter=${JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
    })}`
  )

// CATEGORIES
export const getAllCategories = () => axios.get('/api/categories?range=[0,99]')

// RESERVATIONS
export const getAllReservations = () =>
  axios.get('/api/reservations?range=[0,9999]')
export const getMonthReservations = (date: Date) =>
  axios.get(
    `/api/reservations?range=[0,999]&filter=${JSON.stringify({
      month: date.toISOString(),
    })}`
  )
export const createReservation = (values: Reservation) => axios.post('/api/reservations', values)

// RESERVATION TYPES
export const getAllReservationTypes = () => axios.get('/api/reservation-types?range=[0,99]')
export const getReservationType = (id: string) =>
  axios.get(`/api/reservation-types/${id}`)

// MISC
export const getAuthUrl = () => axios.get('/api/auth/getAuthUrl')
export const setCalendarId = (requestData: RequestSetCalendarId) => axios.post('/api/auth/setCalendarId', requestData)
export const createAuthToken = (code: string) => axios.post('api/auth/createAuthToken', { code })
