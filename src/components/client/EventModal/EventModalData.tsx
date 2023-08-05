import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'

import { ReservationItem } from 'LocalTypes'
import Error from 'Components/generic/Error'
import EventItemIcon from './EventItemIcon'

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
    <List>
      {reservationItems.map(({ id, title, image, category_id }) => (
        <ListItem key={id}>
          <EventItemIcon categoryId={category_id} />
          {image && (
            <ListItemAvatar>
              <Avatar alt={title} src={image.src} />
            </ListItemAvatar>
          )}
          <ListItemText>{title}</ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default EventModalData
