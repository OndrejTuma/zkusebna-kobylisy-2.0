import { AxiosError } from 'axios'
import Error from 'Components/generic/Error'
import { NetworkFailedState } from 'LocalTypes'
import React from 'react'

type Props = {
  error: AxiosError<NetworkFailedState>,
  [key: string]: any,
}

const ErrorAxios = ({ error, ...rest }: Props) => {
  let errorMessage = error.message

  if (error.response && [400, 405].includes(error.response.status)) {
    errorMessage = error.response.data.message
  }
  
  return (
    <Error {...rest}>
      {errorMessage}
    </Error>
  )
}

export default ErrorAxios