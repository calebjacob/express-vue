import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import vue from '@vitejs/plugin-vue';

const { parsed: config = {} } = dotenv.config();

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^@\/(.*)$/,
        replacement: `${process.cwd()}/app/frontend/src/$1`
      },
      {
        find: /^shared\/(.*)$/,
        replacement: `${process.cwd()}/app/shared/$1`
      }
    ]
  },
  root: `${process.cwd()}/app/frontend`,
  server: {
    port: config.PORT_DEV_FE,
    proxy: {
      '^/(api|images)': {
        target: `http://localhost:${config.PORT}`,
        changeOrigin: true
      }
    }
  }
});
