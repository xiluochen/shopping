import styled from "styled-components";
import { mainColor } from "../../../../colors";

export const ShopCarContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const ShopCarWrapper = styled.div`
    width: 96%;
    margin: 2%;
    box-shadow: 0 0 2px rgba(0,0,0,.3);
    overflow: hidden;
`;

export const ShopCarBody = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    ul {
        padding: 5px 0;
    }
`;

export const ShopCarItemTit = styled.div`
    width: 100%;
    height: 40px;
    font-size: 14px;
    border-bottom: 1px solid rgba(0,0,0,.3);
    div {
        float: left;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
    }
    .img {
        width: 300px;
        margin-left: 100px;
    }
    .tit {
        width: 200px;
    }
    .price,
    .whole-price {
        width: 150px;
    }
    .num {
        width: 100px;
    }
`; 

export const ShopCarItem = styled.li`
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    &:last-child{
        margin: 0;
    }
    div {
        float: left;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .clickable {
        width: 100px;
    }
    .img {
        width: 60px;
        height: 60px;
        margin: 20px 120px;
        overflow: hidden;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .title {
        width: 200px;
    }
    .price,
    .whole-price {
        width: 150px;
    }
    .num {
        width: 100px;
    } 
`;

export const ShopCarFooterBox = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 10px 0;
    overflow: hidden;
`;

export const ShopCarChooseCheckBox = styled.div`
    position: absolute;
    left: 40px;
    vertical-align: middle;
    font-size: 14px;
    input {
        margin-right: 5px;
    }
`;

export const ShopCarGoodsBuyBox = styled.div`
    position: absolute;
    top: 0;
    right: 40px;
    height: 40px;
    line-height: 40px;
    .nums {
        margin: 0 5px;
    }
    button {
        width: 60px;
        height: 40px;
        margin-left: 20px;
        border: none;
        letter-spacing: 2px;
        background-color: ${mainColor};
        color: #fff;
    }
`;