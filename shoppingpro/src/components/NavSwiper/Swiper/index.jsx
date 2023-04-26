import { useNavigate } from 'react-router';
import {
    SwiperContainer,
    SwiperItem,
    SwiperWrapper
} from './index.css.jsx'

export default function Swiper(props){
    let {datas, width, loc} = props;
    let navigate = useNavigate();

    const handlerClick = (item)=>{
        navigate(`/commodity/${item.id}`)
    }

    return(
        <SwiperContainer
            style={{
                width: width+'px'
            }}
        >
            <SwiperWrapper className="clearfix">
                <ul>
                    {
                        datas.map((item, index)=>(
                            <SwiperItem
                                key={item.id} 
                                onClick={()=>{handlerClick(item)}}
                                style={{
                                    left:((index === loc) ? 0 : width * (index - loc))+'px'
                                }}      
                            >
                                <img src={item.imgUrl} alt={item.title} />
                            </SwiperItem>
                        ))
                    }
                </ul>
            </SwiperWrapper>
        </SwiperContainer>
    );
}