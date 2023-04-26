<template>
  <div class="basic-control-container">
    <router-view />
  </div>
</template>
  
  <script setup>
import { onMounted, provide, ref } from "vue";
import { requireGetBaseRoots } from "../../../static/axios";

const roots = ref({});

const initRoots = ref({});

const askRoots = async () => {
  let res = await requireGetBaseRoots();
  if (res.status === 200 && res.data.code === 20000) {
    roots.value = splitRoots(res.data.data);
    initRoots.value = res.data.data;
  }
};

const checkObj2Arr = (obj)=>{
    if(obj.id){
        return obj;
    }
    let keys = Object.keys(obj);
    return keys.map(key=>([key, checkObj2Arr(obj[key])]));
} 

const splitRoots = (roots=[])=>{
    let target = {};
    roots.forEach((item)=>{
        let splits = item.path.split('/');
        splits.shift();
        let now = target;
        if(splits){
            splits.forEach((key,ind)=>{
                if(!now[key]){
                    now[key] = {};
                }
                now = now[key];
                if(ind === splits.length-1){
                    now[item.title] = {
                        title:item.title,
                        id: item._id,
                        isChecked: false
                    };
                }
            });
        }
    });
    return checkObj2Arr(target);
}

provide("initRoots", initRoots);
provide("askRoots", askRoots);
provide('splitRoots', splitRoots);
provide("roots", roots);

onMounted(() => {
  askRoots();
});
</script>
  
  <style lang="less" scoped>
@import url("@/basic_var.less");
.basic-control-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px;
  overflow: hidden;
  .basic-control-wrapper {
    box-sizing: border-box;
    box-shadow: 0 0 5px @bold-line-color;
  }
}
</style>