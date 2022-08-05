import axios from 'axios'

const getAllReservationTypes = () => axios.get('/api/reservation-types?range=[0,99]')

export default getAllReservationTypes