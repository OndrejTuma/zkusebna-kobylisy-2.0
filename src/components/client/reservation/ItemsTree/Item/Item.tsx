import Grid from '@mui/material/Grid'
import { ReservationItem } from 'LocalTypes'
import React from 'react'

const czkFormatter = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  maximumFractionDigits: 0,
})

const getFormattedPrice = (price: number) => czkFormatter.format(price)

const Item = ({ title, code, price }: ReservationItem) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        {title} <small>{code ? `(${code})` : ''}</small>
      </Grid>
      <Grid item>{getFormattedPrice(price)}</Grid>
    </Grid>
  )
}

export default Item