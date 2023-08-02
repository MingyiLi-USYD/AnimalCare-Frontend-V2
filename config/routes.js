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
                path: '/',
                redirect: '/home',
            },
            {
                path: '/home',
                component: '@/pages/Home/home',
            },
            {
                path: '/chat',
                component: '@/pages/Chat/chat',
            },
            {
                path: '/new',
                routes: [
                    {
                        name: 'Post',
                        path: '/new/post',
                        component: '@/pages/New/newPost',
                    },
                    {
                        name: 'Pet',
                        path: '/new/pet',
                        component: '@/pages/New/newPet',
                    },

                ],
            },
            {
                name: '好友',
                path: '/friend',
                component: '@/pages/Friend/friend',
            },
            {
                path: '/dashboard',
                component: '@/pages/Dashboard/dashboard',
                routes: [
                    {
                        path: '/dashboard',
                        redirect: '/dashboard/statistics',
                    },
                    {
                        path: '/dashboard/statistics',
                        component: '@/pages/Dashboard/Components/Statistics/statistics',
                    },
                    {
                        path: '/dashboard/server',
                        component: '@/pages/Dashboard/Components/Servers/server',
                    },
                ],
            },
            {
                path: '/profile/:id',
                component: '@/pages/Profile/profile',
            },
            {
                path: '/post/:postId',
                component: '@/pages/Post/postDetail',
            },
            {
                path: '/pet/:petId',
                component: '@/pages/Pet/petDetail',
            },
            {
                path: '/pet',
                component: '@/pages/Pet/petList',
            },
            {
                path: '/post',
                component: '@/pages/Post/postList',
            },
            {
                path: '/setting',
                component: '@/pages/Setting/setting',
            },
            {
                path: '/medical',
                component: '@/pages/Medical/medical',
                access: 'canViewMedical',
            },
            { path: '/*', redirect:'/home'},
        ],
    },

]