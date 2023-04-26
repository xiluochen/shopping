import { infos } from '../../static/data';
import {
    Container,
    Wrapper,
    FooterLogo,
    InfoContainer,
    Info
} from './index.css.jsx'

const logo = require('../../imgs/logo.png');

export default function Footer(){
    return (
        <Container>
            <Wrapper className='main-box'>
            <FooterLogo logo={logo} />
            <InfoContainer>
                {
                    infos.map(item=>(
                        <Info 
                            className="info" 
                            key={item.id}
                            // onClick={()=>{item.target&&navigate(item.target)}}
                        >
                            {item.title}
                        </Info>
                    ))
                }
            </InfoContainer>
            </Wrapper>
        </Container>
    );
}