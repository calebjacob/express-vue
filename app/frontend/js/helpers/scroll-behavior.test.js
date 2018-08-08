// subject:

import scrollBehavior from '@/helpers/scroll-behavior';



// tests:

describe('helpers - scrollBehavior()', () => {
  it('returns savedPosition if passed', () => {
    expect(scrollBehavior({}, {}, {
      x: 7,
      y: 200
    })).toEqual({
      x: 7,
      y: 200
    });
  });

  it('returns 0 if no savedPosition is passed', () => {
    expect(scrollBehavior({}, {}, null)).toEqual({
      x: 0,
      y: 0
    });
  });
});
