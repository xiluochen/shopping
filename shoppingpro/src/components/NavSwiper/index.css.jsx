import styled from "styled-components";

const mainColor = '#7ED9F6';

export const SwiperContainer = styled.div`
        width: 100%;
    `;

export const SwiperWrapper = styled.div`
        position: relative;
        height: 100%;
        border: 0;
        box-shadow: 0 4px 5px rgba(0,0,0,.3);
    `;

export const LeftNavBox = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        width: 200px;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        ul {
            width: 100%;
            height: 100%;
            color: #c7dde4;
        }
    `;

export const LeftNavItem = styled.li`
        width: 100%;
        height: 100px;
        line-height: 100px;
        &.active {
            color: ${mainColor};
            background-color: #fff;
        }
    `;