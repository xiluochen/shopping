<template>
  <div class="page-navigate-container">
    <div class="page-list">
        <ul>
            <li 
                v-for="page, index in pageIcons" 
                :key="`${page}_${index}`"
                :class="Number(page)==nowPage?'active':''"
                @click="hanlderPageChange(Number(page))"
            >
            {{ page }}
            </li>
        </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core';


        const props = defineProps({
            startPage:{
                type:Number,
                default:1,
            },
            endPage:{
                type:Number,
            },
            nowPage:{
                type:Number,
                default:1,
            },
            dividNext:{
                type:Number,
                default:3,
            },
            changePageCallback:{
                type:Function,
                default:(oldPage, newPage)=>{console.log(oldPage, newPage)}
            } 
        })

        const pageIcons = reactive([]);

        const hanlderPageChange = (newPage)=>{
            if(newPage){
                const {changePageCallback, nowPage} = props;
                changePageCallback(nowPage, newPage);
            }
        }

        const updatePage = ()=>{
            const {startPage, endPage, nowPage, dividNext} = props;
            pageIcons.length=0;
            pageIcons.push(startPage);
            let midOff = Math.floor(dividNext/2);
            if(midOff<=0)return;
            for(let i=-midOff;i<=midOff;i++){
                let newLoc = i + Number(nowPage);
                if(newLoc<=startPage||newLoc>=endPage)continue;
                else {
                    if(pageIcons.length===1&&newLoc>startPage+1){
                        pageIcons.push('...');
                    }
                }
                pageIcons.push(newLoc);
            }
            if(nowPage+midOff<endPage-1){
                pageIcons.push('...');
            }
            if((pageIcons[pageIcons.length-1]==='...')||pageIcons[pageIcons.length-1]<endPage){
                pageIcons.push(endPage);
            }
        }
        watch(props, updatePage)

        onMounted(updatePage)
</script>

<style lang="less" scoped>
@import url('@/basic_var.less');
    .page-navigate-container {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        padding: 10px 0;
        overflow: hidden;
        text-align: center;
        .page-list {
            ul {
                display: inline-block;
                li {
                    float: left;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    box-sizing: border-box;
                    text-align: center;
                    list-style: none;
                    border: 1px solid @light-line-color;
                    font-size: 14px;
                    cursor: pointer;
                    color: rgba(0,0,0,.6);
                    &.active {
                        background-color: @light-color;
                        color: #fff;
                    }
                    
                }
            }
        }
    }
</style>