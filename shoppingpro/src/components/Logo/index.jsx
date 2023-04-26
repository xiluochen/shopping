import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    z-index: 99;
    cursor: pointer;
    h1 {
        position: absolute;
        left: -100000px;
    }
    img {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
`

export default function Logo(props){
    let {logo, className} = props;
    const navigate = useNavigate();

    const handlerHomepage = ()=>{
        navigate('/');
    }

    return (
        <Container
            className={"logo "+className}
            onClick={handlerHomepage}
        >
            <h1>蛋糕白白</h1>
            <img src={logo} alt={'logo'} />
        </Container>
    );
}