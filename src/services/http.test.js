// subject:

import http from '@/services/http';



// dependencies:

import axios from 'axios';



// mocks:

jest.mock('axios');



// tests:

describe('service - http', () => {
  it('creates an axios instance with optinos', () => {
    expect(axios.create).toBeCalledWith({
      timeout: 10000
    });
  });

  it('exports axios instance', () => {
    expect(http).toEqual('axios instance');
  });
});
