import convertToGoogleCalendarUntil from './convertToGoogleCalendarUntil'

describe('convertToGoogleCalendarUntil', () => {
  test('converts ISO date to Google Calendar compliant format', () => {
    const isoDate = '2023-09-08T14:58:00.000Z';
    const expected = '20230908T145800Z';
    const result = convertToGoogleCalendarUntil(isoDate);
    expect(result).toEqual(expected);
  });

  test('converts ISO date with different time to Google Calendar compliant format', () => {
    const isoDate = '2023-09-08T09:30:00.000Z';
    const expected = '20230908T093000Z';
    const result = convertToGoogleCalendarUntil(isoDate);
    expect(result).toEqual(expected);
  });
});
