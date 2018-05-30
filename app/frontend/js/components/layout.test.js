// subject:

import layout from '@/components/layout.vue';



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(layout, {});

  return wrapper;
}



// tests:

describe('component - layout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('correctly named', () => {
    expect(layout.name).toEqual('Layout');
  });

  it('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });



  describe('metaInfo.titleTemplate()', () => {
    it('returns base website title when no title chunk is passed in', () => {
      expect(layout.metaInfo.titleTemplate()).toEqual('Simple Vue');
    });

    it('title chuck with base website title when chunk is passed in', () => {
      expect(layout.metaInfo.titleTemplate('Foobar')).toEqual('Foobar | Simple Vue');
    });
  });
});
