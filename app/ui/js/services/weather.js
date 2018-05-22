import http from '@/services/http';



const apiKey = '2e2a8390dae7fbc708e7a0f795a6e46f';



const weather = {
  async current() {
    try {
      const response = await http.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          APPID: apiKey,
          units: 'imperial',
          zip: '80215,us'
        }
      });

      return response.data;
    }

    catch (error) {
      throw error;
    }
  }
};



export default weather;
