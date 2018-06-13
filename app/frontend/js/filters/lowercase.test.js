// subject:

import lowercase from '@/filters/lowercase';



// tests:

describe('filter - lowercase()', () => {
  describe('when acronyms should remain uppercase', () => {
    it('returns a string as all lowercase if passed value is not all caps', () => {
      expect(lowercase('Foo BaR Baz', true)).toEqual('foo bar baz');
    });

    it('returns a string as all uppercase if passed value is all caps', () => {
      expect(lowercase('FOO BAR BAZ', true)).toEqual('FOO BAR BAZ');
    });

    it('returns an empty string if no value is passed', () => {
      expect(lowercase(null, true)).toEqual('');
    });
  });

  describe('when acronyms should not remain uppercase', () => {
    it('returns a string as all lowercase', () => {
      expect(lowercase('Foo BaR Baz')).toEqual('foo bar baz');
    });

    it('returns an empty string if no value is passed', () => {
      expect(lowercase(null)).toEqual('');
    });
  });
});
