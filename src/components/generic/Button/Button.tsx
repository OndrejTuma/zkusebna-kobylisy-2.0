import React from 'react'
import MUIButton from '@mui/material/Button'
import type { ButtonProps } from '@mui/material'

type Props = ButtonProps

const Button = ({ children, variant = 'contained', ...rest }: Props) => {
  return (
    <MUIButton variant={variant} {...rest}>{children}</MUIButton>
  )
}

export default Button