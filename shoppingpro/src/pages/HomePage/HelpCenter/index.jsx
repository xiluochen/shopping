import './index.css';

import { helps } from '../../../static/data';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

import { 
        HelpContainer, 
        HelpWrapper,
        HelpTitBox,
        HelpBodyBox,
        HelpItemBox,
        HelpItemHead,
        HelpItemChildren
    } 
from './index.css.jsx';

export default function HelpCenter(){

    const [isShowBody, setIsShowBody] = useState(false);

    const navigate = useNavigate();

    const handlerClick = useCallback((url)=>{
        navigate(url);
    }, [navigate]) 

    const handlerShowHelpBody = useCallback(()=>{
        setIsShowBody(!isShowBody);
    }, [isShowBody]);

    return (
        <HelpContainer>
            <HelpWrapper
                className="main-box"
                style={{
                    boxShadow: isShowBody?'0 0 5px rgba(0, 0, 0, .3)':''
                }}  
            >
                <HelpTitBox
                    onClick={handlerShowHelpBody}
                >
                    <h2>
                        帮助中心
                        <span 
                            className={`iconfont ${isShowBody?'icon-xiangshangjiantou':'icon-xiangxiajiantou'}`}
                            style={{
                                fontSize:'12px',
                                marginLeft:'10px'
                            }}
                        >
                        </span>
                        </h2>
                </HelpTitBox>
                <HelpBodyBox 
                    className="transition-fives"
                    style={{
                        height: isShowBody?'200px':'0px'
                    }}
                >
                    <ul>
                        {
                            helps.map(item=>(
                                <HelpItemBox
                                    className='float-left' 
                                    key={item.id}
                                >
                                    <HelpItemHead>
                                        {item.title}
                                    </HelpItemHead>
                                    <HelpItemChildren>
                                        {
                                            item.children.map(child=>(
                                                <div 
                                                    className="children-item" 
                                                    key={child.id}
                                                    onClick={()=>{handlerClick(child.target)}}
                                                >
                                                    {child.title}
                                                </div>
                                            ))
                                        }
                                    </HelpItemChildren>
                                </HelpItemBox>
                            ))
                        }
                    </ul>
                </HelpBodyBox>
            </HelpWrapper>
        </HelpContainer>
    );
}