import Container from '@mui/material/Container'
import { ReservationItem } from 'LocalTypes'
import React from 'react'

type Props = {
  items: ReservationItem[]
}

const ChooseItems = ({ items }: Props) => {
  return (
    <Container>
      {items.map(({ id, title, category_id }) => (
        <div key={id}>{title}</div>
      ))}
    </Container>
  )
}

export default ChooseItems