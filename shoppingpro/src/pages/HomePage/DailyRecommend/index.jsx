import { useNavigate } from 'react-router';
import { useMemo, useCallback, useState } from 'react';

import { 
    RecommendBodyBox, 
    RecommendBodyItem, 
    RecommendContainer, 
    RecommendTit, 
    RecommendTitMore, 
    RecommendWrapper,
    RecommendTitBox,
    ScollBox
} from './index.css.jsx';

let startLoc = 0;
let isClick = false;

let recommendData = [];

export default function DailyRecommend(prop){
    const [isScrollShow, setScrollShow] = useState(false);

    const [offsetX, setOffsetX] = useState(0);

    const navigate = useNavigate();

    recommendData = useMemo(()=>(prop.recommendData), [prop]) ;

    const handlerScrollShow = useCallback((flag)=>{
        setScrollShow(flag);
    }, []);

    const handlerMouseTrog = useCallback((e)=>{
        if(isClick){
            let offNow = e.clientX - startLoc;
            let nowOffset = (offsetX + offNow)
            if(nowOffset<0)nowOffset=0;
            if(nowOffset>800)nowOffset=800;
            setOffsetX(nowOffset);
            startLoc = e.clientX;
        }
    }, [offsetX]); 

    const handlerMouseClick = useCallback((flag, e)=>{
        isClick = flag;
        if(flag){
            startLoc = e.clientX;
        }else {
            startLoc = 0;
        }
    }, []) 

    return (
        <RecommendContainer>
            <RecommendWrapper className="main-box">
                <RecommendTitBox>
                    <RecommendTit>
                        <span 
                            className='iconfont icon-wodetuijian'
                            style={{
                                'color':'#fff',
                                fontSize:'24px',
                            }}
                        >
                        </span>
                        每日推荐
                    </RecommendTit>
                    <RecommendTitMore className="transition-threes">...</RecommendTitMore>
                </RecommendTitBox>
                <RecommendBodyBox
                    onMouseEnter={()=>{handlerScrollShow(true)}}
                    onMouseLeave={()=>{handlerScrollShow(false)}}
                >
                    <ul
                         style={{
                            left: `-${offsetX/800*240*(recommendData.length-5)}px`
                        }}
                    >
                        {
                            recommendData.map((item, index)=>(
                                <RecommendBodyItem
                                    className="recommend-item transition-threes"
                                    key={item.id}
                                    style={{
                                        left: index*240+'px'
                                    }}
                                    onClick={()=>{navigate(`/commodity/${item.id}`)}}
                                >
                                    <img src={item.imgUrl} alt={item.title} />
                                    <div className="item-title">
                                        {item.title}
                                    </div>
                                </RecommendBodyItem>
                            ))
                        }
                    </ul>
                </RecommendBodyBox>
                <ScollBox 
                    className="transition-fives"
                    style={{
                        display:isScrollShow?'block':'none'
                    }}
                    onMouseEnter={()=>{handlerScrollShow(true)}}
                    onMouseLeave={()=>{handlerScrollShow(false)}}
                >
                    <div 
                        className="scroll-bar" 
                        style={{left:`${offsetX}px`}}
                        onMouseDown={(e)=>{handlerMouseClick(true,e)}}
                        onMouseUp={()=>{handlerMouseClick(false)}}
                        onMouseLeave={()=>{handlerMouseClick(false)}}
                        onMouseMove={(e)=>{handlerMouseTrog(e)}}
                    ></div>
                </ScollBox>
            </RecommendWrapper>
        </RecommendContainer>
    );
}