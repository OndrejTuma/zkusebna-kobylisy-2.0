import addMinutes from 'date-fns/addMinutes'

const getCETDate = (date: Date | string): Date => {
  date = typeof date === 'string' ? new Date(date) : date

  const cetTZOffset = isDaylightSavingTime(date) ? 120 : 60

  const hrOffset = date.getTimezoneOffset() + cetTZOffset

  return addMinutes(date, hrOffset)
}

function isDaylightSavingTime(date: Date): boolean {
  const year = date.getFullYear();
  const dstStart = new Date(`${year}-03-26T01:00:00.000Z`); // DST starts on the last Sunday of March at 2am CET
  const dstEnd = new Date(`${year}-10-29T01:00:00.000Z`); // DST ends on the last Sunday of October at 3am CET
  
  return date >= dstStart && date < dstEnd;
}

export default getCETDate
