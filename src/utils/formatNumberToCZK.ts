const getFormattedPrice = (price: number): string => price.toLocaleString('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  maximumFractionDigits: 0,
})

export default getFormattedPrice