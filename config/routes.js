export  const routes = [
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
                component: '@/pages/Profile/profile',
            },
            {
                path: '/post/:postId',
                component: '@/pages/Post/PostDetail',
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

]