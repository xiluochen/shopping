import styled from "styled-components";

import Logo from '../Logo';

const lightColor = '#c7dde4';
const mainColor = '#7ED9F6';

export const NavContainer = styled.div`
    display:inline-block;
    width: 100%;
`;
export const NavItemsContainer = styled.div`
    width: 100%;
    height: 80px;
    margin-bottom: 5px;
`;
export const NavItemsWrapper = styled.div`
    position: relative;
    height: 100%;
`;
export const NavLogo = styled(Logo)`
    top: 10px;
    left: 60px;
    width: 60px;
    height: 60px;
`;
export const NavItemsMainContainer = styled.div`
    width: 1000px;
    height: 80px;
    margin-left: 200px;
    ul {
        width: 100%;
        height: 100%;
    }
`;
export const NavItemBox = styled.li`
    position: relative;
    width: 25%;
    height: 100%;
    line-height: 80px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 3px;
    color: ${lightColor};
    z-index: 99;
    &:hover {
        cursor: pointer;
        box-shadow: 0 1px rgba(126,217,246, .3);
        color: ${mainColor};
        transition-property: color;
        background-color: rgba(255, 255, 255, .6);
        .nav-item-children {
            height: 200px;
        }
    }
`;
export const NavItemChildrenBox = styled.div`
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 0;
    overflow: hidden;
    background-color: #fff;
    ul {
        width: 100%;
        height: 100%;
    }
`;
export const NavItemChild = styled.li`
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: ${lightColor};
    &:hover {
        color: ${mainColor};
    }
`;

export default {
    NavContainer,
    NavItemsContainer,
    NavItemsWrapper,
    NavLogo,
    NavItemsMainContainer,
    NavItemBox,
    NavItemChildrenBox,
    NavItemChild
}