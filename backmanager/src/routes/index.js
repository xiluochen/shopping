import { createRouter, createWebHashHistory } from "vue-router";

import Login from '../views/Login';

import Home from '../views/Home';
import { getSessionToken } from "@/static/utils";

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:Login
        },
        {
            path:'/home',
            component: Home,
            children:[
                {
                    path:'',
                    component:()=>import('../views/Home/DefaultView'),
                },
                {
                    path:'total',
                    component:()=>import('../views/Home/TotalDisplayView'),
                },
                {
                    path:'control',
                    component:()=>import('../views/Home/BasicControlView'),
                    children:[
                        {
                            path:'user',
                            component:()=>import('../views/Home/BasicControlView/UserControlView')
                        },
                        {
                            path:'root',
                            component:()=>import('../views/Home/BasicControlView/RootControlView')
                        },
                    ],
                },
                {
                    path:'pay',
                    component:()=>import('../views/Home/PaysControlView'),
                },
                {
                    path:'brand',
                    component:()=>import('../views/Home/BrandsControlView'),
                },
                {
                    path:'setting',
                    component:()=>import('../views/Home/SettingsView'),
                },
            ],
        }
    ]
});

router.beforeEach((to,from,next)=>{
    if(from.path !== '/'&&to.path !== '/') {
        let token = getSessionToken();
        if(!token){
            next('/');
            return;
        }else {
            next();
            return;
        }
    }
    next();
    return;
});

export default router;