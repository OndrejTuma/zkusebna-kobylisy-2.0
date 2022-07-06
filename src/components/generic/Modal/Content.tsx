import Box from '@mui/material/Box'
import React from 'react'

type Props = {
  children?: React.ReactNode,
}

const Content = ({ children }: Props) => {
  return (
    <Box id="modal-description">
      {children}
    </Box>
  )
}

export default Content