import { ReservationItem } from 'LocalTypes'
import Error from 'Components/generic/Error'

type EventModalDataProps = {
  items: ReservationItem[]
  itemIds: string[]
}

const EventModalData = ({ items, itemIds }: EventModalDataProps) => {
  const reservationItems = items.filter(({ id }) => itemIds.includes(id))

  if (items.length === 0) {
    return <Error>Tato rezervace neobsahuje žádné položky</Error>
  }

  return (
    <ul>
      {reservationItems.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  )
}

export default EventModalData
