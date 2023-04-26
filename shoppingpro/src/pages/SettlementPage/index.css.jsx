import styled from "styled-components";
import { mainColor } from '../../colors';

export const SettleBody = styled.div`
    height: 500px;
    background-color: #fff;
`;

export const SettleWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px 0;
    overflow: hidden;
    box-sizing: border-box;
`;

export const SettleTit = styled.div`
    height: 30px;
    margin: 0 20px;
    line-height: 30px;
    // background-color: green;
    box-shadow: 0 0px 2px rgba(0,0,0,.3);
    span {
        float: left;
        margin-left: 20px;
        font-size: 14px;
    }
`;

export const ConfirmPurchaseBox = styled.div`
    height: 470px;
    margin: 0 20px;
`;

export const CommodityInfoBox = styled.div`
    position: relative;
    box-shadow: 0 0px 2px rgba(0,0,0,.3);
`;

export const PurchaseInfoTit = styled.div`
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
    box-sizing: border-box;
    border-bottom: none;
    border-left: none;
    div {
        float: left;
        text-align: center;
        font-size: 14px;
        box-sizing: border-box;
        border-left: 1px solid rgba(0,0,0,.3);
        &:first-child {
            border-left: none;
        }
    }
    .img,
    .title {
        width: 300px;
    }
    .price,
    .whole-price {
        width: 200px;
    }
    .nums {
        width: 100px;
    }
    .others {
        width: 58px;
    }
`;

export const PurchaseContentContainer = styled.div`
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0,0,0,.3);
    div {
        float: left;
        height: 150px;
        line-height: 150px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-left: 1px solid rgba(0,0,0,.3);
        border-collapse: collapse;
    }
    .img {
        width: 100px;
        height: 100px;
        margin: 25px 100px;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .title {
        width: 300px;
    }
    .nums {
        width: 100px;
    }
    .price,
    .whole-price {
        width: 200px;
    }
    .others {
        width: 58px;
    }
`;

export const ConfirmBtn = styled.div`
    width: 100%;
    height: 80px;
    overflow: hidden;
    button {
        float: right;
        width: 100px;
        height: 40px;
        margin: 20px 0 20px 20px;
        border: none;
        letter-spacing: 2px;
        font-size: 16px;
        color: #fff;
        background-color: ${mainColor};
    }
    .cancel {
        margin-right: 20px;
    }
`;