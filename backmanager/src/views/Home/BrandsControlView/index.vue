<template>
    <div class="brands-control-container">
      <div class="brands-control-wrapper">
        <TitComponent title="品牌管理"></TitComponent>
        <div class="brands-body-box">
            <div class="brands-contain-box">
                <ul v-if="brands.length>0">
                    <li v-for="item, index in brands" :key="item.id">
                        <div class="brand-img"><img :src='item.img' :alt='item.title'/></div>
                        <div class="brand-name">{{ item.title }}</div>
                        <div class="brand-description">
                            <p>
                                {{ item.description }}
                            </p>
                        </div>
                        <div class="options">
                            <div class="edit">
                                <span 
                                    class="transition-threes iconfont icon-xiugai"
                                    @click="handlerClick(item.id, 1)"    
                                >
                                </span>
                            </div>
                            <div class="info">
                                <span 
                                    class="transition-threes iconfont icon-xinxi"
                                    @click="handlerClick(item.id, 2)"
                                >
                                </span>
                            </div>
                            <div class="delete">
                                <span 
                                    class="transition-threes iconfont icon-shanchu"
                                    @click="handlerClick(item.id, 3)"    
                                >
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-else class="tip-no">无</div>
                <Teleport to="body">
                    <div class="mask" :style="{
                        display:maskInfo.opCode>0?'block':'none',
                    }">
                        <div 
                            class="edit-box"
                            :style="{
                                display:maskInfo.opCode===1?'block':'none',
                            }"
                            
                        >
                            <TitComponent title="编辑品牌信息" />
                            <div class="edit-detail-box">
                                <div 
                                    class="img"
                                    @click="handlerImgChange"
                                >
                                    <input 
                                        type="file" 
                                        accept="image/jpeg,image/jp2,image/png"
                                        ref="fileChooseRef" 
                                        :style="{
                                            visibility:'hidden',
                                            width:'0px',
                                            height:'0px',
                                        }" 
                                    />
                                    <img 
                                        :src="maskInfo.detail.img" 
                                        :alt="maskInfo.detail.title" 
                                    />
                                </div>
                                <div class="name">
                                    品牌名:
                                    <input type="text" v-model="maskInfo.detail.title" />
                                </div>
                                <div class="description">
                                    <span>品牌描述:</span>
                                    <textarea v-model="maskInfo.detail.description" />
                                </div>
                                <div class="btns">
                                    <button class="save" @click="handlerSave">保存</button>
                                    <button class="cancel" @click="handlerCloseMask">取消</button>
                                </div>
                            </div>
                        </div>
                        <div 
                            class="info-box"
                            :style="{
                                display:maskInfo.opCode===2?'block':'none'
                            }"     
                        >
                            <TitComponent title="品牌详情" />
                            <div class="detail-box">
                                <div class="img"><img :src="maskInfo.detail.img" :alt="maskInfo.detail.title" /></div>
                                <div class="name">品牌名:{{ maskInfo.detail.title }}</div>
                                <div class="description">
                                    <span>品牌描述:</span> 
                                    <p>{{ maskInfo.detail.description||'无' }}</p>
                                </div>
                            </div>
                            <button class="close-btn transition-threes" @click="handlerCloseMask(2)">关闭</button>
                        </div>
                        <div 
                            class="delete-tip"
                            :style="{
                                display:maskInfo.opCode===3?'block':'none'
                            }"  
                        >
                            <TitComponent title="删除确认" />
                            <div class="delete-body">
                                是否确认删除<span>{{ maskInfo.detail.title }}</span>品牌?
                                <div class="btns">
                                    <div class="confirm">
                                        <button @click="handlerDelete">删除</button>
                                    </div>
                                    <div class="cancel">
                                        <button  @click="handlerCloseMask">取消</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Teleport>
            </div>
            <PageNavigation :nowPage="page" :endPage="totalPages" :changePageCallback="hanlderPageChange"/>
        </div>
      </div>
      
    </div>
  </template>
  
  <script setup>
    import PageNavigation from '../../../components/PageNavigation';
    import TitComponent from '../../../components/TitComponent';

    import { reactive, ref } from '@vue/reactivity'

    import { requireBrands, requireBrandPages, requireDeleteBrand, requireUpdateBrand } from '../../../static/axios'
    import { onMounted, watch } from '@vue/runtime-core';
    import { getSessionToken, readFileForBase64 } from '@/static/utils';

    const token = getSessionToken();
    const fileChooseRef = ref();
    const brands = ref([]);
    const page = ref(1);
    const totalPages = ref(1);
    const maskInfo = reactive({
        id:'',
        detail:{},
        opCode:0,
    })
    const hanlderPageChange = (oldPage,newPage)=>{
        page.value = newPage;
    }
    const handlerClick = (id, opCode)=>{
        maskInfo.id = id;
        maskInfo.opCode = opCode;
        maskInfo.detail = {...brands.value.filter(item=>item.id===id)[0]};
    }
    const handlerDelete = async ()=>{
        let res = await requireDeleteBrand({
            brandId:maskInfo.detail._id,
        })
        if(res.status === 200&&res.data.code===20000){
            askPages().then(()=>{
                if(page.value>totalPages.value){
                    page.value = totalPages.value;
                }else{
                    askBrands(page.value);
                }
            });
        }
        handlerCloseMask();
    }
    const handlerCloseMask = ()=>{
        maskInfo.opCode = 0;
        maskInfo.id = '';
        maskInfo.detail = {};
    }
    const handlerImgChange = ()=>{
        fileChooseRef.value.click();
    }
    const handlerSave = async ()=>{
        let info = brands.value.filter(item=>item.id===maskInfo.detail.id)[0];
        let flag = Object.keys(info).reduce((prev, key)=>{
            return prev&&(info[key]===maskInfo.detail[key])
        },true);
        if(!flag){
            let res = await requireUpdateBrand({
                ...maskInfo.detail
            });
            if(res.status === 200&& res.data.code === 20000){
                askBrands(page.value);
            }
        }
        handlerCloseMask();
    }
    const askPages = async ()=>{
        let res = await requireBrandPages()
        if(res.status === 200 && res.data.code === 20000){
            totalPages.value = Number(res.data.data);
        }
    }
    const askBrands = async (page)=>{
        let res = await requireBrands({
            page
        })
        if(res.status === 200 && res.data.code === 20000){
            brands.value = res.data.data.map((item)=>({id:item._id, ...item}));
        }
    }
    watch(page, ()=>{
        askBrands(page.value);
    })
    onMounted(()=>{
        askPages();
        askBrands(page.value);
        fileChooseRef.value.addEventListener('change',  ()=>{
            readFileForBase64(fileChooseRef.value.files[0], (oFRevent)=>{
                maskInfo.detail.img = oFRevent.target.result;
            });
        })
    })
  </script>
  
  <style lang="less" scoped>
  @import url('@/basic_var.less');
    .brands-control-container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 50px;
        overflow: hidden;
        .brands-control-wrapper {
            box-sizing: border-box;
            box-shadow: 0 0 5px @bold-line-color;
            .brands-body-box {
                width: 100%;
                .brands-contain-box {
                    margin-top: 50px;
                    margin-bottom: 5px;
                    border-bottom: 1px solid @light-line-color;
                    .tip-no {
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                    }
                    ul {
                        li {
                            width: 100%;
                            height: 100px;
                            line-height: 100px;
                            box-sizing: border-box;
                            margin: 5px 0;
                            div {
                                float: left;
                                width: 25%;
                                height: 90px;
                                line-height: 90px;
                                box-sizing: border-box;
                                text-align: center;
                                border-left: 1px solid @light-line-color;
                            }
                            .brand-img {
                                img {
                                    display: inline-block;
                                    width:80px;
                                    height: 80px;
                                }
                            }
                            .brand-description {
                                p {
                                    display: inline-block;
                                    width: 50%;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                            .options {
                                padding: 25px 0 25px 25px;
                                text-align: center;
                                div {
                                    width: 40px;
                                    height: 40px;
                                    line-height: 40px;
                                    margin: 0 10px;
                                    border: none;
                                    span {
                                        font-size: 22px;
                                        color: @bold-line-color;
                                    }
                                    &.edit:hover span {
                                        color: @main-color;
                                    }
                                    &.info:hover span {
                                        color: rgb(80, 84, 89);
                                    }
                                    &.delete:hover span {
                                        color: @danger-color;
                                    }
                                }
                            } 
                        }
                    }
                }
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
        .edit-box {
            width: 500px;
            height: 600px;
            margin: 100px auto 0;
            background-color: #fff;
            .edit-detail-box {
                margin-top: 20px;
                width: 100%;
                .img {
                    width: 100px;
                    height: 100px;
                    margin: 0 auto;
                    box-sizing: border-box;
                    border: 1px solid @light-line-color;
                    margin-bottom: 20px;
                    transition: box-shadow .3s;
                    &:hover {
                        box-shadow: 0 0 2px @bold-line-color;
                    } 
                    cursor: pointer;
                    img {
                        // display: block;
                        width: 80px;
                        height: 80px;
                        margin: 10px;
                    }
                }
                .name {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    margin: 0 0 10px 40px;
                    input {
                        width: 320px;
                        height: 40px;
                        margin-left: 20px;
                        padding-left: 20px;
                        font-size: 16px;
                        border-radius: 10px;
                        border: 1px solid @light-line-color;
                        transition: all .3s;
                        &:focus {
                            box-shadow: 0 0 2px @bold-line-color;
                        }
                    }
                }
                .description {
                    height: 300px;
                    margin-bottom: 10px;
                    span {
                        margin-left:  40px;
                    }
                    textarea {
                        display: block;
                        width: 400px;
                        height: 250px;
                        padding: 10px;
                        margin: 10px auto 0;
                        border: 1px solid @light-line-color;
                        resize: none;
                        outline: none;
                        transition: all .3s;
                        &:focus {
                            box-shadow: 0 0 2px @bold-line-color;
                        }
                    }
                }
                .btns {
                    width: 100%;
                    height: 40px;
                    text-align: center;
                    button {
                        width: 80px;
                        height: 40px;
                        border-radius: 10px;
                        transition: box-shadow .3s;
                        &.save {
                            margin-right: 8px;
                            background-color: @main-color;
                            color: #fff;
                        }
                        &:hover {
                            box-shadow: 0 0 2px @bold-line-color;
                        }
                    }
                }
            }
        }
        .info-box {
            width: 500px;
            height: 600px;
            margin: 100px auto 0;
            background-color: #fff;
            .detail-box {
                margin-top: 20px;
                width: 100%;
                div {
                    box-sizing: border-box;
                }
                .img {
                    height: 100px;
                    margin-bottom: 20px;
                    text-align: center;
                    img {
                        display: inline-block;
                        width: 80px;
                        height: 80px;
                    }
                }
                .name {
                    width: 100%;
                    height: 20px;
                    text-align: center;
                    margin-bottom: 10px
                }
                .description {
                    height: 300px;
                    margin-bottom: 10px;
                    span {
                        padding-left: 50px;
                    }
                    p {
                        width: 400px;
                        height: 200px;
                        margin: 50px auto 0;
                        padding: 10px;
                        box-sizing: border-box;
                        border: 1px solid @light-line-color;
                    }
                }
            }
            .close-btn {
                display: block;
                width: 80px;
                height: 40px;
                margin: 0 auto;
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
                            background-color: @danger-color;//rgb(217, 16, 6);
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