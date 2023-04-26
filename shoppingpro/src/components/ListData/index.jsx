import { nanoid } from "nanoid";
import { useMemo } from "react";

import {
    TitBox,
    TitItem,
    BodyBox,
    BodyItem,
    BodyItemBox
} from './index.css.jsx'

const defaultData = {
    width:1200,
    titles:[
        {
            id: nanoid(),
            title:'商品图片'
        },
        {
            id: nanoid(),
            title:'商品名称'
        },
        {
            id: nanoid(),
            title:'单价(元)'
        },
        {
            id: nanoid(),
            title:'数量(个)'
        },
        {
            id: nanoid(),
            title:'总价(元)'
        },
        {
            id: nanoid(),
            title:'备注'
        },
    ],
    ratios:[3,3,2,1,2,1],
    isBlankBef: false,
    isBlankAft: false,
}

export default function ListData(props){

    let {width, titles, datas, ratios, isBlankAft, isBlankBef, titHeight, bodyItemHeight, bodyHeight} = Object.assign(defaultData, props);
    
    const eachKeep = width / ratios.reduce((prev, item)=>prev+item, 0);

    titles = useMemo(()=>{
        let neo = [...titles];
        if(isBlankBef){
            neo.unshift('');
        }
        if(isBlankAft){
            neo.push('');
        }
        return neo;
    }, [titles, isBlankAft, isBlankBef]);

    return (
        <div className="list-data-box">
            <TitBox>
                {
                    titles.map((item,index)=>(
                        <TitItem
                            // className={item.title} 
                            key={item.id}
                            style={{
                                width: `${eachKeep * ratios[index]}px`,
                                height: `${titHeight}px`,
                                lineHeight: `${titHeight}px`,
                            }}
                        >
                            {item.title}
                        </TitItem>
                    ))
                }
            </TitBox>
            <BodyBox
                style={{
                    maxHeight:bodyHeight
                }}  
            >
                {
                    Array.isArray(datas)?
                    <ul>
                        {
                            datas.map((item)=>(
                                <BodyItemBox 
                                    key={item.id}
                                    style={{
                                        width: eachKeep * ratios[dataIndex]+"px",
                                        height: bodyItemHeight+"px",
                                        lineHeight: bodyItemHeight+'px'
                                    }}
                                >
                                    {
                                        item.info.map((dataItem, dataIndex)=>(
                                            <BodyItem
                                                // className={dataItem.title} 
                                                key={dataItem.id}
                                            >
                                                {
                                                    dataItem.body
                                                }
                                            </BodyItem>
                                        ))
                                    }
                                </BodyItemBox>
                            ))
                        }
                    </ul>:datas
                }
            </BodyBox>
        </div>
    );
}