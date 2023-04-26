import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Logo from "../../components/Logo";
import TopHeader from "../../components/TopHeader";

import { userCenterItems } from "../../static/data";
import { requireLogout, requireUserInfo } from "../../static/require";

import {
    UserCenterNavBox,
    UserCenterNavLogo,
    UserCenterNavH2,
    UserTit,
    UserAvator,
    UserNameBlock,
    UserCenterBody,
    UserChoiceItemBox,
    UserChoiceItem,
    ItemBody
} from './index.css.jsx'

let token = '';

export default function UserCenterPage(){
    let loc = useLocation();
    const navigate = useNavigate();
    let lastPath = loc.pathname.split('/').pop();

    let [userInfo, setUserInfo] = useState({});

    const logo = require('../../imgs/logo.png');

    let token = window.sessionStorage.getItem('token') || '';
    if(token===''){
        navigate('/login');
    }

    const askUserInfo = useCallback(async ()=>{
        let res = await requireUserInfo();
        if(res.status === 200){
            setUserInfo(res.data.data);
        }else {
            setUserInfo({});
        }
    }, [])

    const handlerUserClick = async ()=>{
        if(userInfo.username){
            let flag = window.confirm('是否登出?');
            if(flag){
                let res = await requireLogout();
                if(res.status === 200){
                    window.sessionStorage.removeItem('token');
                    navigate('/login', {
                        replace:true,
                    })
                }
            }
        }else {
            navigate('/login')
        }
    }

    useEffect(()=>{
        token = window.sessionStorage.getItem('token') || '';
        if(token){
            askUserInfo();
        }else {
            navigate('/login');
        }
    },[])

    const handlerChoiceClick = useCallback((path) => {
        navigate('/user/'+path);
    }, [navigate])

    return (
        <div className="user-center-container">
            <TopHeader />
            <UserCenterNavBox className="main-box">
                <UserCenterNavLogo logo={logo} />
                <UserCenterNavH2>个人中心</UserCenterNavH2>
                <UserTit>
                    <UserAvator>
                        <img src={userInfo.avator || require('../../imgs/logo.png')} alt="user avator" />
                    </UserAvator>
                    <UserNameBlock
                        onClick={handlerUserClick}
                    >
                        {
                            !userInfo.username ?
                            <div className="log-tip">
                                请先登录
                            </div>:
                            <div className="log-tip">
                                {userInfo.username}
                            </div>
                        }
                    </UserNameBlock>
                </UserTit>
            </UserCenterNavBox>
            <UserCenterBody className="main-box">
                <UserChoiceItemBox>
                    <ul>
                        {
                            userCenterItems.map((item, index)=>(
                                <UserChoiceItem 
                                    className={`${lastPath===item.page?'active':''}`} 
                                    key={item.id}
                                    onClick={()=>{handlerChoiceClick(item.page)}}
                                >
                                    {item.title}
                                </UserChoiceItem>
                            ))
                        }
                    </ul>
                </UserChoiceItemBox>
                <ItemBody>
                    <Outlet />
                </ItemBody>
            </UserCenterBody>
        </div>
    );
}