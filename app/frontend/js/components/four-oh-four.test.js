// subject:

import fourOhFour from '@/components/four-oh-four.vue';



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(fourOhFour, {});

  return wrapper;
}



// tests:

describe('component - fourOhFour', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('correctly named', () => {
    expect(fourOhFour.name).toEqual('FourOhFour');
  });

  it('sets page title', () => {
    expect(fourOhFour.metaInfo().title).toEqual('404');
  });

  it('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });
});
