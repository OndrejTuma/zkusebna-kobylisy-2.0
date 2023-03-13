import { ReactNode } from 'react'
import { UseQueryResult } from 'react-query'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Loader from 'Components/generic/Loader'
import { AxiosError, AxiosResponse } from 'axios'
import { NetworkFailedState } from 'LocalTypes'

type DataLoaderProps<T> = {
  children: (data: T) => ReactNode
  query: UseQueryResult<AxiosResponse<T>, AxiosError<NetworkFailedState>>
  loader?: ReactNode
  error?: ReactNode
}

const DataLoader = <T = unknown>({
  children,
  query,
  loader = <Loader />,
  error,
}: DataLoaderProps<T>) => {
  const { data, isLoading, isError, error: axiosError, isSuccess } = query

  return (
    <>
      {isLoading && loader}
      {isError && (error || <ErrorAxios error={axiosError} />)}
      {isSuccess && children(data.data)}
    </>
  )
}

type MultiDataLoaderProps<T extends unknown[]> = {
  children: (data: T) => ReactNode
  queries: [
    ...{
      [K in keyof T]: UseQueryResult<AxiosResponse<T[K]>, AxiosError<NetworkFailedState>>
    }
  ]
  loader?: ReactNode
  error?: ReactNode
}

export const MultiDataLoader = <T extends unknown[]>({
  children,
  queries,
  loader = <Loader />,
  error,
}: MultiDataLoaderProps<T>) => {
  const isLoading = queries.some((query) => query.isLoading)
  const queryError = queries.find((query) => query.isError)
  const isSuccess = queries.every((query) => query.isSuccess)

  return (
    <>
      {isLoading && loader}
      {queryError && (error || <ErrorAxios error={queryError.error!}/>)}
      {isSuccess && children(queries.map((query) => query.data!.data) as T)}
    </>
  )
}

export default DataLoader
