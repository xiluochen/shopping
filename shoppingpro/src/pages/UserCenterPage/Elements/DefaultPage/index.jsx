import styled from 'styled-components';

const DefaultTit = styled.h3`
    margin-top: 50px;
    letter-spacing: 10px;
    font-size: 24px;
    color: #87d7ef;
`;

export default function DefaultPage(){
    return (
        <DefaultTit>欢迎回来</DefaultTit>
    );
}