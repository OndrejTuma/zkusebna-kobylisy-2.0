import transformUntilParameter from './convertToGoogleCalendarUntil'

describe('convertToGoogleCalendarUntil', () => {
  test('converts ISO date to Google Calendar compliant format', () => {
    const isoDate = '2023-09-08T14:58:00.000Z';
    const expected = '20230908T165800Z';
    const result = transformUntilParameter(isoDate);
    expect(result).toEqual(expected);
  });

  test('converts ISO date with different time to Google Calendar compliant format', () => {
    const isoDate = '2023-09-08T09:30:00.000Z';
    const expected = '20230908T113000Z';
    const result = transformUntilParameter(isoDate);
    expect(result).toEqual(expected);
  });
});
