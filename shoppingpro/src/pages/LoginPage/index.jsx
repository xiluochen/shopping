import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';

import Logo from '../../components/Logo';
import TopHeader from '../../components/TopHeader';
import { requireLogin, requireRegister } from '../../static/require';

import './index.css';
import { 
    LoginBtn, 
    LoginFormContentBtnsBox, 
    LoginFormContentItem, 
    RegisterBtn,
    LoginBody,
    LoginFormBox,
    LoginFormContain,
    LoginFormTit,
    LoginFormTitH2,
    LoginWrapper
} from './index.css.jsx';

export default function LoginPage(){

    const vmHeight = window.innerHeight;

    const name = useRef(), password=useRef(), logoRef = useRef();

    const navigate = useNavigate();

    const handlerMouseEnter = useCallback(()=>{
        logoRef.current.style.display = 'block';
        setTimeout(()=>{
            logoRef.current.style.left = '250px';
            logoRef.current.style.transform = 'rotateZ(360deg)';
        }, 1)
    }, []); 

    const handlerMouseLeave = useCallback(()=>{
        logoRef.current.style.left = '350px';
        logoRef.current.style.transform = '';
        setTimeout(()=>{
            logoRef.current.style.display = 'none';
        }, 200)
    }, []);

    const askLogin = useCallback(async (username, password)=>{
        let res = await requireLogin({
            username,
            password
        });
        if(res.status === 200){
            window.sessionStorage.setItem('token', res.data.token);
            navigate(-1);
        }
    }, [navigate]); 

    const askRegister = async (username, password)=>{
        requireRegister({
            username,
            password
        }).then(res=>{
            if(res.status&&res.status === 200){
                window.sessionStorage.setItem('token', res.data.token);
                navigate(-1);
            }else {
                console.log(res.data.data)
            }
        }).catch(err=>{
            console.log(err)
        });
    }; 

    const handlerLogin = useCallback((e)=>{
        e.preventDefault();
        const userName = name.current.value, passw = password.current.value;
        name.current.value = '';
        password.current.value = '';
        askLogin(userName, passw)
    }, [askLogin]); 

    const handlerRegister = useCallback((e)=>{
        e.preventDefault();
        const userName = name.current.value, passw = password.current.value;
        name.current.value = '';
        password.current.value = '';
        askRegister(userName, passw)
    }, [askRegister])


    return (
        <div 
            className="login-container"
            style={{
                height:`${vmHeight}px`
            }}
        >
            <TopHeader />
            <LoginBody
                style={{
                    height:`${vmHeight-30}px`
                }}
            >
                <LoginWrapper>
                    <LoginFormBox>
                        <LoginFormTit>
                            <LoginFormTitH2>
                                <span
                                    onMouseEnter={handlerMouseEnter}
                                    onMouseLeave={handlerMouseLeave} 
                                >
                                    Login
                                </span>
                                <LoginFormContain ref={logoRef}>
                                    <Logo logo={require('../../imgs/logo.png')} />
                                </LoginFormContain>
                            </LoginFormTitH2>
                        </LoginFormTit>
                        <div className="login-form-content">
                            <form action=''>
                                <LoginFormContentItem>用户名:<input type='text' ref={name} /></LoginFormContentItem>
                                <LoginFormContentItem>密&emsp;  码:<input type='password' ref={password} /></LoginFormContentItem>
                                <LoginFormContentBtnsBox>
                                    <LoginBtn className='transition-fives' onClick={handlerLogin}>登&emsp;录</LoginBtn>
                                    <RegisterBtn className='transition-fives' onClick={handlerRegister}>注&emsp;册</RegisterBtn>
                                </LoginFormContentBtnsBox>
                                </form>
                        </div>
                    </LoginFormBox>
                </LoginWrapper>
            </LoginBody>
        </div>
    );
}