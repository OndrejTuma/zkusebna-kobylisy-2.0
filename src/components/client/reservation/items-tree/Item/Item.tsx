import Grid from '@mui/material/Grid'
import React, { useContext } from 'react'

import { ReservationItem } from 'LocalTypes'
import formatNumberToCZK from 'Utils/formatNumberToCZK'
import getDiscountPrice from 'Utils/getDiscountPrice'
import QuietTime from '../QuietTime'
import { ReservationTypeContext } from '../ReservationTypeContext'

type ItemProps = Pick<ReservationItem, 'title' | 'code' | 'price'> & {
  isQuietTime?: boolean
}

const Item = ({ title, code, price, isQuietTime }: ItemProps) => {
  const { discount } = useContext(ReservationTypeContext)

  return (
    <Grid container justifyContent='space-between' flexWrap='nowrap'>
      <Grid item>
        {title} <small>{code ? `(${code})` : ''}</small>
        {isQuietTime && <QuietTime />}
      </Grid>
      <Grid item>{formatNumberToCZK(getDiscountPrice(price, discount))}</Grid>
    </Grid>
  )
}

export default Item
