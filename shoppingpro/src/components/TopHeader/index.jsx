import { items } from '../../static/data';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { requireUserInfo } from '../../static/require';
import {
    HeaderContainer,
    HeaderWrapper,
    LocationBox,
    HeaderItemBox,
    LogBtn,
    ItemContainer,
    ItemBox,
    SplitLine,
    Item,
    ItemSubList,
    ItemSubListItem
} from './index.css.jsx'

let token = '';

export default function TopHeader(props){
    let location = '天津'; // 定位获取的
    let { isShowLogin } = props;

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});

    const handlerHeadClick = (e, clickItem)=>{
        e.stopPropagation();
        navigate(clickItem.target,
            {
                state:{
                    token:'aaa'
                }
            }
        );
    }

    const askUserInfo = async ()=>{
        let res = await requireUserInfo();
        if(res.status === 200){
            setUserInfo(res.data.data);
        }
    }

    useEffect(()=>{
        token = window.sessionStorage.getItem('token') || '';
        if(token){
            askUserInfo();
        }
    }, [])

    

    return (
        <HeaderContainer>
            <HeaderWrapper className="main-box clearfix">
                <LocationBox className="left-location float-left">
                    <span 
                        className='iconfont icon-31dingwei'
                        style={{
                            color:'#7ED9F6'
                        }}
                    ></span>
                    {location}
                </LocationBox>
                <HeaderItemBox className="float-right">
                    <LogBtn 
                        className="float-left transition-threes" 
                        style={{
                            display:isShowLogin ? 'block' : 'none',
                        }}  
                        onClick={()=>{navigate(!token ?'/login':'/user')}}
                    >
                        {
                            !token ?
                            <>点我<span className='transition-threes'>登录</span></>:
                            <>你好,{userInfo.username}</>
                        }
                        
                    </LogBtn>
                    
                    <ItemContainer className="float-left">
                        <ul>
                            {
                                items.map((item, index)=>(
                                    <ItemBox 
                                        className={`float-left transition-threes ${item.hasChild?"has-children":"no-children"}`} 
                                        key={item.id}
                                        onClick={(e)=>{item.hasChild && handlerHeadClick(e,item)}}
                                    >
                                        <SplitLine className="float-left"></SplitLine>
                                        <Item
                                            className={`item float-left`} 
                                        >
                                            {item.title}
                                            {
                                                item.hasChild && 
                                                <ItemSubList className='sub-list'>
                                                    <ul>
                                                        {
                                                            item.children.map((child, ind)=>(
                                                                <ItemSubListItem
                                                                    key={item.id+'-'+ind}
                                                                >
                                                                    <ul>
                                                                        {
                                                                            child.map(nowChil=>(
                                                                                <li 
                                                                                    className='float-left' 
                                                                                    key={nowChil.id}
                                                                                    onClick={(e)=>{handlerHeadClick(e, nowChil)}}
                                                                                >
                                                                                    {nowChil.title}
                                                                                </li>
                                                                            ))
                                                                        }
                                                                        
                                                                    </ul>
                                                                </ItemSubListItem>
                                                            ))
                                                        }
                                                    </ul>
                                                </ItemSubList>
                                            }
                                        </Item>
                                    </ItemBox>
                                ))
                            }
                        </ul>
                    </ItemContainer>
                </HeaderItemBox>
            </HeaderWrapper>
        </HeaderContainer>
    );
}