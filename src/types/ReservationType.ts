export type ReservationType = {
  id: string,
  title: string,
  discount: number,
}

export type ResponseReservationTypes = {
  items: ReservationType[]
}