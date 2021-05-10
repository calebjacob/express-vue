import vue from './vue';
import { Routers } from '@/routes';

function pages(routers: Routers): void {
  routers.public.get(/^(?!\/api).*/, vue.get);
}

export default pages;
