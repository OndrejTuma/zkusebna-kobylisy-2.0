import isDateCurrentOrFuture from './isDateCurrentOrFuture'

describe('isDateCurrentOrFuture', () => {
  it('returns true if date is today', () => {
    const today = new Date();
    expect(isDateCurrentOrFuture(today)).toBe(true);
  });

  it('returns true if date is in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(isDateCurrentOrFuture(futureDate)).toBe(true);
  });

  it('returns false if date is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(isDateCurrentOrFuture(pastDate)).toBe(false);
  });
});
