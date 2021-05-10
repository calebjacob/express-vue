import example from './example';
import { Routers } from '@/routes';

function middleware(routers: Routers): void {
  routers.public.use(example);
}

export default middleware;
