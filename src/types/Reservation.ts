export type Reservation = {
  dateStart: string,
  dateEnd: string,
  reservationType: string,
  reservationName: string,
  name: string,
  phone: string,
  email: string,
  items: string[],
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