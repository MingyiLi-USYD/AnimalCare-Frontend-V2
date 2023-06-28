import { defineConfig } from 'umi';


export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/request',
    '@umijs/plugins/dist/dva',
  ],
  headScripts: [
    'https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js',
  ],
  styles: [
    'https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css',
  ],
  model: {},
  request: {},
  initialState: {},
  dva:{},
  npmClient: 'yarn',
  routes: [
 /*   { path: '/', redirect:'/home'},*/
    {
      name: 'Login',
      path: '/login',
      component: './Login',
    },
    {
      name: 'SignUp',
      path: '/signup',
      component: './SignUp/SignUp',
    },
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        {
          path: '/home',
          component: '@/pages/Home/index',
        },
        {
          path: '/chat',
          component: '@/pages/Chat/Chat',
        },
        {
          path: '/new',
          routes: [
            {
              name: 'Post',
              path: '/new/post',
              component: '@/pages/New/NewPost',
            },
            {
              name: 'Pet',
              path: '/new/pet',
              component: '@/pages/New/NewPet',
            },

          ],
        },
        {
          name: '好友',
          path: '/friend',
          component: '@/pages/Friend/Friend',
        },
        {
          path: '/profile/:id',
          component: '@/pages/Profile/Profile',
        },
        {
          path: '/post/:postId',
          component: '@/pages/Comment/Comment',
        },
        {
          path: '/pet/:petId',
          component: '@/pages/Pet/PetDetail',
        },
        {
          path: '/pet',
          component: '@/pages/Pet/PetList',
        },
        {
          path: '/post',
          component: '@/pages/Post/PostList',
        },
        {
          path: '/setting',
          component: './Setting/Setting',
        },
        { path: '/*', redirect:'/home'},
      ],
    },

  ],
  proxy: {
    '/api': {
      // 标识需要进行转换的请求的url
      target: 'http://localhost:8080', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
      pathRewrite: { '^/api': '' }, // 将请求url里的ci去掉
    },
    '/common': {
      // 标识需要进行转换的请求的url
      target: 'http://localhost:8080', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
/*    '/chat': {
      target: 'ws://localhost:8080', // 将目标设置为 WebSocket 服务器地址
      ws: true,
      changeOrigin: true,
      /!*    'pathRewrite': {'^/ws': '' },*!/
    },*/
    '/socket.io': {
      target: 'http://localhost:8888',
      ws: true,
      changeOrigin: true,
    },
  },
});
