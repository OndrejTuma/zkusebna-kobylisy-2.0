const getDiscountPrice = (price: number, discount: number): number => price * (100 - discount) / 100

export default getDiscountPrice