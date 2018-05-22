// subject:

import otherPage from '@/components/other-page.vue';



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(otherPage, {});

  return wrapper;
}



// tests:

describe('component - otherPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('correctly named', () => {
    expect(otherPage.name).toEqual('OtherPage');
  });

  it('defaults model values', () => {
    expect(otherPage.data().name).toEqual(null);
    expect(otherPage.data().phone).toEqual(null);
  });

  it('sets page title', () => {
    expect(otherPage.metaInfo().title).toEqual('Other Page');
  });

  it('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });
});
