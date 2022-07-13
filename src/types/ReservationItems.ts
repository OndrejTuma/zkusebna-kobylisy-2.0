export type ReservationItem = {
  id: string,
  title: string,
  code?: string,
  price: number,
  active: boolean,
  image?: string,
  category_id: string,
}