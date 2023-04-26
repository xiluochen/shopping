import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Footer from "../../components/Footer";
import TopHeader from "../../components/TopHeader";
import { requireAppendShopCar, requireCommodityInfo } from "../../static/require";

import {
    SettleBody,
    SettleWrapper,
    SettleTit,
    ConfirmPurchaseBox,
    CommodityInfoBox,
    PurchaseInfoTit,
    PurchaseContentContainer,
    ConfirmBtn
} from './index.css.jsx';

export default function SettlementPage(){
    const params = useParams();
    const navigate = useNavigate();

    let {id, num} = params; 

    const token = window.sessionStorage.getItem('token') || '';
    if(token === ''){
        navigate('/login');
    }

    const [commodity, setCommodity] = useState({});

    const handlerConfirm = useCallback(async ()=>{
        let res = await requireAppendShopCar({id, num})
        if(res.status === 200) {
            navigate('/user/shopcar');
        }else {
            console.log(res.data.data);
        }
    }, [id, num, navigate]);

    const handlerCancel = useCallback(()=>{
        navigate(-1);
    }, [navigate]); 

    const askCommodityInfo = useCallback(async ()=> {
        let res = await requireCommodityInfo({id});
        if(res.status === 200){
            setCommodity(res.data.data)
        }else {
            console.log(res.data.data);
            setCommodity({})
        }
    }, [id]) 

    useEffect(()=>{
        askCommodityInfo();
    }, [id, askCommodityInfo])

    return (
        <div className="settle-container">
            <TopHeader isShowLogin={false} />
            <SettleBody className="main-box">
                <SettleWrapper>
                    <SettleTit>
                        <span>确认商品信息</span>
                    </SettleTit>
                    <ConfirmPurchaseBox className="clearfix">
                        <CommodityInfoBox>
                            <PurchaseInfoTit>
                                <div className="img">商品图片</div>
                                <div className="title">商品名称</div>
                                <div className="nums">数量</div>
                                <div className="price">单价</div>
                                <div className="whole-price">总价</div>
                                <div className="others">其他</div>
                            </PurchaseInfoTit>
                            <PurchaseContentContainer>
                                <div className="img"><img src={commodity.imgUrl} alt={commodity.title} /></div>
                                <div className="title">{commodity.title}</div>
                                <div className="nums">{num}</div>
                                <div className="price">{commodity.price}元</div>
                                <div className="whole-price">{commodity.price*num}元</div>
                                <div className="others"></div>
                            </PurchaseContentContainer>
                        </CommodityInfoBox>
                        <ConfirmBtn>
                            <button className="cancel" onClick={handlerCancel}>取消</button>
                            <button className="confirm" onClick={handlerConfirm}>确认添加</button>
                        </ConfirmBtn>
                    </ConfirmPurchaseBox>
                </SettleWrapper>
            </SettleBody>
            <Footer />
        </div>
    );
}