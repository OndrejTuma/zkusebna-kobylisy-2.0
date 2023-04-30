import { DateCellWrapperProps } from 'react-big-calendar'
import { styled } from '@mui/material/styles'

import isDateCurrentOrFuture from 'Utils/isDateCurrentOrFuture'

const Wrapper = styled('div')({
  '&': {
    display: 'flex',
  },
})

const DateCellComponent = (props: DateCellWrapperProps) => {
  const isCurrentOrFuture = isDateCurrentOrFuture(props.value)

  return (
    <Wrapper sx={{
      cursor: isCurrentOrFuture ? 'pointer' : 'default',
    }} className='rbc-day-bg'>{props.children}</Wrapper>
  )
}

export default DateCellComponent
