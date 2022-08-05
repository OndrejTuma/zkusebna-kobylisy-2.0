import { SlotInfo } from 'react-big-calendar'
import setHours from 'date-fns/setHours'
import getHours from 'date-fns/getHours'

const getStartEndDatetimeFromBigCalendarSlotInfo = (slotInfo?: SlotInfo): [Date, Date] => {
  if (!slotInfo) {
    return [new Date(), new Date()]
  }

  const hours = getHours(new Date())

  const start = setHours(slotInfo.slots[0], hours + 1)
  const end = setHours(slotInfo.slots[slotInfo.slots.length - 1], hours + 2)

  return [start, end]
}

export default getStartEndDatetimeFromBigCalendarSlotInfo