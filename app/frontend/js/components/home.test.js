// subject:

import home from '@/components/home.vue';



// dependencies:

import weather from '@/services/weather';



// mocks:

jest.mock('@/services/weather');



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(home, {});

  return wrapper;
}



// tests:

describe('component - home', () => {
  let wrapper;

  beforeEach(() => {
    weather.current.mockClear();

    wrapper = createWrapper();
  });

  it('correctly named', () => {
    expect(home.name).toEqual('Home');
  });

  it('sets page title', () => {
    expect(home.metaInfo().title).toEqual('Home');
  });

  it('defaults model values', () => {
    expect(home.data().subtitle).toEqual('Time to get to work...');
    expect(home.data().weather).toEqual({
      temperature: 0,
      description: null
    });
    expect(home.data().weatherIsLoading).toEqual(false);
    expect(home.data().weatherFailedToLoad).toEqual(false);
  });

  it('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });



  describe('created()', () => {
    beforeEach(() => {
      home.loadCurrentWeather = jest.fn();

      home.created();
    });

    it('calls loadCurrentWeather()', () => {
      expect(home.loadCurrentWeather).toHaveBeenCalled();
    });

    afterEach(() => {
      delete home.loadCurrentWeather;
    });
  });



  describe('methods.loadCurrentWeather()', () => {
    beforeEach(() => {
      wrapper.vm.weatherIsLoading = false;
      wrapper.vm.weatherFailedToLoad = true;

      wrapper.vm.loadCurrentWeather();
    });

    it('sets weatherIsLoading to true', () => {
      expect(wrapper.vm.weatherIsLoading).toEqual(true);
    });

    it('sets weatherFailedToLoad to false', () => {
      expect(wrapper.vm.weatherFailedToLoad).toEqual(false);
    });

    it('requests current weather', () => {
      expect(weather.current).toHaveBeenCalled();
    });

    describe('when request succeeds', () => {
      beforeEach(() => {
        weather.current.mockResolvedValue({
          main: {
            temp: 72
          },
          weather: [
            {
              description: 'cloudy with a chance of meatballs'
            }
          ]
        });

        return wrapper.vm.loadCurrentWeather();
      });

      it('sets weatherIsLoading to false', () => {
        expect(wrapper.vm.weatherIsLoading).toEqual(false);
      });

      it('keeps weatherFailedToLoad set to false', () => {
        expect(wrapper.vm.weatherFailedToLoad).toEqual(false);
      });
    });

    describe('when request fails', () => {
      beforeEach(() => {
        weather.current.mockRejectedValue();

        return wrapper.vm.loadCurrentWeather();
      });

      it('sets weatherIsLoading to false', () => {
        expect(wrapper.vm.weatherIsLoading).toEqual(false);
      });

      it('sets weatherFailedToLoad to true', () => {
        expect(wrapper.vm.weatherFailedToLoad).toEqual(true);
      });
    });
  });
});
