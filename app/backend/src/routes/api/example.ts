import { Handler, Response, Request } from '@/routes/types';
import {
  SomethingPublicResponse,
  SomethingPrivateResponse
} from 'shared/types';

const somethingPrivate: Handler = (
  req: Request,
  res: Response<SomethingPrivateResponse>
): void => {
  res.json({
    address: '1234 Hobbit Ln, Shire',
    age: 51,
    birthday: '9/22/2968'
  });
};

const somethingPublic: Handler = (
  req: Request,
  res: Response<SomethingPublicResponse>
): void => {
  res.json({
    lovesFood: true,
    name: 'Frodo'
  });
};

export default {
  somethingPublic,
  somethingPrivate
};
