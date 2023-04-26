import styled from "styled-components";

export const TitBox = styled.div`
        box-sizing: border-box;
        border-collapse: collapse;
        border: 1px solid rgba(0,0,0,.3);
        border-left: none;
        border-right: none;
    `;

export const TitItem = styled.div`
        float: left;
        box-sizing: border-box;
        border-right: 1px solid rgba(0,0,0,.3);
        &:last-child {
            border-right: none;
        }
    `;

export const BodyBox = styled.div`
        ul {
            width: 100%;
            overflow: hidden;
        }
    `;

export const BodyItemBox = styled.li`
        width: 100%;
        border-bottom: 1px solid rgba(0,0,0,.1);
    `;
export const BodyItem = styled.div`
        float: left;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid rgba(0,0,0,.1);
        overflow: hidden;
        &:last-child {
            border-right: none;
        }
        &:nth-child(2){
            border-left: 1px solid rgba(0,0,0,.1);
        }
    `