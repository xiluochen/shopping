import { useState, useEffect } from "react";

import Footer from "../../components/Footer";
import TopHeader from "../../components/TopHeader";
import TopNav from "../../components/TopNav";
import DailyRecommend from "./DailyRecommend";
import HelpCenter from "./HelpCenter";
import { requireRecommend } from "../../static/require";

export default function HomePage(){

    const [recommendData, setRecommendData] = useState([]);


    const askRecommend = async()=>{
        let res = await requireRecommend();
        if(res.status === 200){
            setRecommendData(res.data.data);
        }else {
            setRecommendData([]);
        }
    }

    useEffect(()=>{
        askRecommend();
    }, []);

    return (
        <div className="home-container">
            <TopHeader isShowLogin={true}/>
            <TopNav showSwiper={true}/>
            <DailyRecommend recommendData={recommendData} />
            <HelpCenter />
            <Footer />
        </div>
    );
}