import axios from 'axios'

export const getAllItems = () => axios.get('/api/items?range=[0,999]')
export const getAllCategories = () => axios.get('/api/categories?range=[0,99]')
export const getAllReservations = () => axios.get('/api/reservations?range=[0,9999]')
export const getReservationType = (id: string) => axios.get(`/api/reservation-types/${id}`)