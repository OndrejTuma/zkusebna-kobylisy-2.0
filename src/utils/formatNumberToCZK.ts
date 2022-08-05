const czkFormatter = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  maximumFractionDigits: 0,
})

const getFormattedPrice = (price: number): string => czkFormatter.format(price)

export default getFormattedPrice