import { useState, useEffect } from "react";

import Swiper from './Swiper';

import {
    SwiperContainer,
    SwiperWrapper,
    LeftNavBox,
    LeftNavItem
} from './index.css.jsx'

let count = 0;
let timer;

export default function NavSwiper(props){
    let [selected, setSelected] = useState(count);
    
    let {showSwiper, swiperData} = props;

    useEffect(()=>{
        count = 0;
        setSelected(count);
        timer = setInterval(()=>{
            count = (count+1)%swiperData.length;
            setSelected(count);
        },3000);
        return ()=>{
            clearInterval(timer);
        }
    }, [swiperData.length])

    const handlerClick = (index)=>{
        count = index;
        setSelected(count);
    }

    const handlerMouseEnter = ()=>{
        clearInterval(timer);
    }

    const handlerMouseLeave = ()=>{
        timer = setInterval(()=>{
            count = (count+1)%swiperData.length;
            setSelected(count);
        },3000);
    }

    return (
        <SwiperContainer
            style={{
                display:showSwiper ? 'block' : 'none',
                height:(swiperData.length*100)+'px'
            }}
        >
            <SwiperWrapper
                className="main-box" 
                onMouseEnter={()=>{handlerMouseEnter()}}
                onMouseLeave={()=>{handlerMouseLeave()}}
            >
                <LeftNavBox>
                    <ul>
                        {
                            swiperData.map((item,index)=>(
                                <LeftNavItem 
                                    key={item.id} 
                                    onMouseEnter={()=>{handlerClick(index)}}
                                    className={`${selected===index?'active':''} transition-threes`}
                                >
                                    {item.title}
                                </LeftNavItem>
                            ))
                        }
                    </ul>
                </LeftNavBox>
                <Swiper datas={swiperData} width={1200} height={600} loc={selected} />
            </SwiperWrapper>
        </SwiperContainer>
    );
}