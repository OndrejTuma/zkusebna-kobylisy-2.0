import React from 'react'
import Alert from '@mui/material/Alert'

type Props = {
  children?: React.ReactNode,
}

const Error = ({ children }: Props) => {
  return (
    <Alert severity={'error'}>{children}</Alert>
  )
}

export default Error