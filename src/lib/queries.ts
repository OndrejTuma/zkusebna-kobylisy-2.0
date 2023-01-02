import axios from 'axios'

export const getAllItems = () => axios.get('/api/items?range=[0,999]')
export const getAvailableItems = (timeMin: Date, timeMax: Date) =>
  axios.get(
    `/api/items?range=[0,999]&filter=${JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
    })}`
  )
export const getAllCategories = () => axios.get('/api/categories?range=[0,99]')
export const getAllReservations = () =>
  axios.get('/api/reservations?range=[0,9999]')
export const getMonthReservations = (date: Date) =>
  axios.get(
    `/api/reservations?range=[0,999]&filter=${JSON.stringify({
      month: date.toISOString(),
    })}`
  )
export const getReservationType = (id: string) =>
  axios.get(`/api/reservation-types/${id}`)
