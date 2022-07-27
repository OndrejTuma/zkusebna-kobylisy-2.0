export type Reservation = {
  id?: string | null,
  dateStart?: string | null,
  dateEnd?: string | null,
  reservationType?: string,
  reservationName?: string | null,
  name?: string,
  phone?: string,
  email?: string,
  itemIds: string[],
}

export type ReservationItemCategory = {
  id: string,
  title: string,
  parent_id?: string,
}

export type ReservationItem = {
  id: string,
  title: string,
  code?: string,
  price: number,
  active: boolean,
  image?: string,
  category_id: string,
}

export type ReservationType = {
  id: string,
  title: string,
  discount: number,
}

export type ResponseReservationTypes = ReservationType[]