import styled from "styled-components";
import { mainColor } from "../../colors";

export const LoginBody = styled.div`
    width: 100%;
`;

export const LoginWrapper = styled.div`
    height: 100%;
    overflow: hidden;
    background-color: #c7dde4;
`;

export const LoginFormBox = styled.div`
    width: 800px;
    height: 500px;
    margin: 100px auto 0;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0,0,0,.3);
    background-image: linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.7));
`;

export const LoginFormTit = styled.div`
    position: relative;
    text-align: center;
    width: 100%;
    height: 100px;
    margin-top: 50px;
    line-height: 100px;
`;

export const LoginFormTitH2 = styled.h2`
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 30px;
    z-index: 99;
`;

export const LoginFormContain = styled.div`
    display: none;
    position: absolute;
    top: 10px;
    left: 350px;
    width: 60px;
    height: 60px;
    z-index: 1;
    overflow: hidden;
    transition: left .5s, transform .6s ease-out;
`;

export const LoginFormContentItem = styled.label`
    display: block;
    height: 60px;
    line-height: 60px;
    margin-bottom: 50px;
    font-size: 24px;
    letter-spacing: 3px;
    input {
        display: inline-block;
        width: 300px;
        height: 30px;
        padding: 0 20px;
        margin-left: 10px;
        border-radius: 10px;
        border: 1px solid ${mainColor};
        outline: none;
    }
`;

export const LoginFormContentBtnsBox = styled.div`
    display: block;
    position: relative;
    width: 100%;
    height: 60px;
`;

export const LoginBtn = styled.button`
    display: block;
    width: 160px;
    height: 60px;
    margin: 0 auto;
    background-color: #c7dde4;
    border: none;
    font-size: 24px;
    &:hover {
        box-shadow: 0 0 3px rgba(0,0,0,.3);
    }
`;

export const RegisterBtn = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    border: none;
    outline: none;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    background-color: transparent;
    transform: translateX(140px) translateY(-50%);
    &:hover {
        border-color:  rgba(0,0,0,.3);
    }
`;
