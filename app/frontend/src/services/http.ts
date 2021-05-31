import axios, { AxiosError } from 'axios';
import router from '@/router';

const http = axios.create({
  timeout: 15000
});

export function responseErrorInterceptor(error: AxiosError): Promise<void> {
  const { response } = error;

  if (response && response.status === 401) {
    router.push({
      name: 'signIn'
    });
  }

  return Promise.reject(error);
}

http.interceptors.response.use(undefined, responseErrorInterceptor);

export default http;
