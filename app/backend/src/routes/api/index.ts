import auth from './auth';
import example from './example';
import { Routers } from '@/routes';

function api(routers: Routers): void {
  routers.public.post('/api/auth/sign-in', auth.signIn);
  routers.public.post('/api/auth/sign-out', auth.signOut);

  routers.public.get('/api/example', example.get);
  routers.public.post('/api/example', example.post);
}

export default api;
