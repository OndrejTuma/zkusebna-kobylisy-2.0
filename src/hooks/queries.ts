import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  CategoryItem,
  RequestSetCalendarId,
  Reservation,
  ReservationItem,
  ReservationType,
  ResponseAuthToken,
  ResponseAuthUrl,
} from 'LocalTypes'
import getCacheKey from 'Utils/getCalendarCacheKey'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'

// QUERIES

export const useGetAllItems = () => {
  const query = useQuery<AxiosResponse<ReservationItem[], AxiosError>, string>(
    ['getAllItems'],
    () => axios.get('/api/items?range=[0,999]')
  )

  return query
}
export const useGetAvailableItems = (timeMin: Date, timeMax: Date) => {
  const query = useQuery<AxiosResponse<ReservationItem[], AxiosError>, string>(
    ['getAvailableItems'],
    () =>
      axios.get(
        `/api/items?range=[0,999]&filter=${JSON.stringify({
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
        })}`
      )
  )

  return query
}

export const useGetAllCategories = () => {
  const query = useQuery<AxiosResponse<CategoryItem[], AxiosError>, string>(
    ['getAllCategories'],
    () => axios.get('/api/categories?range=[0,99]')
  )

  return query
}

export const useGetAllReservationTypes = () => {
  const query = useQuery<AxiosResponse<ReservationType[], AxiosError>, string>(
    ['getAllReservationTypes'],
    () => axios.get('/api/reservation-types?range=[0,99]')
  )

  return query
}
export const useGetReservationType = (id: string) => {
  const query = useQuery<AxiosResponse<ReservationType, AxiosError>, string>(
    ['getReservationType', id],
    () => axios.get(`/api/reservation-types/${id}`)
  )

  return query
}

export const useGetMonthReservation = (currentDate: Date) => {
  const query = useQuery<AxiosResponse<Reservation[], AxiosError>, string>(
    ['getMonthReservations', getCacheKey(currentDate)],
    () =>
      axios.get(
        `/api/reservations?range=[0,999]&filter=${JSON.stringify({
          month: currentDate.toISOString(),
        })}`
      ),
    { keepPreviousData: true }
  )

  return query
}

export const useGetAuthUrl = (enabled = false) => {
  const query = useQuery<AxiosResponse<ResponseAuthUrl, AxiosError>, string>(
    ['getAuthUrl'],
    () => axios.get('/api/auth/getAuthUrl'),
    {
      enabled,
    }
  )

  return query
}

export const useCreateAuthToken = (code: string) => {
  const query = useQuery<AxiosResponse<ResponseAuthToken, AxiosError>, string>(
    ['createAuthToken'],
    () => axios.post('api/auth/createAuthToken', { code }),
    {
      enabled: !!code,
    }
  )

  return query
}

// MUTATIONS

export const useSetCalendarId = () => {
  const mutation = useMutation<AxiosResponse, string, RequestSetCalendarId>(
    ['setCalendarId'],
    (requestData) => axios.post('/api/auth/setCalendarId', requestData)
  )

  return mutation
}

export const useCreateReservation = (date: Date) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<AxiosResponse, string, Reservation>(
    ['createReservation'],
    (values) => axios.post('/api/reservations', values),
    {
      onSuccess: ({ data: { data } }) => {
        const cacheKey = getCacheKey(date)
        const reservations = queryClient.getQueryData<
          AxiosResponse<Reservation[]>
        >(['getMonthReservations', cacheKey])

        reservations &&
          queryClient.setQueryData(['getMonthReservations', cacheKey], {
            ...reservations,
            data: [
              ...reservations.data,
              { ...convertCalendarEventToReservation(data) },
            ],
          })
      },
    }
  )

  return mutation
}
