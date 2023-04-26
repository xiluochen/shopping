import styled from "styled-components";

const mainColor = '#7ED9F6';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    ul {
        display: inline-block;
        height: 100%;
    }
`;
export const Item = styled.li`
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,.1);
    &.active {
        background-color: ${mainColor};
        color: #fff;
    }
`;