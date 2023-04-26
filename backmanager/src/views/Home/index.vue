<template>
  <div class="home-container">
    <div class="home-wrapper">
        <div 
            class="left-slider-container"
            :style="{
                width:leftWidth+'px',
            }"   
        >
        <div class="user">
            <div class="avator">
                <img :src="userInfo.avator" :alt="userInfo.name" />
            </div>
            <div 
                class="user-text-box"
                @mouseenter="()=>{isHover = true}"
                @mouseleave="()=>{isHover = false}"
            >
                <div 
                    class="user-text"
                    :style="{
                        marginLeft:isHover?'-50px':'0px'
                    }"
                >
                    <div class="name">{{userInfo.name}}</div>
                    <div class="logout" @click="handlerLogout">退出</div>
                </div>
            </div>
            
        </div>
            
            <div class="items-show-box">
                <div class="switch" @click="hanlderSwitch">
                    <span 
                        class="iconfont icon-jiantou_zuoyouqiehuan_o"
                        :style="{
                            fontSize:'24px',
                        }"
                    >
                    </span>
                </div>
                <ul>
                    <li 
                        v-for="item, index in leftItems" :key="item.id"
                        class="transition-threes father-item"
                        :class="clickedId.includes(item.id)?'active':''"
                        @click="(event)=>{
                            if(item.children&&item.children.length>0){
                                showChild = true;
                                hanlderChoose(event, {ids:[item.id, item.children[0].id], path:item.children[0].target, type:'replace'})
                            }else {
                                hanlderChoose(event, {ids:[item.id], path:item.target, type:'replace', hasChild:item.children&&item.children.length>0})
                            }
                        }"
                        @mouseenter="()=>{if(clickedId[0]===item.id)showChild=true}"
                        @mouseleave="()=>{showChild=false}"
                    >
                        <span class="iconfont" :class="item.icon"></span>
                        {{leftWidth===200?item.title:''}}
                        <div 
                            class="children-items" 
                            v-if="item.children&&item.children.length>0&&clickedId[0]===(item.id)"
                            :style="{
                                right:showChild?'-100px':'0px',
                                zIndex:showChild?'1':'-1'
                            }"
                            >
                            <ul>
                                <li 
                                    v-for="child,index in item.children" 
                                    :key="child.id"
                                    :class="clickedId.includes(child.id)?'active':''"
                                    @click="hanlderChoose($event,{ids:[item.id, child.id], path:child.target, type:'replace'})"
                                >
                                    {{ child.title }}
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div 
            class="home-body-box"
            :style="{
               width:screenWidth-leftWidth+'px',
            }"
        >
            <router-view />
        </div>
    </div>
  </div>
</template>

<script setup>
    import { reactive, ref } from '@vue/reactivity'
    import { inject, onMounted, provide } from '@vue/runtime-core';
    import { useRoute, useRouter } from 'vue-router';

    import {requireUserInfo} from '@/static/axios.js'

    import { initLeftItems } from '@/static/data';
    import { getSessionToken } from '@/static/utils.js';
import { removeSessionToken, setSessionToken } from '../../static/utils';

    const route = useRoute();
    const router = useRouter();
    const screenWidth = inject('screenWidth');
    const leftWidth = ref(200);
    const leftItems = ref(initLeftItems);
    const clickedId = ref([]);
    const userInfo = reactive({});
    const showChild = ref(false);
    const isHover = ref(false);

    provide('userInfo',userInfo);

    const hanlderChoose = (event, {ids, path, type, hasChild=false})=>{
        event.stopPropagation();
        
        if(type==='replace'){
            if(clickedId.value.length>0){
                while(clickedId.value.length>0)
                    clickedId.value.pop();
                clickedId.value.push(...ids);
            }else {
                clickedId.value = [...ids];
            }
            if(!hasChild){
                router.push(path);
            }
        }else if(type==='push') {
            clickedId.value.push(ids[ids.length-1]);
            router.push(path);
        }
    }
    const hanlderSwitch = ()=>{
        leftWidth.value = (leftWidth.value === 200)?80:200;
    }
    const handlerLogout = ()=>{
        router.replace('/');
        removeSessionToken();
    }
    const askUserInfo = async()=>{
        let res = await requireUserInfo(getSessionToken());
        if(res.status === 200 && res.data.code === 20000){
            Object.keys(res.data.data).forEach(key=>{
                userInfo[key] = res.data.data[key];
            });
            userInfo['id'] = userInfo._id;
            if(userInfo.avator.length === 0){
                userInfo.avator = require('@/assets/bear.png');
            }
        }
    }
    const checkRootForRoute = (items, roots)=>{
        if(Array.isArray(items)){
            return items.reduce((prev, item)=>{
                let res = checkRootForRoute(item, roots);
                if(res){
                    prev.push(res);
                }
                return prev;
            }, [])
        }else if(typeof items === 'object'){
            if(items.target==='/home/total'){
                return items;
            }
            let flag = false;
            roots.forEach(root=>{
                if(('/home'+root.path).includes(items.target)){
                    if(items.children){
                        items.children = checkRootForRoute(items.children, roots);
                    }
                    flag = true;
                    return;
                }
            })
            if(flag)return items;
            return;
        }
    }
    provide('askUserInfo', askUserInfo);
    askUserInfo().then(()=>{
        if(userInfo.status === '0'){
            leftItems.value = leftItems.value.filter((item)=>(item.target!=='/home/total'));
        }else {
            leftItems.value = checkRootForRoute(leftItems.value, userInfo.roots);
        }
    });
    onMounted(()=>{
        if(route.path.substring(6) !== ''){
            let routePath = route.path.split('/');
            routePath.shift(); // 去除最开始的 ''
            let checkPath = '/'+routePath.shift()+'/'+routePath.shift();
            let checkItems = leftItems.value, obj = checkItems.find(item=>item.target===checkPath);
            clickedId.value = [obj.id];
            while(routePath.length>0){
                checkItems = obj.children;
                checkPath += '/'+routePath.shift();
                obj = checkItems.find(item=>item.target===checkPath)
                clickedId.value.push(obj.id);
            }
        }
    });

