import type { CircularProgressProps } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

type Props = CircularProgressProps & {
  children?: React.ReactNode
}

const Loader = ({ children, ...rest }: Props) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box>
        <CircularProgress {...rest} />
      </Box>
      {children}
    </Box>
  )
}

export default Loader