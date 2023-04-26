import styled from "styled-components";

import { mainColor } from "../../../colors";

export const RecommendContainer = styled.div`
    width: 100%;
    height: 340px;
    margin-top: 10px;
`;

export const RecommendWrapper = styled.div`
    position: relative;
    height: 100%;
    box-shadow: 0 2px 2px rgba(0,0,0,.3);
`;

export const RecommendTitBox = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
    color: #fff;
    background-color: ${mainColor};
`;

export const RecommendTit = styled.div`
    position: absolute;
    left: 20px;
    top: 0;
    height: 60px;
    line-height: 60px;
    letter-spacing: 5px;
`;

export const RecommendTitMore = styled.div`
    position: absolute;
    right: 20px;
    top: 0;
    height: 60px;
    line-height: 60px;
    color: #999;
    letter-spacing: 3px;
    cursor: pointer;
    &:hover {
        color: #000;
    }
`;

export const RecommendBodyBox = styled.div`
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
    background-color: #eee;
    ul {
        position: absolute;
        height: 100%;
        white-space: nowrap;
    }
`;

export const RecommendBodyItem = styled.li`
    position: absolute;
    top: 0;
    width: 200px;
    height: 240px;
    margin: 20px 20px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    user-select: none;
    img {
        display: block;
        width: 180px;
        height: 180px;
        margin: 10px auto 0;
    }
    .item-title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: ${mainColor};
    }
    &:hover {
        transform: scaleX(1.1) scaleY(1.1);
    }
`;

export const ScollBox = styled.div`
    position: absolute;
    left: 0;
    bottom: 5px;
    width: 100%;
    height: 10px;
    background-color: #ddd;
    z-index: 99;
    .scroll-bar {
        position: absolute;
        width: 400px;
        height: 100%;
        border-radius: 10px;
        background-color: #fff;
    }
`;