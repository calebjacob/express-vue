import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import vue from '@vitejs/plugin-vue';

const { parsed: config = {} } = dotenv.config();

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  publicDir: false,
  root: `${process.cwd()}/app/frontend`,
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
  server: {
    port: config.PORT_DEV_FE,
    proxy: {
      '^/(api|images|webfonts|favicon)': {
        target: `http://localhost:${config.PORT}`,
        changeOrigin: true
      }
    }
  }
});
