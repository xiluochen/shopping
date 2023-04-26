import styled from "styled-components";
import Footer from "../../../../components/Footer";
import TopHeader from "../../../../components/TopHeader";
import { mainColor } from "../../../../colors";

const SuccessWrapper = styled.div`
    height: 300px;
    line-height: 300px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 5px;
    color: ${mainColor};
    background-color: #fff;
    span {
        font-size: 36px;
    }
`;

export default function ResultSuccess(){
    return (
        <div className="success-container">
            <TopHeader showLogin={false} />
            <SuccessWrapper className="main-box">
                <span className="iconfont icon-chenggong"></span> 支付成功
            </SuccessWrapper>
            <Footer />
        </div>
    );
}