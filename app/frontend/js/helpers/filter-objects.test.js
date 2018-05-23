// subject:

import filterObjects from '@/helpers/filter-objects';


// tests:

describe('helpers - filterObjects', () => {
  const objectOne = {
    name: 'Von Miller',
    state: 'Colorado',
    appearance: {
      hairColor: 'Brown'
    }
  };

  const objectTwo = {
    name: 'Donald Trump',
    state: 'Colorado',
    appearance: {
      hairColor: 'Yellow'
    }
  };

  const objectThree = {
    name: 'B.o-b\'s Mike',
    state: 'Virginia',
    appearance: {
      hairColor: 'Brown'
    }
  };

  const objects = [objectOne, objectTwo, objectThree];
  const searchKeys = ['name', 'state', 'appearance.hairColor'];

  describe('when searchTerm is null', () => {
    it('no objects are filtered out', () => {
      const results = filterObjects(null, searchKeys, objects);
      expect(results).toEqual(objects);
    });
  });

  describe('when searchTerm is defined', () => {
    it('filters based on exact match', () => {
      const results = filterObjects('Colorado', searchKeys, objects);
      expect(results).toEqual([objectOne, objectTwo]);
    });

    it('filters based on partial match', () => {
      const results = filterObjects('Colo', searchKeys, objects);
      expect(results).toEqual([objectOne, objectTwo]);
    });

    it('filters based on exact match of multiple words', () => {
      const results = filterObjects('Von Colorado', searchKeys, objects);
      expect(results).toEqual([objectOne]);
    });

    it('filters based on partial match of multiple words', () => {
      const results = filterObjects('Do Tru Co', searchKeys, objects);
      expect(results).toEqual([objectTwo]);
    });

    it('filters based on nested params', () => {
      const results = filterObjects('Brown', searchKeys, objects);
      expect(results).toEqual([objectOne, objectThree]);
    });

    it('matches even when words are in reverse order', () => {
      const results = filterObjects('Trump Donald', searchKeys, objects);
      expect(results).toEqual([objectTwo]);
    });

    it('ignores character case', () => {
      const results = filterObjects('vOn MiLlEr', searchKeys, objects);
      expect(results).toEqual([objectOne]);
    });

    it('ignores basic grammar in content being searched', () => {
      const results = filterObjects('bobs', searchKeys, objects);
      expect(results).toEqual([objectThree]);
    });

    it('ignores basic grammar in searchTerm', () => {
      const results = filterObjects('V-o.\'n', searchKeys, objects);
      expect(results).toEqual([objectOne]);
    });
  });
});
