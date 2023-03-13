import Box from '@mui/material/Box'
import { EventProps, Event } from 'react-big-calendar'

const EventComponent = ({ event }: EventProps<Event>) => {
  const { title } = event

  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      py: 0.5,
      px: 1,
      borderRadius: 1.5,
    }}>
      {title}
    </Box>
  )
}

export default EventComponent
