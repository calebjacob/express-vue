import { Route } from '@/types/routes';
import vue from './vue';

const routes: Route[] = [
  {
    handler: vue.get,
    method: 'get',
    path: /^(?!\/api).*/
  }
];

export default routes;
