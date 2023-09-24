import { defineConfig } from 'umi';
import {routes} from "./routes";


const backend = 'http://localhost:9257'

export default defineConfig({
  headScripts:["https://accounts.google.com/gsi/client","https://apis.google.com/js/api:client.js"],

  jsMinifier: 'terser',
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/request',
    '@umijs/plugins/dist/dva',
    '@umijs/plugins/dist/access',
  ],
  model: {},
  request: {},
  initialState: {
  },
  access: {
  },
  dva:{
    immer: {
    },
  },
  npmClient: 'yarn',
  routes,
  proxy: {
    '/api': {
      // 标识需要进行转换的请求的url
      target: backend, // 服务端域名
      changeOrigin: true, // 允许域名进行转换
      pathRewrite: { '^/api': '' }, // 将请求url里的ci去掉
    },
    '/common': {
      // 标识需要进行转换的请求的url
      target: backend, // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
    '/socket.io': {
      target: backend,
      ws: true,
      changeOrigin: true,
    },
  },
});
