import CommodityPage from "../pages/CommodityPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PreservePage from "../pages/PreservePage";
import SettlementPage from "../pages/SettlementPage";
import UserCenterPage from "../pages/UserCenterPage";
import AftServices from "../pages/UserCenterPage/Elements/AftServices";
import Collect from "../pages/UserCenterPage/Elements/Collect";
import DefaultPage from "../pages/UserCenterPage/Elements/DefaultPage";
import FootHis from "../pages/UserCenterPage/Elements/FootHis";
import PayForHis from "../pages/UserCenterPage/Elements/PayForHis";
import ShopCar from "../pages/UserCenterPage/Elements/ShopCar";
import PayForPage from '../pages/PayForPage';
import ResultSuccess from "../pages/PayForPage/PayResult/Success";

import UserDetail from "../pages/UserCenterPage/Elements/UserDetail";

export default [
    {
        path:'/',
        element:<HomePage />
    },
    {
        path:'/login',
        element: <LoginPage />
    },
    {
        path:'/commodity/:id',
        element: <CommodityPage />
    },
    {
        path: '/user',
        element: <UserCenterPage />,
        children: [
            {
                path:'',
                element: <DefaultPage />
            },
            {
                path:'userdetail',
                element:<UserDetail />
            },
            {
                path:'payforhis',
                element:<PayForHis />
            },
            {
                path:'shopcar',
                element:<ShopCar />
            },
            {
                path:'collect',
                element:<Collect />
            },
            {
                path:'aftservices',
                element:<AftServices />
            },
            {
                path:'foothis',
                element:<FootHis />
            },
        ],
    },
    {
        path: '/preserve',
        element: <PreservePage />
    },
    {
        path: '/settle/:id/:num',
        element: <SettlementPage />
    },
    {
        path:'/payfor',
        element: <PayForPage />,
    },
    {
        path:'/payresult',
        children:[
            {
                path:'success',
                element:<ResultSuccess />
            }
        ],
    }
]