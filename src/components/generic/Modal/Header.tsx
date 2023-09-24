import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

type Props = {
  title?: React.ReactNode
  children?: React.ReactNode
}

const Header = ({ title, children }: Props) => (
  <Box id='modal-title' mb={2}>
    {title && <Typography component='h2' variant='h6'>{title}</Typography>}
    {children}
  </Box>
)

export default Header