</script>

<style lang="less">
@import url('@/basic_var.less');
    .home-container {
        width: 100%;
        height: 100%;
        .home-wrapper {
            height: 100%;
            overflow: hidden;
            .left-slider-container {
                float: left;
                height: 100%;
                background-color: @main-color;
                .user {
                    padding: 10px 0;
                    .avator {
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        overflow: hidden;
                        text-align: center;
                        img {
                            display: inline-block;
                            width: 40px;
                            height: 40px;
                            overflow: hidden;
                        }
                    }
                    .user-text-box {
                        width: 50px;
                        height: 30px;
                        line-height: 30px;
                        margin: 5px auto 0;
                        font-size: 14px;
                        text-align: center;
                        overflow: hidden;
                        .user-text {
                            display: inline-block;
                            width: 100px;
                            transition: all .3s;
                            div{
                                float: left;
                                width: 50px;
                                height: 30px;
                                overflow: hidden;
                            }
                            .name {
                                color: #fff;
                            }
                            .logout {
                                color: @danger-light-color;
                                cursor: pointer;
                            }
                        }
                    }
                }
                
                .items-show-box {
                    position: relative;
                    
                    .switch {
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        background-color: rgba(255,255,255,.3);
                        span {
                            transition: all .3s;    
                        }
                        &:hover {
                            span {
                                color: #fff;
                            }
                        }
                    }
                    ul {
                        .father-item {
                            position: relative;
                            height: 60px;
                            line-height: 60px;
                            border-bottom: 1px solid rgba(0,0,0,.1);
                            box-sizing: border-box;
                            text-align: center;
                            letter-spacing: 2px;
                            font-size: 16px;
                            background-color: rgba(0,0,0,.3);
                            color: @main-color;
                            cursor: pointer;
                            &.active {
                                color: #fff;
                                background-color: rgb(77, 157, 237);
                            }
                            .children-items {
                                position: absolute;
                                top: 0;
                                width: 100px;
                                border: 1px solid @main-color;
                                border-left: none;
                                overflow: hidden;
                                transition: right .5s;
                                // animation: leftin .5s ease forwards;
                                @keyframes leftin {
                                    0% {
                                        right: 0px;
                                        // width: 0;
                                    }
                                    100% {
                                        // width: 100px;
                                        right: -100px;
                                    }
                                }
                                ul {
                                    li {
                                        width: 100%;
                                        height: 60px;
                                        border-bottom: 1px solid @main-color;
                                        line-height: 60px;
                                        box-sizing: border-box;
                                        text-align: center;
                                        font-size: 14px;
                                        color: @main-color;
                                        transition: all .3s;
                                        cursor: pointer;
                                        &:last-child {
                                            border-bottom: none;
                                        }
                                        &.active {
                                            background-color: @main-color!important;
                                            color: #fff;
                                        }
                                        &:hover {
                                            background-color: rgba(10, 46, 82,.8);
                                            color: #fff;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .home-body-box {
                float: left;
                height: 100%;
                // background-color: red;
            }
        }
    }
</style>