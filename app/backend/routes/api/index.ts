import example from './example';
import { Routers } from '@/routes';

function api(routers: Routers): void {
  routers.public.get('/api/example', example.get);
  routers.public.post('/api/example', example.post);
}

export default api;
