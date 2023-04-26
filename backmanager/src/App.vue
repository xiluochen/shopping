<template>
  <router-view></router-view>
</template>

<script setup>
  import * as echarts from 'echarts';
  import { ref } from 'vue';
  import { provide, onMounted, onBeforeUnmount } from '@vue/runtime-core';


  const screenWidth = ref(document.documentElement.offsetWidth);
  const screenHeight = ref(document.documentElement.offsetHeight);
  
  provide('screenWidth', screenWidth);
  provide('screenHeight', screenHeight);
  provide('echarts', echarts);
  
  const hanlderResize = ()=>{
      screenWidth.value = document.documentElement.offsetWidth;
      screenHeight.value = document.documentElement.offsetHeight;
  }
  onMounted(()=>{
      window.addEventListener('resize', hanlderResize);
  });
  onBeforeUnmount(()=>{
      window.removeEventListener('resize', hanlderResize)
  })
</script>

<style lang="less">
@import url('./fonts/iconfont.css');

* {
  margin: 0;
  padding: 0;
}

li,a {
  list-style: none;
}

input,
button {
  border: none;
  outline: none;
}

.clearfix::before ,
.clearfix::after{
  content: '';
  display: table;
  clear: both;
}

.transition-threes {
  transition: all .3s;
}
</style>
