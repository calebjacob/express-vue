const axios = jest.genMockFromModule('axios');



axios.create = jest.fn(() => {
  return 'axios instance';
});



export default axios;
