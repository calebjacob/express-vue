import engine from 'store/src/store-engine';

import cookieStorage from 'store/storages/cookieStorage';
import localStorage from 'store/storages/localStorage';
import sessionStorage from 'store/storages/sessionStorage';

import defaultsPlugin from 'store/plugins/defaults';
import expirePlugin from 'store/plugins/expire';



const storage = {
  cookie: engine.createStore([cookieStorage], [defaultsPlugin, expirePlugin]),
  local: engine.createStore([localStorage], [defaultsPlugin]),
  session: engine.createStore([sessionStorage], [defaultsPlugin])
};



export default storage;
