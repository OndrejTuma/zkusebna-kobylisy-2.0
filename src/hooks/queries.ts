import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  CategoryItem,
  NetworkFailedState,
  RequestSetCalendarId,
  Reservation,
  ReservationItem,
  ReservationType,
  ResponseAuthToken,
  ResponseAuthUrl,
} from 'LocalTypes'
import getCacheKey from 'Utils/getCalendarCacheKey'

// QUERIES

export const useGetAllItems = () => {
  const query = useQuery<AxiosResponse<ReservationItem[]>, AxiosError<NetworkFailedState>>(
    ['getAllItems'],
    () => axios.get('/api/items?range=[0,999]')
  )

  return query
}
export const useGetAvailableItems = (timeMin: Date, timeMax: Date) => {
  const query = useQuery<AxiosResponse<ReservationItem[]>, AxiosError<NetworkFailedState>>(
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
  const query = useQuery<AxiosResponse<CategoryItem[]>, AxiosError<NetworkFailedState>>(
    ['getAllCategories'],
    () => axios.get('/api/categories?range=[0,99]')
  )

  return query
}

export const useGetAllReservationTypes = () => {
  const query = useQuery<AxiosResponse<ReservationType[]>, AxiosError<NetworkFailedState>>(
    ['getAllReservationTypes'],
    () => axios.get('/api/reservation-types?range=[0,99]')
  )

  return query
}
export const useGetReservationType = (id: string) => {
  const query = useQuery<AxiosResponse<ReservationType>, AxiosError<NetworkFailedState>>(
    ['getReservationType', id],
    () => axios.get(`/api/reservation-types/${id}`)
  )

  return query
}

export const useGetMonthReservation = (currentDate: Date) => {
  const query = useQuery<AxiosResponse<Reservation[]>, AxiosError<NetworkFailedState>>(
    ['getMonthReservations', getCacheKey(currentDate)],
    () =>
      axios.get(
        `/api/reservations?range=[0,999]&filter=${JSON.stringify({
          clientMonth: currentDate.toISOString(),
        })}`
      ),
    { keepPreviousData: true }
  )

  return query
}

export const useGetAuthUrl = (enabled = false) => {
  const query = useQuery<AxiosResponse<ResponseAuthUrl>, AxiosError<NetworkFailedState>>(
    ['getAuthUrl'],
    () => axios.get('/api/auth/getAuthUrl'),
    {
      enabled,
    }
  )

  return query
}

export const useCreateAuthToken = (code: string) => {
  const query = useQuery<AxiosResponse<ResponseAuthToken>, AxiosError<NetworkFailedState>>(
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
  const mutation = useMutation<AxiosResponse, AxiosError<NetworkFailedState>, RequestSetCalendarId>(
    ['setCalendarId'],
    (requestData) => axios.post('/api/auth/setCalendarId', requestData)
  )

  return mutation
}

export const useCreateReservation = (date: Date) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<AxiosResponse, AxiosError<NetworkFailedState>, Reservation>(
    ['createReservation'],
    (values) => axios.post('/api/reservations', values),
    {
      onSuccess: ({ data: reservation }) => {
        const cacheKey = getCacheKey(date)
        const reservations = queryClient.getQueryData<
          AxiosResponse<Reservation[]>
        >(['getMonthReservations', cacheKey])

        reservations &&
          queryClient.setQueryData(['getMonthReservations', cacheKey], {
            ...reservations,
            data: [
              ...reservations.data,
              reservation,
            ],
          })
      },
    }
  )

  return mutation
}
