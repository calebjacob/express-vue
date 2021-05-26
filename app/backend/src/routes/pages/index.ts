import vue from './vue';
import { Route } from '@/routes/types';

const routes: Route[] = [
  {
    handler: vue.get,
    method: 'get',
    path: /^(?!\/api).*/
  }
];

export default routes;
