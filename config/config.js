import { defineConfig } from 'umi';
import {routes} from "./routes";


export default defineConfig({
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
      target: 'http://localhost:9257', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
      pathRewrite: { '^/api': '' }, // 将请求url里的ci去掉
    },
    '/common': {
      // 标识需要进行转换的请求的url
      target: 'http://localhost:8080', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
    '/socket.io': {
      target: 'http://localhost:8888',
      ws: true,
      changeOrigin: true,
    },
  },
});
