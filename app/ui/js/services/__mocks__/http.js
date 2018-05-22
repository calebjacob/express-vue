const http = {
  delete: jest.fn().mockReturnValue(new Promise(() => {})),
  get: jest.fn().mockReturnValue(new Promise(() => {})),
  patch: jest.fn().mockReturnValue(new Promise(() => {})),
  post: jest.fn().mockReturnValue(new Promise(() => {})),
  put: jest.fn().mockReturnValue(new Promise(() => {}))
};



export default http;
