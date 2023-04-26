<template>
  <div class="root-control-container">
    <div class="root-control-wrapper">
      <TitComponent title="权限管理" />
      <div class="control-btns">
        <div class="append-root-btn" @click="handlerAppendRoot">
          <span class="iconfont icon-tianjia"></span>
        </div>
      </div>
      <div class="root-control-box">
        <RootList
          v-for="(root, index) in roots"
          :root="root"
          :askRoots="askRoots"
          :handlerDelete="handlerDelete"
        />
      </div>
    </div>
    <Teleport to="body">
      <div class="mask" v-if="maskInfo.opCode > 0 || deleteId !== ''">
        <div class="delete-confirm-box" v-if="deleteId !== ''">
          <TitComponent title="权限删除确认" />
          <div class="confirm-body-box">
            <span>是否确认删除</span
            ><span>{{
              (roots.filter((item) => item.id === deleteId)[0] || { title: "" })
                .title
            }}</span
            >?
          </div>
          <div class="btns">
            <button class="confirm" @click="handlerConfirmDelete">删除</button>
            <button class="cancel" @click="handlerCancelDelete">取消</button>
          </div>
        </div>
        <div
          class="append-box"
          :style="{
            display: maskInfo.opCode === 1 ? 'block' : 'none',
          }"
        >
          <TitComponent title="添加权限" />
          <div class="root-append-box">
            <div class="name">
              <label>权限名:</label> <input type="text" v-model="maskInfo.root.title" />
            </div>
            <div class="path">
              <label>所属路径:</label> <input type="text" v-model="maskInfo.root.path" />
            </div>
          </div>
          <div class="btns">
            <button
              class="confirm-btn transition-threes"
              @click="handlerSaveAppendRoot"
            >
              保存
            </button>
            <button
              class="close-btn transition-threes"
              @click="handlerCloseMask"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
  
  <script setup>
import { inject, reactive, ref } from "vue";
import { onMounted } from "vue";
import { requireDeleteRoot, requireSaveAppendRoot } from "@/static/axios";

import RootList from "@/components/RootList/index.vue";
import TitComponent from "@/components/TitComponent";

const roots = inject("roots");

const deleteId = ref("");

const maskInfo = reactive({
  opCode: 0,
  root: {
    title: "",
    path: "",
  },
});

const askRoots = inject("askRoots");

const handlerAppendRoot = () => {
  maskInfo.opCode = 1;
};

const handlerSaveAppendRoot = async () => {
  let flag = roots.value.some((item) => item.title === maskInfo.root.title);
  if (flag || maskInfo.root.title.trim() === "") {
    handlerCloseMask();
    return;
  }
  const res = await requireSaveAppendRoot({
    root: {
      title: maskInfo.root.title,
      path: maskInfo.root.path,
    },
  });
  if (res.status === 200 && res.data.code === 20000) {
    askRoots();
  }
  handlerCloseMask();
};

const handlerDelete = (event, id) => {
  event.stopPropagation();
  deleteId.value = id;
};

const handlerConfirmDelete = async () => {
  let res = await requireDeleteRoot({
    id: deleteId.value,
  });
  if (res.status === 200 && res.data.code === 20000) {
    askRoots().then(() => {
      deleteId.value = "";
    });
  }
};

const handlerCancelDelete = () => {
  deleteId.value = "";
};

const handlerCloseMask = () => {
  maskInfo.opCode = 0;
  maskInfo.root = {};
};

onMounted(() => {
  askRoots();
});
</script>
  
  <style lang="less" scoped>
@import url("@/basic_var.less");
.root-control-container {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 5px @bold-line-color;
  .control-btns {
    position: absolute;
    top: 0;
    right: 20px;
    height: 40px;
    line-height: 40px;
    .append-root-btn {
      float: left;
      width: 40px;
      height: 40px;
      transition: all 0.3s;
      transform-origin: center;
      cursor: pointer;
      &:hover {
        transform: rotate(90deg);
        span {
          color: @main-color;
        }
      }
      span {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 20px;
        text-align: center;
        color: @bold-line-color;
        transition: all 0.3s;
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
  .delete-confirm-box {
    position: absolute;
    top: 100px;
    left: 50%;
    width: 400px;
    height: 200px;
    z-index: 99;
    transform: translateX(-50%);
    box-shadow: 0 0 5px @bold-line-color;
    background-color: #fff;
    .confirm-body-box {
      position: relative;
      width: 100%;
      height: 110px;
      line-height: 110px;
      text-align: center;
      span {
        &:nth-child(2) {
          margin: 0 5px;
          font-weight: 600;
        }
      }
    }
    .btns {
      width: 100%;
      height: 40px;
      margin: 5px 0;
      text-align: center;
      button {
        width: 80px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        &.confirm {
          margin-right: 5px;
          transition: all 0.3s;
          &:hover {
            background-color: @danger-color;
            color: #fff;
          }
        }
        &.cancel {
          transition: all 0.3s;
          &:hover {
            background-color: @bold-line-color;
            color: #fff;
          }
        }
      }
    }
  }
  .append-box {
    display: inline-block;
    max-width: 600px;
    height: 360px;
    margin: 100px auto 0;
    box-sizing: border-box;
    background-color: #fff;
    .root-append-box {
      padding: 50px 0;
      div {
        width: 600px;
        height: 60px;
        line-height: 60px;
        margin: 0 auto;
        text-align: center;
        label {
          display: inline-block;
          width: 100px;
          height: 100%;
        }
        input {
          width: 300px;
          height: 30px;
          padding-left: 10px;
          margin-left: 30px;
          border-radius: 5px;
          box-sizing: border-box;
          transition: all 0.3s;
          border: 1px solid @bold-line-color;
          &:focus {
            border-color: rgba(0, 0, 0, 0.6);
            box-shadow: 0 0 3px @bold-line-color;
          }
        }
      }
    }
    .btns {
      display: block;
      width: 600px;
      height: 40px;
      line-height: 40px;
      margin: 5px auto 0;
      text-align: center;
      button {
        width: 80px;
        height: 40px;
        line-height: 40px;
        border: none;
        outline: none;
      }
      .confirm-btn {
        margin-right: 10px;
        &:hover {
          background-color: @main-color;
          color: #fff;
        }
      }
      .close-btn {
        &:hover {
          background-color: @danger-color;
          color: #fff;
        }
      }
    }
  }
}
</style>