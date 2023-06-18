export type Reservation = {
  id?: string | null,
  dateStart?: string | null,
  dateEnd?: string | null,
  reservationType?: string,
  reservationName?: string | null,
  name?: string,
  phone?: string,
  email?: string,
  archived?: boolean,
  paid?: boolean,
  price?: number,
  itemIds: string[],
}

export type AdminReservation = Reservation & {
  isRecurring: boolean,
  INTERVAL: 1 | 2 | 3 | 4 | 5,
  FREQ: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY',
  UNTIL: string,
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
  image?: {
    src: string,
  },
  category_id?: string,
  busy?: boolean,
}

export type ReservationType = {
  id: string,
  title: string,
  discount: number,
}

export type ResponseReservationTypes = ReservationType[]