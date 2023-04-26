import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { requireSwiperData } from '../../static/require';
import NavSwiper from '../NavSwiper';
import { navItems } from '../../static/data';

import {
    NavContainer,
    NavItemsContainer,
    NavItemsWrapper,
    NavLogo,
    NavItemsMainContainer,
    NavItemBox,
    NavItemChildrenBox,
    NavItemChild
} from './index.css.jsx';

const logo = require('../../imgs/logo.png');

export default function TopNav(props){
    let {showSwiper} = props;

    const [swiperData, setSwiperData] = useState([]);

    const navigate = useNavigate();

    const askSwiperData = async()=>{
        let res = await requireSwiperData();
        if(res.status === 200){
            setSwiperData(res.data.data);
        }
    }

    useEffect(()=>{
        askSwiperData();
    }, []);

    return (
        <NavContainer>
            <NavItemsContainer>
                <NavItemsWrapper className="main-box">
                    <NavLogo logo={logo} />
                    <NavItemsMainContainer>
                        <ul>
                            {
                                navItems.map((item, index)=>(
                                    <NavItemBox 
                                        className='float-left transition-threes'
                                        key={item.id}
                                        onClick={()=>{navigate(item.target)}}
                                    >
                                        {item.title}
                                        {
                                            item.children &&
                                            <NavItemChildrenBox 
                                                className="nav-item-children transition-fives"
                                            >
                                                <ul>
                                                    {
                                                        item.children.map((child)=>(
                                                            <NavItemChild
                                                                key={child.id}
                                                            >
                                                                {child.title}
                                                            </NavItemChild>
                                                        ))
                                                    }
                                                </ul>
                                            </NavItemChildrenBox>
                                        }
                                    </NavItemBox>
                                ))
                            }
                        </ul>
                    </NavItemsMainContainer>
                </NavItemsWrapper>
            </NavItemsContainer>
            <NavSwiper showSwiper={showSwiper} swiperData={swiperData} />
        </NavContainer>
    );
}