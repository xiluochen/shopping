import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TopHeader from "../../components/TopHeader";
import Footer from '../../components/Footer';

import { mainColor } from "../../colors";
import styled from "styled-components";

let timer;
let initTime = 5;

const PreserveWrapper = styled.div`
    padding-top: 200px;
    height: 500px;
    box-sizing: border-box;
    h2 {
        font-weight: 400;
        span {
            display: inline-block;
            margin: 0 5px;
            color: ${mainColor};
        }
    }
`;

export default function PreservePage(){
    const [time, setTime] = useState(initTime);

    let navigate = useNavigate();

    useEffect(()=>{
        initTime = 5;
        setTime(initTime);
        timer = setInterval(()=>{
           initTime--;
           if(initTime>=0){
            setTime(initTime);
           }else {
            navigate('/');
           }
        },1000);
        return ()=>{
            clearInterval(timer);
        }
    }, [navigate]);
    
    return (
        <div className="preserve-container">
            <TopHeader  isShowLogin={true} />
            <div className="preserve-body">
                <PreserveWrapper className="main-box">
                    <h2>该功能尚未完成，现将在<span>{time}</span>s后返回首页</h2>
                </PreserveWrapper>
            </div>
            <Footer />
        </div>
    );
}