import styled from "styled-components";
const lightColor = '#c7dde4';
const mainColor = '#7ED9F6';

export const HelpContainer = styled.div`
    position: relative;
    width: 100%;
    margin-top: 20px;
`;

export const HelpWrapper = styled.div`
    position: relative;
`;

export const HelpTitBox = styled.div`
    position: relative;
    width: 100%;
    height: 26px;
    line-height: 26px;
    color: #fff;
    background-color: ${mainColor};
    cursor: pointer;
    h2 {
        float: left;
        margin-left: 30px;
        font-size: 14px;
        font-weight: 400;
    }
`;

export const HelpBodyBox = styled.div`
    width: 100%;
    color: #888;
    overflow: hidden;
    transition: all .5s;
    background-color: #d4ecf3;
`;

export const HelpItemBox = styled.li`
    width: 240px;
    height: 100%;
    margin-top: 20px;
`;

export const HelpItemHead = styled.div`
    font-size: 24px;
`;

export const HelpItemChildren = styled.div`
    margin-top: 10px;
    font-size: 14px;
    .children-item {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;