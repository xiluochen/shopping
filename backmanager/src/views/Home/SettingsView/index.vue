<template>
  <div class="setting-container">
    <div class="setting-wrapper">
        <TitComponent title="用户设置"></TitComponent>
        <div class="setting-body-box">
            <div class="infos-box">
                <div class="change-avator">
                    <input 
                        ref="selectImgRef" 
                        type="file" 
                        accept="image/jpeg,image/jp2,image/png"
                        :style="{
                            visibility:'hidden', 
                            width:'0px', 
                            height:'0px'
                        }" 
                    />
                    <img :src="defInfo.avator" alt="修改头像" @click="handlerChangeImg" />
                </div>
                <label for="#username">用户名:<input id="username" type="text" v-model="defInfo.name" /></label>
                <label for="#loc">地&emsp;址<input id="loc" type="text" v-model="defInfo.loc" /></label>
                <label for="#phone">电&emsp;话:<input id="phone" type="number" v-model="defInfo.phone" /></label>
                <label for="#email">邮&emsp;箱:<input id="email" type="text" v-model="defInfo.email" /></label>
                <button @click="handlerSave">保存</button>
            </div>
        </div>  
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { inject, onBeforeUnmount, onMounted, reactive, watch } from '@vue/runtime-core'
    import { requireUpdateData } from '@/static/axios';

    import TitComponent from '../../../components/TitComponent';
    import { deepCopyForObj, readFileForBase64 } from '@/static/utils';
    import { setSessionToken } from '../../../static/utils';
    import { onBeforeRouteUpdate } from 'vue-router';

    const selectImgRef = ref();
    const askUserInfo = inject('askUserInfo');
    const userInfo = inject('userInfo');
    const defInfo = reactive({...userInfo});
    const selectImg = ()=>{
        // 读取Input.typefile读取的文件路径
        readFileForBase64(selectImgRef.value.files[0], (oFRevent)=>{
            let res = oFRevent.target.result;
            defInfo.avator = res;
        });
    };
    const handlerChangeImg = ()=>{
        selectImgRef.value.click();
    }
    const handlerSave = async()=>{
        let flag = Object.keys(userInfo).reduce((prev, key)=>{
            return prev && (userInfo[key]===defInfo[key]);
        }, true)
        if(!flag){
            let res = await requireUpdateData(defInfo);
            if(res.status === 200 && res.data.code===20000){
                if(res.data.token){
                    setSessionToken(res.data.token);
                }
                askUserInfo();
                alert('修改成功');
            }
        }
    }
    watch(userInfo, ()=>{
        deepCopyForObj(defInfo, userInfo)
    })
    onMounted(()=>{
        selectImgRef.value.addEventListener('change', selectImg);
    })
    onBeforeUnmount(()=>{
        selectImgRef.value.removeEventListener('change', selectImg);
    })
</script>

<style lang="less" scoped>
@import url('@/basic_var.less');
    .setting-container {
        width: 100%;
        height: 100%;
        padding: 50px;
        box-sizing: border-box;
        .setting-wrapper {
            box-shadow:  0 0 5px @bold-line-color;
            .setting-body-box {
                width: 500px;
                margin: 0 auto;
                text-align: center;
                .infos-box {
                    padding: 50px 0;
                    .change-avator {
                        width: 80px;
                        height: 80px;
                        line-height: 80px;
                        margin: 0 auto;
                        box-sizing: border-box;
                        border: 1px solid @light-line-color;
                        overflow: hidden;
                        box-shadow: 0 0 3px @bold-line-color;
                        img {
                            width: 60px;
                            height: 60px;
                            margin-top: 10px;
                            cursor: pointer;
                        }
                    }
                    label {
                        display: block;
                        width: 400px;
                        height: 80px;
                        line-height: 80px;
                        margin: 10px 50px;
                        font-size: 18px;
                        input {
                            width: 200px;
                            height: 30px;
                            line-height: 30px;
                            padding: 0 20px;
                            margin-left: 20px;
                            border: none;
                            border-radius: 5px;
                            box-shadow: 0 0 3px @bold-line-color;
                            outline: none;
                            font-size: 14px;
                            &[type='number'] {
                                &::-webkit-outer-spin-button,
                                &::-webkit-inner-spin-button {
                                    -webkit-appearance: none;
                                }
                                appearance: textfield;
                                -moz-appearance: textfield;
                            }
                        }
                    }
                    button {
                        width: 80px;
                        height: 30px;
                        margin: 20px auto;
                        border: none;
                        outline: none;
                        background-color: #fff;
                        box-shadow: 0 0 3px @bold-line-color;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
</style>