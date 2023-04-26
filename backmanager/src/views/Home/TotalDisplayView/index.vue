<template>
    <div class="overview-container">
      <div class="overview-wrapper">
        <div class="overview-info-box clearfix">
          <div class="infos">
            <div class="name">用户名:<span>{{ userInfo.name }}</span></div>
            <div class="phone">电话:<span>{{ userInfo.phone }}</span></div>
            <div class="email">邮箱:<span>{{ userInfo.email }}</span></div>
            <div class="income">
              <div>现有订单总收入(元):</div>
              <div 
                class="income-echart" 
                ref="incomeRef"
                v-hovershow="hoverId==='income-chart'"
                @mouseenter="()=>{hoverId='income-chart'}"
                @mouseleave="()=>{hoverId=''}"
              ></div>
            </div>
          </div>
        </div>
        <div class="overview-data-box">
          <div class="data-box">
            <div class="pays-overview-box">
              <div 
                id="pay-chart"
                class="chart-box" 
                ref="payRef"
                v-hovershow="hoverId==='pay-chart'"
                @mouseenter="()=>{hoverId='pay-chart'}"
                @mouseleave="()=>{hoverId=''}"
              ></div>
              <div 
                class="list-box"
                v-hovershow="hoverId==='pay-list-box'"
                @mouseenter="()=>{hoverId='pay-list-box'}"
                @mouseleave="()=>{hoverId=''}"
              >
                <TitComponent title="订单TOP5"/>
                <div class="box-body">
                  <ul>
                    <li v-for="item,index in pays" :key="item.id" :style="{
                      backgroundColor:index%2==0?'#eee':'#fff'
                    }">
                      <span class="index" :style="{width:'25%'}">{{ index+1 }}</span>
                      <span class="pay-name" :style="{width:'25%'}">{{ item.payName }}</span>
                      <span class="pay-for-name" :style="{width:'25%'}">{{ item.payForName }}</span>
                      <span class="pay-total" :style="{width:'25%'}">{{ Number(item.nums)*Number(item.payForInfo.price)+"元" }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="brands-overview-box">
              <div 
                id="brand-chart"
                class="chart-box" 
                ref="brandRef"
                v-hovershow="hoverId==='brand-chart'"
                @mouseenter="()=>{hoverId='brand-chart'}"
                @mouseleave="()=>{hoverId=''}"
              ></div>
              <div 
                class="list-box"
                v-hovershow="hoverId==='brand-list-box'"
                @mouseenter="()=>{hoverId='brand-list-box'}"
                @mouseleave="()=>{hoverId=''}"
              >
                <TitComponent title="品牌概览"/>
                <div class="box-body">
                  <ul>
                    <li v-for="item,index in brands" :key="item.id" :style="{
                      backgroundColor:index%2==0?'#eee':'#fff'
                    }">
                      <span class="index" :style="{width:'20%'}">{{ index+1 }}</span>
                      <span class="brand-name" :style="{width:'40%'}">{{ item.title }}</span>
                      <span class="brand-desc-name" :style="{width:'40%'}">{{ item.description }}</span>
                    </li>
                  </ul>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { computed, inject, onMounted, watch } from '@vue/runtime-core';

    import {requireOverview} from '../../../static/axios';

    import TitComponent from '../../../components/TitComponent';
    import { getSessionToken } from '@/static/utils';

    const echarts = inject('echarts');
    const incomeRef = ref();
    const payRef = ref();
    const brandRef = ref();
    const pays = ref([]);
    const brands = ref([]);
    const income = ref(0);
    const userInfo = inject('userInfo');

    const hoverId = ref('');
    
    const incomeEchart = ref({});
    const payEchart = ref({});
    const brandEchart = ref({});
    const incomeOptions = computed(()=>({
      title:{
        show:false
      },
      legend: {
        show:false,
      },
      grid:{
        left:'0%',
        right:'10%',
        top:'0%',
        bottom:'0%',
      },
      xAxis: {
        type:'value',
        show:false,
      },
      yAxis:{
        type:'category',
        data:['收入'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#272A31',
        },
      },
      series: [
        {
          type:'bar',
          data:[income.value],
          barWidth:40,
          label:{
            show:true,
            color:'#fff'
          },
          showBackground: true,
          backgroundStyle: {
            color: '#E7EEFE'
          },
          itemStyle:{
            color:'rgb(77, 157, 237)'
          }
        }
      ]
    }));
    const payOptions = computed(()=>({
      title:{
        text:'订单TOP5柱状图',
        top:'0%',
        left:'35%',
        textStyle:{
          fontSize:12,
        },
      },
      xAxis: {
        type:'category',
        data:pays.value.map((item)=>(item.payName)),
        axisTick: {
          show: false
        },
      },
      grid:{
        left:'10%',
        right:'5%',
        top:"10%",
        bottom:'10%'
      },
      yAxis:{
        type:'value',
        max:pays.value.reduce(
              (prev,item)=>
                prev>Number(item.nums)*Number(item.payForInfo.price)?
                  prev:Number(item.nums)*Number(item.payForInfo.price),
              0)+30,
      },
      series: [
        {
          type:'bar',
          data:pays.value.map((item)=>(Number(item.nums)*Number(item.payForInfo.price))),
          barWidth:20,
          showBackground: true,
          backgroundStyle: {
            color: '#E7EEFE'
          },
          itemStyle:{
            color:'rgb(77, 157, 237)'
          }
        }
      ]
    }));
    const brandOptions = computed(()=>(
      {
        title:{
          text:'受欢迎的商品',
          left: 'center',
          textStyle:{
            fontSize:14
          },
        },
        series: [
          {
            type:'pie',
            radius:'60%',
            data:brands.value.map((item)=>({value:1,name:item.title})),
          }
        ]
      }
    ))
    const setEchartOptions = (echart, options)=>{
      echart.setOption(options);
    }
    const handlerAsk = async (path)=>{
      const token = getSessionToken();
      let res = await requireOverview(path);
      if(res.status===200 && res.data.code === 20000){
        switch(path){
          case '/overlist/pay':
            pays.value = res.data.data.map(item=>({id:item._id, ...item}))||[];
            break;
          case '/overlist/brand':
            brands.value = res.data.data.map(item=>({id:item._id, ...item}))||[];
            break;
          case '/overlist/income':
            income.value = res.data.data||0;
            break;
        }
      }
    }
    const askData = ()=>{
      return new Promise((resolve)=>{
        handlerAsk('/overlist/pay');
        handlerAsk('/overlist/brand');
        handlerAsk('/overlist/income');
        resolve();
      })
    }
    watch(income, ()=>setEchartOptions(incomeEchart.value, incomeOptions.value));
    watch(pays, ()=>setEchartOptions(payEchart.value, payOptions.value));
    watch(brands, ()=>setEchartOptions(brandEchart.value, brandOptions.value));
    onMounted(()=>{
      incomeEchart.value = echarts.init(incomeRef.value);
      payEchart.value = echarts.init(payRef.value);
      brandEchart.value = echarts.init(brandRef.value);
      askData();
    })
  </script>
  
  <style lang="less" scoped>
  @import url('@/basic_var.less');
  div {
    box-sizing: border-box;
  }
  .overview-container {
    width: 100%;
    height: 100%;
    .overview-wrapper {
      padding: 50px;
      .overview-info-box{
        width: 100%;
        height: 60px;
        box-shadow: 0 0 3px @bold-line-color;
        .infos {
          display: block;
          width: 1100px;
          height: 40px;
          margin: 10px auto;
          div {
            float: left;
            height: 40px;
            line-height: 40px;
            margin-left: 50px;
            font-weight: 600;
            font-size: 16px;
            span {
              margin-left: 10px;
              font-weight: 400;
              font-size: 14px;
            }
          }
          .income {
            div {
              margin: 0;
            }
              .income-echart {
                display: inline-block;
                float: none;
                width: 300px;
                height: 30px;
                margin-left: 20px;
                margin-top: 5px;
                box-shadow: 0 0 2px @bold-line-color;
              }
            }
        }
      }
      .overview-data-box{
        display: inline-block;
        width: 100%;
        margin-top: 50px;
        padding: 0px 20px;
        box-shadow: 0 0 5px @bold-line-color;
        &>.data-box {
          display: block;
          width: 1100px;
          height: 600px;
          margin: 0 auto;
          &>div {
            float: left;
            width: 500px;
            height: 100%;
            // box-shadow: 0 0 3px @bold-line-color;
            &:nth-child(2) {
              margin-left: 100px;
            }
            .chart-box {
                width: 400px;
                height: 240px;
                margin: 20px auto 0;
                padding: 5px;
                // box-shadow: 0 0 2px @bold-line-color;
              }
              .list-box {
                width: 400px;
                height: 300px;
                margin: 20px auto 0;
                box-shadow: 0 0 3px @bold-line-color;
                .box-body {
                  ul {
                    li {
                      height: 52px;
                      line-height: 52px;
                      box-sizing: border-box;
                      border-bottom: 1px solid @light-line-color;
                      &:last-child {
                        border: none;
                      }
                      span {
                        display: inline-block;
                        padding: 0 5px;
                        text-align: center;
                        box-sizing: border-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      }
                    }
                  }
                }
              }
          }

        }
      }
    }
  }
  </style>