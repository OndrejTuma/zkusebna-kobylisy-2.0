import React from 'react'

export const ReservationTypeContext = React.createContext({
  id: '',
  discount: 0,
  title: '',
})

export const Provider = ReservationTypeContext.Provider