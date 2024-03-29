import React from 'react'
import Alert from '@mui/material/Alert'

type Props = {
  children?: React.ReactNode,
  [key: string]: any
}

const Error = ({ children, ...rest }: Props) => {
  return (
    <Alert severity={'error'} {...rest}>{children}</Alert>
  )
}

export default Error