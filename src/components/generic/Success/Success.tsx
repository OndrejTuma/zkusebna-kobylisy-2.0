import React from 'react'
import Alert from '@mui/material/Alert'

type Props = {
  children?: React.ReactNode,
  [key: string]: any
}

const Success = ({ children, ...rest }: Props) => {
  return (
    <Alert severity={'success'} {...rest}>{children}</Alert>
  )
}

export default Success