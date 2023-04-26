<template>
  <div 
    class="root-list-container"
    :style="{
        backgroundColor:focus?'none':'#fff!important'
    }"
  >
        <div 
            v-if="Array.isArray(root[1])" 
            class="tit"
        >
        <span class="iconfont icon-xiangxiajiantou"></span>
            {{ root[0] }}
        </div>
        <div 
            v-if="Array.isArray(root[1])" 
            class="layer-struc"
        >
            <RootList 
                v-for="item, index in root[1]"
                :root="item"
                :askRoots="askRoots"
                :handlerDelete="handlerDelete"
                :fontSize="fontSize"
                :lineHeight="lineHeight"
                :focus="focus"
            />
        </div>
        <div 
            v-else-if="typeof root[1] === 'object'" 
            class="info"
            :style="{
                height:lineHeight+'px',
                lineHeight:lineHeight+'px'
            }"
        >
            <div class="name">{{ root[1].title }}</div>
            <div class="ops">
              <div class="delete-root-btn" @click="handlerDelete($event, root[1].id)">
                <span class="iconfont icon-shanchu"></span>
              </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import RootList from './index.vue';

const props = defineProps({
    root:{
        type: Array,
        required: true
    },
    askRoots: Function,
    handlerDelete:Function,
    fontSize:{
        type:Number,
        required:false,
        fontSize:16
    },
    lineHeight:{
        type:Number,
        required:false,
        default:20
    },
    focus:{
        type:Boolean,
        required: false,
        default:true
    }
});

</script>

<style lang="less" scoped>
@import url('@/basic_var.less');
div{
    overflow: hidden;
    box-sizing: border-box;
}
.root-list-container {
    display: inline-block;
    width: 100%;
    min-height: 20px;
    font-size: 16px;
    transition: all .3s;
    &:hover {
        background-color: #ddd;
    } 
    .tit {
        width: 100%;
        height: 30px;
        padding-left: 20px;
        line-height: 30px;
        font-size: 18px;
        .iconfont {
            font-size: 14px;
        }
    }
    .layer-struc {
        display: inline-block;
        width: 100%;
        padding: 5px 10px;
    }

    .info {
        padding-left: 30px;
        transition: all .3s;
        .name {
            float: left;
            height: 100%;
        }
        .ops {
            float: right!important;
            margin-right: 20px!important;;
            .delete-root-btn {
              cursor: pointer;
              span {
                transition: color .3s;
              }
              &:hover {
                span {
                  color: @danger-color;
                }
              }
            }
        }
        &:hover {
            background-color: #ccc;
        }
    }
}
</style>