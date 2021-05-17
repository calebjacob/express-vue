// subject:

import http from './http';

// dependencies:

import axios from 'axios';

// mocks:

jest.mock('axios', () => {
  return {
    create: jest.fn().mockReturnValue('mock axios instance')
  };
});

// tests:

describe('http', () => {
  it('creates an axios instance', () => {
    expect(axios.create).toHaveBeenCalledWith({
      timeout: 15000
    });
  });

  it('exports the axios instance', () => {
    expect(http).toEqual('mock axios instance');
  });
});
