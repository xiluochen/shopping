import styled from "styled-components";

import { mainColor, borderColor } from "../../colors";

export const CommodityContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const CommodityBody = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
`;

export const CommodityWrapper = styled.div`
    height: 600px;
    background-color: #fff;
    box-shadow: 0 5px 5px ${borderColor};
`;

export const CommodityInfoBox = styled.div`
    width: 100%;
    height: 600px;
`;

export const CommodityImgBox = styled.div`
    width: 800px;
    height: 600px;
    float: left;
    overflow: hidden;
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export const CommodityInfo = styled.div`
    width: 400px;
    height: 100%;
    padding: 30px 20px;
    box-sizing: border-box;
    float: left;
    div {
        padding: 10px 5px;
    }
    .title {
        width: 100%;
        padding: 30px 5px 100px;
        font-size: 26px;
    }
    .sub-tit {
        width: 100%;
        padding: 10px 5px;
        font-size: 18px;
        text-align: left;
    }
    .price {
        width: 100%;
        margin-top: 100px;
        text-align: left;
        font-size: 14px;
        color: #666;
        span {
            margin-left: 10px;
        }
    }
`;

export const CommodityInfoNumber = styled.div`
    font-size: 16px;
    text-align: left;
    input {
        width: 24px;
        height: 24px;
        margin-left: 10px;
        outline: none;
        border: 1px solid #000;
        border-right: none;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
    .controls-btns {
        display: inline-block;
        width: 12px;
        height: 24px;
        padding: 0;
        border: 1px solid #000;
        // border-left: none;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #f1f1f1;
        vertical-align: middle;
        div {
            width: 12px;
            height: 12px;
            box-sizing: border-box;
            padding: 0;
            text-align: center;
            overflow: hidden;
            // transform: scale(.8);
            background-color: #F1F1F1;
            span {
                display: block;
                width: 100%;
                height: 100%;
                font-size: 12px;
                transform: scale(.8);
            }
            &.down {
                margin-top: 2px;
            }
        }
        .up {
            border-bottom: 1px solid #000;
        }
        &:hover {
            cursor: pointer;
        }
    }
`;

export const CommodityInfoConfirmBtn = styled.div`
    width: 100%;
    button {
        width: 150px;
        height: 60px;
        border: none;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 3px;
        background-color: ${mainColor};
        color: #fff;
        &:hover {
            box-shadow: 0 0 2px rgba(0,0,0,.3);
        }
    }
`;

export const CommodityExtendBox = styled.div`
    float: left;
    width: 100%;
    margin: 20px auto;
    border: 1px solid rgba(0,0,0,.3);
`;

export const CommodityExtendRecommendBox = styled.div`
    float: left;
    width: 220px;
    box-sizing: border-box;
    border-right: 1px solid rgba(0,0,0,.3);
`;

export const CommodityExtendRecommendItem = styled.div`
    width: 100%;
    height: 240px;
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid ${borderColor};
    overflow: hidden;
    cursor: pointer;
    img {
        display: block;
        width: 200px;
        height: 200px;
        margin: 0 auto;
    }
    .recommend-title {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        overflow: hidden;
    }
`;

export const CommodityIntroductionBox = styled.div`
    float: left;
    width: 980px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
`;