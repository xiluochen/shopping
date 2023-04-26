import styled from "styled-components";
import { mainColor } from "../../colors";

export const PayForBody = styled.div`
    height: 100%;
`;

export const PayForWrapper = styled.div`
    margin-top: 50px;
    box-shadow:  0 0 5px rgba(0,0,0,.3);
`;

export const PayForTit = styled.div`
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(0,0,0,.3);
    span {
        float: left;
        margin-left: 20px;
        font-size: 14px;
        letter-spacing: 3px;
    }
`;

export const LocationChoiceBox = styled.div`
    position: relative;
    width: 100%;
    // height: 320px;
    overflow: hidden;
`;

export const LocationShowBox = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    // border-bottom: 1px solid rgba(0,0,0,.3);
    border-collapse: collapse;
    div {
        position: absolute;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        font-size: 18px;
        span {
            margin: 0 10px;
        }
    }
    .target-name {
        width: 200px;
        height: 20px;
        line-height: 20px;
        top: 20px;
        left: 50px;
    }
    .target-phone {
        width: 400px;
        height: 20px;
        line-height: 20px;
        top: 20px;
        left: 400px;
    }
    .target-loc {
        width: 1000px;
        height: 50px;
        line-height: 50px;
        top: 40px;
        left: 50px;
    }
    .show-switch {
        top: 30px;
        right: 50px;
        width: 40px;
        height: 40px;
        font-size: 24px;
        cursor: pointer;
    }
`;

export const OtherLocShowBox = styled.div`
    height: 0;
    overflow: hidden;
    ul {
        width: 100%;
    }
`;

export const OtherLocShowItem = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,0,.1);
    cursor: pointer;
    &:last-child {
        border-bottom: none;
    }
    div {
        position: absolute;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        span {
            margin: 0 10px;
        }
    }
    .loc-name,
    .loc-phone {
        top: 10px;
        height: 20px;
        line-height: 20px;
    }
    .loc-name {
        width: 200px;
        left: 50px;
    }
    .loc-phone {
        width: 400px;
        left: 200px;
    }
    .loc-loc {
        width: 1000px;
        top: 30px;
        left: 50px;
        height: 50px;
        line-height: 50px;
    }
`;

export const PayCarBox = styled.div`
    width: 100%;
`;

export const PayCarTit = styled.div`
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    border-collapse: collapse;
    border: 1px solid rgba(0,0,0,.3);
    border-left: none;
    border-right: none;
    div {
        float: left;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        border-right: 1px solid rgba(0,0,0,.3);
        &:last-child {
            border-right: none;
        }
    }
    .img,
    .name {
        width:300px;
    }
    .price,
    .whole-price {
        width:200px
    }
    .num,
    .other {
        width: 100px;
    }
`;

export const CommodityBodyBox = styled.div`
    ul {
        width: 100%;
        max-height: 480px;
        overflow: auto;
    }
`;

export const PayCommdityItem = styled.li`
    width: 100%;
    height: 160px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    div {
        float: left;
        height: 160px;
        line-height: 160px;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid rgba(0,0,0,.1);
        &:last-child {
            border-right: none;
        }
        &:nth-child(2){
            border-left: 1px solid rgba(0,0,0,.1);
        }
    }
    .img {
        width: 80px;
        height: 80px;
        margin: 40px 110px;
        overflow: hidden;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .name {
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .price,
    .whole-price {
        width: 200px;
    }
    .num,
    .other {
        width:100px;
    }
`;

export const OperationBox = styled.div`
    width: 100%;
    height: 60px;
    line-height: 60px;
`;

export const OperationLeftInfo = styled.div`
    float: left;
    height: 60px;
    line-height: 60px;
    margin-left: 20px;
    span {
        margin: 0 10px;
    }
`;

export const PayBtn = styled.div`
    float: right;
    margin-right: 50px;
    button {
        width: 100px;
        height: 40px;
        border: none;
        &:hover {
            background-color: ${mainColor};
            color: #fff;
        }
    }
`;