<template>
    <div class="default-container">
        欢迎，<span>{{ userInfo.name }}</span>！！！
    </div>
</template>

<script setup>
    import { inject } from '@vue/runtime-core'

    const userInfo = inject('userInfo');

</script>

<style lang="less">
.default-container {
    width: 100%;
    height: 100%;
    margin: 50px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 5px;
    span {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: normal;
    }
}
</style>