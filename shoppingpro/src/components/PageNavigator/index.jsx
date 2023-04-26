import {
    Container,
    Item
} from './index.css.jsx'

export default function PageNaviagtor(props={divid:3}){
    let {startLoc, endLoc, nowLoc, divid} = props;

    return (
        <Container>
            <ul>
                {
                    (()=>{
                        let page = [], div = Math.floor(divid/2);
                        if(nowLoc-div>startLoc){
                            page.push((
                                <Item className="page-item" data-index={startLoc} key={startLoc}>{startLoc}</Item>
                            ))
                        }
                        if(nowLoc-div>startLoc+1){
                            page.push((
                                <Item className="page-item" key={'other_1'}>...</Item>
                            ))
                        }
                        for(let i=-div;i<=div;i++){
                            let noi = nowLoc+i;
                            if(noi<startLoc||noi>endLoc)continue;
                            page.push((
                                <Item className={`page-item ${i===0?'active':''}`} key={noi} data-index={noi}>{noi}</Item>
                            ))
                        }
                        if(nowLoc+div<endLoc-1){
                            page.push((
                                <Item className="page-item" key={'other_2'}>...</Item>
                            ))
                        }
                        if(div+nowLoc<endLoc){
                            page.push((
                                <Item className="page-item" key={endLoc} data-index={endLoc}>{endLoc}</Item>
                            ))
                        }
                        return page;
                    })()
                }
            </ul>
        </Container>
    );
}