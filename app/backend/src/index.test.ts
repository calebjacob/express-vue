// Dependencies:

import { createServer } from '@/server';
import moduleAlias from 'module-alias';

// Mocks:

jest.mock('module-alias');
jest.mock('@/server');

// Tests:

describe('index', () => {
  beforeEach(async () => {
    await import('./index');
  });

  it('configures aliases', () => {
    expect(moduleAlias.addAlias).toBeCalledWith('@', __dirname);
    expect(moduleAlias.addAlias).toBeCalledWith('shared', __dirname.replace('backend/src', 'shared'));
  });

  it('creates the server', () => {
    expect(createServer).toBeCalled();
  });
});
