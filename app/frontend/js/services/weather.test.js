// subject:

import weather from '@/services/weather';



// dependencies:

import http from '@/services/http';



// mocks:

jest.mock('@/services/http');



// tests:

describe('service - weather', () => {
  beforeEach(() => {
    http.get.mockClear();
  });

  describe('current()', () => {
    beforeEach(() => {
      weather.current().catch(() => {});
    });

    it('makes GET request to weather API', () => {
      expect(http.get).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          APPID: '2e2a8390dae7fbc708e7a0f795a6e46f',
          units: 'imperial',
          zip: '80215,us'
        }
      });
    });

    describe('when request succeeds', () => {
      beforeEach(() => {
        http.get.mockResolvedValue({
          data: 'weather data'
        });
      });

      it('data is returned', async () => {
        const response = await weather.current();

        expect(response).toEqual('weather data');
      });
    });

    describe('when request fails', () => {
      const requestError = new Error('something exploded');

      beforeEach(() => {
        http.get.mockRejectedValue(requestError);
      });

      it('throws error', async () => {
        expect.hasAssertions();

        try {
          await weather.current();
        }

        catch (error) {
          expect(error).toEqual(requestError);
        }
      });
    });
  });
});
