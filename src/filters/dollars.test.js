// subject:

import dollars from '@/filters/dollars';



// tests:

describe('filter - dollars()', () => {
  it('returns a formatted dollars string based on number', () => {
    expect(dollars(6)).toEqual('$6.00');
    expect(dollars(2.31)).toEqual('$2.31');
    expect(dollars(7.5)).toEqual('$7.50');
    expect(dollars(0.87)).toEqual('$0.87');
    expect(dollars(1.4321)).toEqual('$1.43');
    expect(dollars(10000000)).toEqual('$10,000,000.00');
    expect(dollars(0)).toEqual('$0.00');
  });

  it('returns null if no value is passed', () => {
    expect(dollars(null)).toEqual(null);
    expect(dollars('')).toEqual(null);
  });
});
