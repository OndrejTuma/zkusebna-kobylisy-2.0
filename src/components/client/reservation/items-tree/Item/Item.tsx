import Grid from '@mui/material/Grid'
import { ReservationItem } from 'LocalTypes'
import React, { useContext } from 'react'
import { ReservationTypeContext } from '../ReservationTypeContext'

const czkFormatter = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  maximumFractionDigits: 0,
})

const getFormattedPrice = (price: number) => czkFormatter.format(price)
const getDiscountPrice = (price: number, discount: number) => price * (100 - discount) / 100

const Item = ({ title, code, price }: Pick<ReservationItem, 'title' | 'code' | 'price'>) => {
  const { discount } = useContext(ReservationTypeContext)

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        {title} <small>{code ? `(${code})` : ''}</small>
      </Grid>
      <Grid item>{getFormattedPrice(getDiscountPrice(price, discount))}</Grid>
    </Grid>
  )
}

export default Item