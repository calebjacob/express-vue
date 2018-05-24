const axios = jest.genMockFromModule('axios');



axios.create = jest.fn(() => {
  return 'axios instance';
});



module.exports = axios;
