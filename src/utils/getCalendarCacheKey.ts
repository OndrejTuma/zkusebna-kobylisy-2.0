const getCacheKey = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()

  return `monthReservations-${year}-${month}`
}

export default getCacheKey