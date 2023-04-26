<template>
  <div class="tit-box">
        <span :style="{
            fontWeight:isBold?'600':'400'
        }">
            {{ title }}
        </span>
    </div>
</template>

<script>
export default {
    props:{
        title:String,
        isBold:{
            type:Boolean,
            default:true,
        }
    },
}
</script>

<style lang="less" scoped>
@import url('@/basic_var.less');
.tit-box {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid @bold-line-color;
    span {
        font-size: 16px;
        letter-spacing: 5px;
    }
}
</style>