import Typography from '@mui/material/Typography'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Title = ({ children }: Props) => (
  <Typography id="modal-title" variant="h6" component="h2" mb={2}>
    {children}
  </Typography>
)

export default Title