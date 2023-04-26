<template>
    <div class="login-container">
      <div class="login-wrapper clearfix">
          <div class="login-box transition-threes">
              <div class="tit">
                  LogIn
              </div>
              <div class="body">
                  <div class="name">用户名: <input type='text' ref="usernameRef"/></div>
                  <div class="password">密&emsp;码: <input type='password'  ref="passwordRef"/></div>
                  <div class="btn"><button class="transition-threes" @click="handlerClick">登&emsp;录</button></div>
              </div>
          </div>
      </div>
    </div>
  </template>
  
  <script setup>

    import { ref } from '@vue/reactivity';
    import { requireLogin } from '@/static/axios';
    import { setSessionToken, getSessionToken } from '@/static/utils';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const token = getSessionToken();
    
    if(token){
        router.replace('/home');
    }

    const usernameRef = ref();
    const passwordRef = ref();
    const askLogin = async (data)=>{
        let res = await requireLogin(data);
        if(res.status === 200&&res.data.code === 20000){
          setSessionToken(res.data.token);
          router.push('/home');
        }
    }
  
    function handlerClick(){
        const userName = usernameRef.value.value.trim();
        const passWord = passwordRef.value.value.trim();
        if(userName&&passWord){
            askLogin({
                username:userName,
                password:passWord
            });
        }
    }
  </script>
  
  <style lang="less" scoped>
      .login-container {
          width: 100%;
          height: 100%;
          .login-wrapper {
              width: 100%;
              height: 100%;
              background-color: #000;
              .login-box {
                  width: 800px;
                  height: 500px;
                  margin: 150px auto;
                  padding: 100px 0;
                  box-sizing: border-box;
                  background-image: linear-gradient(135deg, rgba(255,255,255,.1),rgba(255,255,255,.3));
                  .tit {
                      width: 100%;
                      height: 60px;
                      margin-bottom: 30px;
                      font-size: 36px;
                      color: #fff;
                      text-align: center;
                  }
                  .body {
                      div {
                          height: 80px;
                          line-height: 80px;
                          text-align: center;
                          font-size: 16px;
                          color: #aaa;
                          input {
                              width: 300px;
                              height: 30px;
                              padding: 0 20px;
                              border-radius: 20px;
                              border: none;
                              outline: none;
                              font-size: 16px;
                          }
                          &.btn {
                              height: 40px;
                              line-height: 40px;
                              button {
                                  width: 80px;
                                  height: 40px;
                                  font-size: 18px;
                                  font-weight: 700;
                                  border: none;
                                  color: rgba(0,0,0,.3);
                                  &:hover {
                                      color: rgba(0,0,0,.8);
                                      box-shadow: 0 0 3px rgba(255,255,255,.8);
                                  }
                              }
                          }
                      }
                  }
                  &:hover {
                      box-shadow: 0 0 10px rgba(255,255,255,.3);
                  }
              }
          }
      }
  </style>