// subject:

import moment from '@/filters/moment';



// tests:

describe('filter - moment()', () => {
  it('returns a moment formatted date', () => {
    expect(moment('2017-11-30T14:00:00-05:00', 'dddd, MMMM Do YYYY')).toEqual('Thursday, November 30th 2017');
  });

  it('returns an empty string if no value is passed', () => {
    expect(moment(null, 'dddd, MMMM Do YYYY h:mm:ss A')).toEqual('');
  });
});
