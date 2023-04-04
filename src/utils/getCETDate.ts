import addMinutes from 'date-fns/addMinutes'

const cetTZOffset = 60

const getCETDate = (date: Date | string): Date => {
  const hrOffset = new Date().getTimezoneOffset() + cetTZOffset

  return addMinutes(new Date(date), hrOffset)
}

export default getCETDate