import Box from '@mui/material/Box'
import React from 'react'

type Props = {
  children?: React.ReactNode,
}

const contentStyle = {
  display: 'flex',
  flex: '1 1 auto',
  overflowY: 'hidden',
}
const contentInnerStyle = {
  flex: '1 1 auto',
  overflow: 'auto',
}

const Content = ({ children }: Props) => {
  return (
    <Box id="modal-description" sx={contentStyle}>
      <Box sx={contentInnerStyle}>
        {children}
      </Box>
    </Box>
  )
}

export default Content