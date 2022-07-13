import Typography from '@mui/material/Typography'
import React from 'react'

type Props = {
  children?: React.ReactNode,
}

const Actions = ({ children }: Props) => {
  return (
    <Typography component="div" textAlign="center" mt={4}>
      {children}
    </Typography>
  )
}

export default Actions