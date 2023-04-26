import { useCallback } from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import PageNaviagtor from "../../../../components/PageNavigator";
import { requireShopCar } from "../../../../static/require";

import {
    ShopCarContainer,
    ShopCarWrapper,
    ShopCarBody,
    ShopCarItemTit,
    ShopCarItem,
    ShopCarFooterBox,
    ShopCarChooseCheckBox,
    ShopCarGoodsBuyBox
} from './index.css.jsx';

export default function ShopCar(){

    const navigate = useNavigate();

    let [shopCarData, setShopCar] = useState([]);

    let [pageParams, setPages] = useState([]);

    let [payParams, setPay] = useState([0,0]);

    const token = useMemo(()=>(window.sessionStorage.getItem('token') || ''),[]);

    const askShopCar = async ()=>{
        let res = await requireShopCar();
        if(res.status === 200){
            const {data} = res.data;
            data.forEach(item=>{
                item.isClicked = false;
            })
            setShopCar(data);
            let mid = Math.ceil(data.length/5);
            setPages([1, mid, 1, 3]);
            setPay([0, 0]);
        }
    }

    const handlerClick = useCallback((event, id)=>{
        let objs = [...shopCarData];
        objs.forEach(item=>{
            if(item.id === id){
                item.isClicked = !item.isClicked;
            }
        })
        setShopCar(objs);
    }, [shopCarData]); 

    const handlerChangePage = useCallback((event)=>{
        event.stopPropagation();
        let page = Number(event.target.dataset.index);
        let poog = pageParams.concat();
        if(poog[2] === page)return;
        poog[2] = page;
        setPages(poog);
    }, [pageParams])

    const handlerWholeShopCar = (event)=>{
        event.stopPropagation();
        let objs = [...shopCarData];
        objs.forEach((item, index)=>{
            if(index>=(pageParams[2]-1)*5&&index<pageParams[2]*5){
                item.isClicked = event.target.checked;
            }
        })
        setShopCar(objs);
    }

    const handlerPayFor = ()=>{
        if(pageParams[0]>0)
            navigate('/payfor', {
                state: {
                    payData:shopCarData.filter((item)=>(item.isClicked))
                }
            })
    }

    useEffect(() => {
        if(token){
            askShopCar();
        }
    }, [token])

    useEffect(()=>{
        setPay(shopCarData.reduce((prev, item)=>{
            if(item.isClicked){
                prev[0]+=Number(item.num);
                prev[1]+=Number(item.target.price*item.num);
            }
            return prev;
        }, [0,0]));
    }, [shopCarData])
    

    return (
        <ShopCarContainer>
            <ShopCarWrapper>
                <ShopCarBody>
                    <ShopCarItemTit>
                        <div className="img">商品图片</div>
                        <div className="tit">商品名称</div>
                        <div className="price">单价(元)</div>
                        <div className="num">数量(件)</div>
                        <div className="whole-price">总价(元)</div>
                    </ShopCarItemTit>
                    <ul>
                        {
                            shopCarData.length>0?shopCarData.filter((item,index)=>(index>=(pageParams[2]-1)*5&&index<pageParams[2]*5)).map((item, index)=>{
                                    return (
                                        <ShopCarItem
                                            key={item.id}
                                        >
                                            <div className="clickable"><input type='checkbox' value='' checked={item.isClicked} onChange={(event)=>handlerClick(event, item.id)}/></div>
                                            <div className="img"><img src={item.target.imgUrl} alt={item.target.title} /></div>
                                            <div className="title">{item.target.title}</div>
                                            <div className="price">{item.target.price}</div>
                                            <div className="num">{item.num}</div>
                                            <div className="whole-price">{item.num * item.target.price}</div>
                                        </ShopCarItem>
                                    )
                                }
                            ):'无'
                        }
                    </ul>
                    <ShopCarFooterBox
                        style={{
                            display:shopCarData.length>0?'block':'none'
                        }}
                    >
                        <ShopCarChooseCheckBox>
                            <input type='checkbox' 
                                checked={shopCarData.reduce((prev, item, index)=>{
                                    if(index>=(pageParams[2]-1)*5&&index<pageParams[2]*5){
                                        return prev&&item.isClicked;
                                    }else {
                                        return prev;
                                    }
                                },true)} onChange={handlerWholeShopCar} />
                            全选
                        </ShopCarChooseCheckBox>
                        <div 
                            className="page-navigate" 
                            onClick={handlerChangePage}
                        >
                            <PageNaviagtor startLoc={pageParams[0]} endLoc={pageParams[1]} nowLoc={pageParams[2]} divid={pageParams[3]} />
                        </div>
                        <ShopCarGoodsBuyBox>
                            共
                            <span className="nums">
                                {payParams[0]}件商品
                            </span>
                            <span>
                                {payParams[1]}元
                            </span>
                            <button disabled={payParams[0]===0} onClick={handlerPayFor}>购买</button>
                        </ShopCarGoodsBuyBox>
                    </ShopCarFooterBox>
                </ShopCarBody>
            </ShopCarWrapper>
        </ShopCarContainer>
    );
}