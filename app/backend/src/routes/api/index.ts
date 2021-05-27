import auth from './auth';
import authRequired from '@/routes/middleware/auth-required';
import example from './example';
import { Route } from '@/types/routes';

const routes: Route[] = [
  {
    handler: auth.register,
    method: 'post',
    path: '/api/auth/register'
  },
  {
    handler: auth.signIn,
    method: 'post',
    path: '/api/auth/sign-in'
  },
  {
    handler: auth.signOut,
    method: 'post',
    path: '/api/auth/sign-out'
  },
  {
    handler: auth.currentUser,
    method: 'get',
    path: '/api/auth/current',
    middleware: [authRequired]
  },
  {
    handler: example.somethingPublic,
    method: 'get',
    path: '/api/something-public'
  },
  {
    handler: example.somethingPrivate,
    method: 'get',
    path: '/api/something-private',
    middleware: [authRequired]
  }
];

export default routes;
