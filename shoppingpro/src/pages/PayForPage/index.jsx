import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import TopHeader from "../../components/TopHeader";
import { requireLocs, requirePay } from "../../static/require";

import {
    PayForBody,
    PayForWrapper,
    PayForTit,
    LocationChoiceBox,
    LocationShowBox,
    OtherLocShowBox,
    OtherLocShowItem,
    PayCarBox,
    PayCarTit,
    CommodityBodyBox,
    PayCommdityItem,
    PayBtn,
    OperationBox,
    OperationLeftInfo
} from './index.css.jsx';

export default function PayForPage(){

    const navigate = useNavigate();
    const token = window.sessionStorage.getItem('token') || '';
    if(token === ''){
        navigate('/login');
    }

    let [payParams, setPayParams] = useState([0,0]);
    let {payData} = useLocation().state;

    let [locs, setLocations] = useState([]);

    let [showLoc, setShowLoc] = useState({});

    let [isShow, setIsShow] = useState(false);

    const handlerPay = async()=>{
        let res = await requirePay({
            ids:payData.map(item=>item.id),
            loc:showLoc,
        })
        if(res.status === 200){
            navigate('/payresult/success');
        }
    }

    const askLocs = async () => {
        let res = await requireLocs();
        if(res.status === 200){
            const {data} = res.data;
            setLocations(data);
            setShowLoc(data.filter(item=>Boolean(item.default))[0]||{});
        }
    }

    useEffect(()=>{
        setPayParams(
            payData.reduce(
                (prev,item)=>[prev[0]+Number(item.num),prev[1]+Number(item.num)*Number(item.target.price)]
                ,[0,0]
            )
        )
        askLocs();
    }, [payData])


    return (
        <div className="pay-for-container">
            <TopHeader showLogin={false}/>
            <PayForBody className="main-box">
                <PayForWrapper>
                    <PayForTit><span>支付详情</span></PayForTit>
                    <LocationChoiceBox className="clearfix">
                        <LocationShowBox
                            style={{
                                borderBottom:`${isShow?'1px solid rgba(0,0,0,.3)':''}`,
                            }}
                        >
                            <div className="target-name">收件人姓名:<span>{showLoc.target}</span></div>
                            <div className="target-phone">联系电话:<span>{showLoc.phone}</span></div>
                            <div className="target-loc">收货地址:<span>{showLoc.loc}</span></div>
                            <div 
                                className="show-switch"
                                onClick={()=>{setIsShow(!isShow)}}
                            >
                                <span 
                                    className={`iconfont ${!isShow?'icon-xiangxiajiantou':'icon-xiangshangjiantou'}`}
                                >
                                </span>
                            </div>
                        </LocationShowBox>
                        <OtherLocShowBox
                            className="transition-fives"
                            style={{
                                height:!isShow?'0':'160px'
                            }}
                        >
                            <ul>
                                {
                                    locs.map((item)=>{
                                        if(item.id===showLoc.id)return;
                                        return (
                                            <OtherLocShowItem 
                                                key={item.id}
                                                onClick={()=>{setShowLoc(item)}}
                                            >
                                                <div className="loc-name">收件人:<span>{item.target}</span></div>
                                                <div className="loc-phone">联系电话:<span>{item.phone}</span></div>
                                                <div className="loc-loc">收货地址:<span>{item.loc}</span></div>
                                            </OtherLocShowItem>
                                        );
                                    })
                                }
                            </ul>
                        </OtherLocShowBox>
                    </LocationChoiceBox>
                    <PayCarBox>
                        <PayCarTit>
                            <div className="img">商品图片</div>
                            <div className="name">商品名称</div>
                            <div className="price">单价(元)</div>
                            <div className="num">数量(个)</div>
                            <div className="whole-price">总价(元)</div>
                            <div className="other">备注</div>
                        </PayCarTit>
                        <CommodityBodyBox>
                            <ul>
                                {
                                    payData.map((item)=>(
                                        <PayCommdityItem key={item.id}>
                                            <div className="img"><img src={item.target.imgUrl} alt={item.target.title} /></div>
                                            <div className="name">{item.target.title}</div>
                                            <div className="price">{item.target.price}</div>
                                            <div className="num">{item.num}</div>
                                            <div className="whole-price">{item.num * item.target.price}</div>
                                            <div className="other">{item.other||''}</div>
                                        </PayCommdityItem>
                                    ))
                                }
                            </ul>
                        </CommodityBodyBox>
                        <OperationBox>
                            <OperationLeftInfo>
                                共计<span className="com-nums">{payParams[0]}</span>件商品 
                                <span className="money">{payParams[1]}</span>元
                            </OperationLeftInfo>
                            <PayBtn><button className="transition-threes" onClick={handlerPay}>支付</button></PayBtn>
                        </OperationBox>
                    </PayCarBox>
                </PayForWrapper>
            </PayForBody>
        </div>
    );
}