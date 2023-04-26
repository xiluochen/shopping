import styled from "styled-components";
import Logo from '../Logo';

export const Container = styled.div`
        width: 100%;
        height: 240px;
        margin-top: 20px;
    `
export const Wrapper = styled.div`
        position: relative;
        height: 100%;
        overflow: hidden;
        border-top: 1px solid #999;
        background-color: #fff;
    `
export const FooterLogo = styled(Logo)`
        top: 40px;
        left: 60px;
        width: 80px;
        height: 80px;
    `
export const InfoContainer = styled.div`
        position: absolute;
        top: 40px;
        left: 500px;
        height: calc(100% - 40px);
    `

export const Info = styled.div`
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #999;
        font-size: 14px;
        cursor: pointer;
    `