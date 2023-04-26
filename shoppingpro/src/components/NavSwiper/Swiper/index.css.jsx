import styled from "styled-components";

export const SwiperContainer = styled.div`
        height: 100%;
        overflow: hidden;
    `;

export const SwiperWrapper = styled.div`
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        ul {
            position: relative;
            top: -2%;
            width: 106%;
            height: 106%;
        }
    `;

export const SwiperItem = styled.li`
        position: absolute;
        width: 100%;
        height: 100%;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    `;