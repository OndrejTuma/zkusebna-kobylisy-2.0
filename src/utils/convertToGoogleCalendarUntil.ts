import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

function convertToGoogleCalendarUntil(date: string): string {
  const originalDate = parseISO(date);
  const utcDate = new Date(Date.UTC(
    originalDate.getUTCFullYear(),
    originalDate.getUTCMonth(),
    originalDate.getUTCDate(),
    originalDate.getUTCHours(),
    originalDate.getUTCMinutes(),
    originalDate.getUTCSeconds(),
    originalDate.getUTCMilliseconds()
  ));

  const formattedDate = format(utcDate, 'yyyyMMdd\'T\'HHmmss\'Z\'');

  return formattedDate;
}

export default convertToGoogleCalendarUntil;
