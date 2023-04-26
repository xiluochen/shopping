import styled from "styled-components";

export const HeaderContainer = styled.div`
        width: 100%;
        height: 30px;
        background-color: #E3E4E5;
    `;

export const HeaderWrapper = styled.div`
        height: 100%;
        background-color: transparent;
    `;

export const LocationBox = styled.div`
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
        font-size: 12px;
        color: #999;
        span {
            margin-right: 5px;
        }
    `;

export const HeaderItemBox = styled.div`
        height: 30px;
        line-height: 30px;
        color: #A6A6A6;
    `;

export const LogBtn = styled.div`
        font-size: 12px;
        margin-right: 5px;
        cursor: pointer;
        span {
            margin-left: 5px;
        }
        &:hover {
            color: #888;
            span {
                color: ${'#7ED9F6'};
            }
        }
    `;

export const ItemContainer = styled.div`
        display: inline-block;
        height: 30px;
        line-height: 30px;
    `;

export const ItemBox = styled.li`
        position: relative;
        height: 100%;
        &.no-children:hover {
            .item {
                color: ${'#7ED9F6'};
            }
        }
        &.has-children:hover {
            .item {
                border-color: #aaa;
                background-color: #fff;
                .sub-list {
                    display: block;
                    border-color: #aaa;
                }
            }
            
        }
    `;

export const SplitLine = styled.div`
        width: 1px;
        height: 10px;
        margin: 10px;
        background-color: #999;
        outline: none;
    `;

export const Item = styled.div`
        position: relative;
        height: 30px;
        padding: 0 10px;
        font-size: 12px;
        color: #999;
        cursor: pointer;
        border: 1px solid transparent;
        border-bottom: none;
    `;

export const ItemSubList = styled.div`
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 240px;
        border: 1px solid transparent;
        border-top: none;
        background-color: #fff;
        z-index: 100;
        ul {
            width: 100%;
            height: 100%;
        }
    `;

export const ItemSubListItem = styled.div`
        padding-top: 5px;
        border-bottom: 1px solid #999;
        ul {
            display: inline-block;
            width: 100%;
            li {
                width: 33%;
                &:hover {
                    color: ${'#7ED9F6'};
                }
            }
        }
        &:nth-child(even) {
            border-top: 1px solid #999;
        }
    `;