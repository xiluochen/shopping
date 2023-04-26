<template>
    <div class="pays-control-container">
      <div class="pays-control-wrapper">
        <div class="pays-tit-box">
          <ul>
            <li 
              v-for="item,index in titItems" 
              :key="item+index"
              :style="{
                width:100/titItems.length+'%',
              }"  
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="pays-detail-box">
          <ul v-if="pays.length>0">
            <li v-for="pay,index in pays" :key="pay.id">
              <div class="index-box" :style="{width:100/titItems.length+'%',}">{{ index+1 }}</div>
              <div class="pay-name-box" :style="{width:100/titItems.length+'%',}">{{ pay.payName }}</div>
              <div class="pay-for-name-box" :style="{width:100/titItems.length+'%',}">{{ pay.payForName }}</div>
              <div class="price-box" :style="{width:100/titItems.length+'%',}">{{ pay.payForInfo.price }}</div>
              <div class="num-box" :style="{width:100/titItems.length+'%',}">{{ pay.nums }}</div>
              <div class="total-pay-box" :style="{width:100/titItems.length+'%',}">{{ pay.nums*pay.payForInfo.price }}</div>
              <div class="loc-box" :style="{width:100/titItems.length+'%',}">{{ pay.loc }}</div>
              <div class="op-box" :style="{width:100/titItems.length+'%',}">
                <div class="delete" @click="handlerClick(pay.id, 3)"><span class="iconfont icon-shanchu"></span></div>
                <div class="info" @click="handlerClick(pay.id, 2)"><span class="iconfont icon-xinxi"></span></div>
              </div>
            </li>
          </ul>
          <div class="body-no" v-else>无</div>
        </div>
        <div class="footer-box">
          <PageNavigation 
            :endPage="totalPage" 
            :nowPage="page"  
            :changePageCallback="hanlderPageChange"
          />
        </div>
      </div>
      <Teleport to="body">
        <div 
          class="mask" 
          v-if="maskInfo.opCode>0"
        >
            <div 
              class="info-box"
              v-if="maskInfo.opCode===2"
              :style="{
                  display:maskInfo.opCode===2?'block':'none'
              }"     
            >
                <TitComponent title="订单详情" />
                <div class="detail-box">
                    <div class="pay-name">买家昵称: <span>{{ maskInfo.detail.payName }}</span></div>
                    <div class="pay-for-name">商品名称:<span>{{ maskInfo.detail.payForName }}</span></div>
                    <div class="price">商品单价:<span>{{ (maskInfo.detail.payForInfo).price }}</span></div>
                    <div class="nums">商品数量:<span>{{ maskInfo.detail.nums }}</span></div>
                    <div class="total">商品总价:<span>{{ maskInfo.detail.nums*maskInfo.detail.payForInfo.price }}</span></div>
                    <div class="loc">收货地址:<span>{{ maskInfo.detail.loc }}</span></div>
                </div>
                <button class="close-btn transition-threes" @click="handlerMaskClose">关闭</button>
            </div>
            <div 
                class="delete-tip"
                v-if="maskInfo.opCode===3"
                :style="{
                    display:maskInfo.opCode===3?'block':'none'
                }"  
            >
                <TitComponent title="删除确认" />
                <div class="delete-body">
                    是否确认删除当前订单?
                    <div class="btns">
                        <div class="confirm">
                            <button @click="handlerDelete">删除</button>
                        </div>
                        <div class="cancel">
                            <button  @click="handlerMaskClose">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup>
    import { requireDeletePay, requirePayPages, requirePays } from '@/static/axios';
    import { reactive, ref } from '@vue/reactivity';
    import { onMounted } from '@vue/runtime-core';    
    import PageNavigation from '@/components/PageNavigation';
    import TitComponent from '@/components/TitComponent';   
    import {initTitItems} from '@/static/data';   
    import { getSessionToken } from '@/static/utils';   
    const page = ref(1);
    const totalPage = ref(1);
    const pays = ref([]);
    const titItems = initTitItems;
    const maskInfo = reactive({
      id:'',
      opCode:0,
      detail:{
        payForInfo:{
          price:0
        },
      },
    });
    const hanlderPageChange = (oldPage,newPage)=>{
        page.value = newPage;
        askPays(page.value);
    }
    const handlerClick = (id, opCode)=>{
        maskInfo.opCode = opCode;
        maskInfo.id = id;
        maskInfo.detail = {...pays.value.filter(item=>item.id===id)[0]};
    }
    const handlerMaskClose = ()=>{
      maskInfo.opCode = 0;
      maskInfo.id = '';
      maskInfo.detail = {};
    }
    const handlerDelete = async ()=>{
      let res = await requireDeletePay({
        targetId:maskInfo.id,
      })
      if(res.status === 200 && res.data.code === 20000){
        askTotalPages().then(()=>{
          if(page.value>totalPage.value){
            page.value = totalPage.value;
          }
          askPays(page.value);
        });
      }
      handlerMaskClose();
    }
    const askTotalPages = async ()=>{
      let res = await requirePayPages();
      if(res.status === 200&&res.data.code === 20000){
        totalPage.value = Number(res.data.data);
      }
    }
    const askPays = async (page)=>{
      let res = await requirePays({ page });
      if(res.status === 200 && res.data.code === 20000){
        pays.value = res.data.data.map(item=>({id:item._id, ...item}));
      }
    }
    onMounted(()=>{
      askTotalPages();
      askPays(page.value);
    })
  </script>
  
  <style lang="less" scoped>
  @import url('@/basic_var.less');
    .pays-control-container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 50px;
        overflow: hidden;
        .pays-control-wrapper {
            border: 1px solid @light-line-color;
            box-sizing: border-box;
            // box-shadow: 0 0 5px @bold-line-color;
          .pays-tit-box {
            height: 50px;
            line-height: 50px;
            border: 1px solid @light-line-color;
            ul {
              li {
                float: left;
                height: 50px;
                box-sizing: border-box;
                text-align: center;
                font-size: 14px;
                border-right: 1px solid @light-line-color;
                &:last-child {
                  border-right: none;
                }
              }
            }
          }
          .pays-detail-box {
            width: 100%;
            box-sizing: border-box;
            ul {
              width: 100%;
              li {
                width: 100%;
                height: 60px;
                line-height: 60px;
                box-sizing: border-box;
                border-bottom: 1px solid @light-line-color;
                div {
                  float: left;
                  height: 100%;
                  padding: 0 10px;
                  box-sizing: border-box;
                  border-right: 1px solid @light-line-color;
                  text-align: center;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  &:last-child {
                    border-right:none;
                  }
                  &.op-box {
                    div {
                      width: 40px;
                      height: 100%;
                      border: none;
                      cursor: pointer;
                      span {
                        font-size: 20px;
                        transition: color .3s;
                        color: @light-line-color;
                      }
                      &.delete:hover span {
                        color: @danger-color;
                      }
                      &.info:hover span {
                        color: rgb(123, 120, 120);
                      }
                    }
                  }
                }
              }
            }
            .body-no {
              width: 100%;
              height: 80px;
              text-align: center;
            }
          }
          .footer-box {
            width: 100%;
          }
        }
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: @bold-line-color;
        .info-box {
            width: 500px;
            height: 400px;
            margin: 100px auto 0;
            background-color: #fff;
            .detail-box {
                margin-top: 20px;
                width: 100%;
                div {
                    height: 40px;
                    line-height: 40px;
                    padding-left: 50px;
                    box-sizing: border-box;
                    font-size: 20px;
                    span {
                      display: inline-block;
                      width: 300px;
                      height: 40px;
                      padding-top: 5px;
                      box-sizing: border-box;
                      vertical-align: bottom;
                      text-align: center;
                      margin: 0 10px;
                      border-bottom: 1px solid @light-line-color;
                      font-size: 16px;
                    }  
                }
            }
            .close-btn {
              display: block;
              width: 80px;
              height: 40px;
              margin: 50px auto 0;
              border: none;
              outline: none;
              &:hover {
                  background-color: @danger-color;
                  color: #fff;
              }
            }
        }
        .delete-tip {
            width: 600px;
            margin: 100px auto 0;
            background-color: #fff;
            .delete-body {
                position: relative;
                height: 200px;
                line-height: 200px;
                font-size: 18px;
                text-align: center;
                span {
                    margin: 0 10px;
                    font-weight: 700;
                }
                .btns {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    div {
                        float: right;
                        width: 80px;
                        height: 40px;
                        border-radius: 10px;
                        overflow: hidden;
                        transition: all .3s;
                        background-color: #eee;
                        button {
                            display: block;
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                            color: #fff;
                        }
                        &.confirm {
                            margin: 0 20px;
                            background-color: rgb(217, 16, 6);
                        }
                        &:hover {
                            box-shadow: 0 0 3px @bold-line-color;
                        }
                    }
                }
            }
        }
    }
  </style>