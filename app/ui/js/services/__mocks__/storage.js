const storage = {
  cookie: {
    set: jest.fn(),
    get: jest.fn((key) => {
      return `get cookie storage - ${key}`;
    })
  },

  local: {
    set: jest.fn(),
    get: jest.fn((key) => {
      return `get local storage - ${key}`;
    })
  },

  session: {
    set: jest.fn(),
    get: jest.fn((key) => {
      return `get session storage - ${key}`;
    })
  }
};



export default storage;
