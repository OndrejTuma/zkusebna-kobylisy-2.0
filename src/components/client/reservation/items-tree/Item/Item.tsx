import Grid from '@mui/material/Grid'
import { ReservationItem } from 'LocalTypes'
import React, { useContext } from 'react'
import formatNumberToCZK from 'Utils/formatNumberToCZK'
import getDiscountPrice from 'Utils/getDiscountPrice'
import { ReservationTypeContext } from '../ReservationTypeContext'

const Item = ({
  title,
  code,
  price,
}: Pick<ReservationItem, 'title' | 'code' | 'price'>) => {
  const { discount } = useContext(ReservationTypeContext)

  return (
    <Grid container justifyContent='space-between' flexWrap='nowrap'>
      <Grid item>
        {title} <small>{code ? `(${code})` : ''}</small>
      </Grid>
      <Grid item>{formatNumberToCZK(getDiscountPrice(price, discount))}</Grid>
    </Grid>
  )
}

export default Item
