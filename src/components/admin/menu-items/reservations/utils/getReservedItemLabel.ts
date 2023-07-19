import { ReservationItem } from 'LocalTypes'

const getReservedItemLabel = (record: ReservationItem) => {
  if (record.code) {
    return `${record.title} (${record.code})`
  }

  return record.title
}

export default getReservedItemLabel
