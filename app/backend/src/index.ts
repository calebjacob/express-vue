// Enable aliases:
// https://rockyj.in/2019/06/29/path-alias-typescript.html

/* eslint-disable */
import moduleAlias from 'module-alias';
moduleAlias.addAlias('@', __dirname);
moduleAlias.addAlias('shared', __dirname.replace('backend/src', 'shared'));
/* eslint-enable */

import { createServer } from '@/server';

createServer();
