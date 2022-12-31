const getCacheKey = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()

  return `getMonthReservations-${year}-${month}`
}

export default getCacheKey
