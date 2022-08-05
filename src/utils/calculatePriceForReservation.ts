import { Reservation, ReservationItem, ReservationType } from 'LocalTypes'
import getDiscountPrice from 'Utils/getDiscountPrice'

const calculatePriceForReservation = (reservation: Reservation, items: ReservationItem[], reservationTypes: ReservationType[]): number => {
  const reservationType = reservationTypes.find(({id}) => id === reservation.reservationType)
  const price = items
    .filter(({id}) => reservation.itemIds.includes(id))
    .map(({price}) => price)
    .reduce<number>((sum, price) => sum + price, 0)

  if (!reservationType) {
    throw Error(`Reservation type (${reservation.reservationType}) not found for reservation ${reservation.id}`)
  }

  return getDiscountPrice(price, reservationType.discount)
}

export default calculatePriceForReservation