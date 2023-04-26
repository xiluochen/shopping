import styled from "styled-components";
import Logo from "../../components/Logo";
import { mainColor } from "../../colors";

export const UserCenterNavBox = styled.div`
    position: relative;
    height: 120px;
    background-color: ${mainColor};
`; 

export const UserCenterNavLogo = styled(Logo)`
    position: absolute;
    top: 30px;
    left: 30px;
    width: 60px;
    height: 60px;
`;

export const UserCenterNavH2 = styled.h2`
    position: absolute;
    top: 35px;
    left: 80px;
    width: 200px;
    height: 50px;
    line-height: 50px;
    letter-spacing: 10px;
    font-size: 24px;
    color: #fff;
`;

export const UserTit = styled.div`
    position: absolute;
    right: 100px;
    bottom: -15px;
    width: 160px;
    height: 40px;
    padding: 5px;
    background-color: #b8dfeb;
    border-radius: 20px 20px 0 0 /30px 30px 0 0;
    cursor: pointer;
`;

export const UserAvator = styled.div`
    float: left;
    width: 40px;
    height: 40px;
    margin-left: 10px;
    overflow: hidden;
    img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

export const UserNameBlock = styled.div`
    float: left;
    width: 100px;
    height: 30px;
    margin-top: 5px;
    margin-left: 10px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
`;

export const UserCenterBody = styled.div`
    height: 600px;
    margin: 15px auto 0;
    border-top: 1px solid rgba(0,0,0,.3);
    border-bottom: none;
`;

export const UserChoiceItemBox = styled.div`
    float: left;
    width: 149px;
    height: 600px;
    border-right: 1px solid rgba(0,0,0,.3);
`;

export const UserChoiceItem = styled.div`
    width: 100%;
    height: 50px;
    line-height: 50px;
    letter-spacing: 2px;
    background-color: transparent;
    color: #000;
    cursor: pointer;
    &.active {
        background-color: @main-color;
        color: #fff;
    }
`;

export const ItemBody = styled.div`
    float: left;
    width: 1050px;
    height: 600px;
`;