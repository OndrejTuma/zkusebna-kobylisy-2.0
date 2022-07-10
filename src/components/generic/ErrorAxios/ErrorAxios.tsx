import axios, { AxiosError } from 'axios'
import Error from 'Components/generic/Error'
import { NetworkFailedState } from 'LocalTypes'
import React from 'react'

type Props = {
  error: Error | AxiosError,
  [key: string]: any,
}

const ErrorAxios = ({ error, ...rest }: Props) => {
  return (
    <Error {...rest}>
      {axios.isAxiosError(error) ? (error.response?.data as NetworkFailedState)?.error : error.message}
    </Error>
  )
}

export default ErrorAxios