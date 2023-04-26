<template>
  <div class="user-control-container">
    <div class="user-control-wrapper">
      <div class="control-tits-box">
            <div class="select-ops-show " :style="{width:'20%'}">
              <div 
                class="delete-selected-icon"
                :style="{
                  height:(selected.length>0)?'40px':'0px',
                  lineHeight:(selected.length>0)?'40px':'0px',
                  borderColor:(selected.length>0)?'@light-line-color':'#fff',
                  transition: 'all .5s'
                  // transform: (selected.length>0)?'translateY(0%)':'translateY(-100%)',
                }"
                @click="handlerDeleteTrige"
              >
                <span class="iconfont icon-shanchu">                  
                </span>
              </div>
              <div 
                class="append-icon"
                @click="handlerAppend"
              >
                <span class="iconfont icon-tianjia"></span>
              </div>
            </div>
            <div class="name" :style="{width:'20%'}">用户名</div>
            <div class="status" :style="{width:'20%'}">用户身份</div>
            <div class="create-time" :style="{width:'20%'}">电话号</div>
            <div class="opts" :style="{width:'20%'}">操作</div>
      </div>
      <div class="users-box">
        <ul v-if="users.length>0">
          <li v-for="user,index in users" :key="user.id">
            <div class="checked" :style="{width:'20%'}"><input type="checkbox" @change="handlerUserSelected($event, user.id)" /></div>
            <div class="name" :style="{width:'20%'}">{{ user.name }}</div>
            <div class="status" :style="{width:'20%'}">{{ user.status }}</div>
            <div class="create-time" :style="{width:'20%'}">{{ user.phone }}</div>
            <div class="opts" :style="{width:'20%'}">
              <div class="edit transition-threes" @click="handlerEditRootTrige($event, user.id)"><span class="transition-threes iconfont icon-xiugai"></span></div>
              <div class="delete transition-threes" @click="handlerDeleteTrige($event, user.id)"><span class="transition-threes iconfont icon-shanchu"></span></div>
            </div>
          </li>
        </ul>
        <div class="users-box-no" v-else>无</div>
        <PageNavigation :endPage="totalPage" :nowPage="page" :changePageCallback="handlerChangePage" />
      </div>
    </div>
    <Teleport to="body">
        <div 
          class="mask" 
          :style="{
            display:maskInfo.opCode>0?'block':'none',
          }"
        >
            <div 
              class="edit-box"
              :style="{
                  display:maskInfo.opCode===1?'block':'none'
              }"     
            >
                <TitComponent title="修改权限" />
                <div class="roots-wrapper">
                  <div class="roots-list">
                    <RootList 
                      v-if="roots.length>0"
                      v-for="root,index in roots"  
                      :root="root"
                      :askRoots="askRoots"
                      :handlerDelete="handlerEditDelete"
                      :fontSize="14"
                      :lineHeight="20"
                      :focus="false"
                    />
                    <div v-else class="no-roots">
                        暂无权限
                        <button 
                          class="append-whole"
                          @click="handlerWholeRoot"
                        >
                          点此处添加
                        </button>
                    </div>
                  </div>
                </div>
                <div class="btns">
                  <button class="confirm-btn transition-threes" @click="triggerSave">保存</button>
                  <button class="close-btn transition-threes" @click="triggerMaskHidden">关闭</button>
                </div>
            </div>
            <div 
                class="delete-tip"
                :style="{
                    display:maskInfo.opCode===2?'block':'none'
                }"  
            >
                <TitComponent title="删除确认" />
                <div class="delete-body">
                    是否确认删除{{ maskInfo.tag===1?'当前用户':'所选用户' }}?
                    <div class="btns">
                        <div class="confirm">
                            <button @click="handlerDelete(maskInfo.tag)">删除</button>
                        </div>
                        <div class="cancel">
                            <button  @click="triggerMaskHidden">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <div 
              class="append-tip"
              :style="{
                display:maskInfo.opCode ===3?'block':'none'
              }"
            >
              <TitComponent title="添加用户" />
              <div class="append-body">
                <div class="input-box">
                  <label>用户名:</label>
                  <input type="text" v-model="maskInfo.detail.name" />
                </div>
                <div class="input-box">
                  <label>用户身份:</label>
                  <input type="number" v-model="maskInfo.detail.status" />
                </div>
                <div class="input-box">
                  <label>密码:</label>
                  <input type="password" v-model="maskInfo.detail.pwd" />
                </div>
                <div class="btns">
                  <button class="append-btn" @click="handlerAppendUser">添加</button>
                  <button class="cancel-btn" @click="triggerMaskHidden">取消</button>
                </div>
                
              </div>
            </div>
        </div>
      </Teleport>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import MD5 from 'MD5';
    import { inject, nextTick, onMounted, reactive, watch } from '@vue/runtime-core';
    import { 
            requireGetUsers, requireGetUserPages, 
            requireDeleteUsers, requireUpdateRoot
          } from '@/static/axios';
    import RootList from '@/components/RootList/index.vue' 
    import PageNavigation from '@/components/PageNavigation';
    import TitComponent from '@/components/TitComponent';
    import { requireAppendUser } from '@/static/axios';
    import { requireGetRoots } from '@/static/axios';

      const users = ref([]);

      const oriRoots = ref([]);

      const roots = ref([]);

      const page = ref(1);

      const totalPage = ref(1);

      const selected = ref([]);

      const maskInfo = reactive({
        id:'',
        opCode:0,
        detail:{},
        tag:-1,
      });

      const baseRoots = inject('initRoots');

      const askRoots = inject('askRoots');

      const splitRoots = inject('splitRoots');

      const askTotalPage = async ()=>{
        let res = await requireGetUserPages();
        if(res.status === 200 && res.data.code === 20000){
          totalPage.value = Number(res.data.data);
        }
      }

      const askUsers = async (page)=>{
        let res = await requireGetUsers({
          page
        });
        if(res.status === 200 && res.data.code === 20000){
          users.value = res.data.data.map(item=>({id:item._id, ...item}));
        }
      }

      const checkChecked = (obj, target=[])=>{
        if(target.length===0)return;
        obj.forEach((item)=>{
          target.forEach((t)=>{
            if(t.title===item.title){
              item.isChecked = true;
              if(t.children) {
                checkChecked(item.children, t.children);
              }  
            }
          })
        })
      }

      const triggerMaskShow = async(opCode, id, tag='')=>{
        if(opCode===3){
          maskInfo.opCode = opCode;
          maskInfo.detail = {
              name:'',
              status:'',
              pwd:'',
          }
          return;
        }
        
        maskInfo.id = id;
        maskInfo.detail = users.value.find(item=>item.id===id);
        if(opCode===2)maskInfo.tag = tag;
        if(opCode == 1){
          await askUserRoot();
        }
        maskInfo.opCode = opCode;
      }

      const triggerMaskHidden = ()=>{
        if(maskInfo.opCode===1){
          roots.value = baseRoots;
        }
        maskInfo.opCode = 0;
        maskInfo.triggerSaveid = '';
        maskInfo.detail = {};
        maskInfo.tag = -1;
      }

      const triggerSave = async ()=>{
        const res = await requireUpdateRoot({
          id: maskInfo.id,
          roots: oriRoots.value.reduce((prev, item)=>{
            prev.push(item._id);
            return prev;
          }, [])
        })
        if(res.status === 200&& res.data.code === 20000){
            triggerMaskHidden();
        }
      }

      const handlerChangePage = (oldPage, newPage)=>{
        page.value = newPage;
      }

      const handlerUserSelected = (event, id)=>{
        if(event.target.checked){
          selected.value.push(id);
        }else {
          let index = selected.value.indexOf(id);
          selected.value.splice(index,1);
        }
      }

      const handlerEditRootTrige = (event, id)=>{
        triggerMaskShow(1, id);
      }

      const handlerDeleteTrige = (event,id='')=>{
        (!id)?triggerMaskShow(2, id, 0):triggerMaskShow(2, id, 1);
      }

      const handlerAppend = (event)=>{
        triggerMaskShow(3, '', 0);
      }

      const handlerAppendUser = async()=>{
        if(maskInfo.detail.name&&maskInfo.detail.pwd&&maskInfo.detail.status){
          maskInfo.detail.status = String(maskInfo.detail.status);
          maskInfo.detail.pwd = MD5(maskInfo.detail.pwd);
          let res = await requireAppendUser({
            userInfo: maskInfo.detail
          });
          if(res.status === 200 && res.data.code === 20000){
            askTotalPage().then(()=>{
              askUsers(page.value);
              triggerMaskHidden()
            });
          }
        }else {
          triggerMaskHidden()
        }
      }

      const handlerEditDelete = async(event, id)=>{
        oriRoots.value = oriRoots.value.filter((item)=>(item._id!==id));
      }
 
      const handlerDelete = async (op)=>{
        let ids = [];
        if(op===0){
          ids.push(...selected.value);
        }else {
          ids.push(maskInfo.id);
        }
        let res = await requireDeleteUsers({ ids });
        if(res.status === 200 && res.data.code===20000){
          if(op === 0){
            selected.value.length = 0;
          }else {
            selected.value = selected.value.splice(selected.value.indexOf(maskInfo.id),1);
          }
          askTotalPage().then(()=>{
            if(page.value>totalPage.value)
              page.value=totalPage.value;
            askUsers(page.value);
            triggerMaskHidden()
          });
        }
      }

      const handlerWholeRoot = ()=>{
        nextTick(()=>{
          oriRoots.value = baseRoots.value;
        })
      }

      const askUserRoot = async()=>{
        const res = await requireGetRoots({
          userId: maskInfo.id
        });
        if(res.status === 200 && res.data.code === 20000){
          roots.value = splitRoots(res.data.data);
          oriRoots.value = res.data.data;
        }
      }

      watch(page, ()=>{askUsers(page.value)});
      watch(()=>oriRoots.value, ()=>{roots.value = splitRoots(oriRoots.value)});

      onMounted(()=>{
        askTotalPage();
        askUsers(page.value);
      })
</script>

<style lang="less" scoped>
  @import url('@/basic_var.less');
    .user-control-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-shadow: 0 0 5px @bold-line-color;
      .user-control-wrapper {
        .control-tits-box {
          height: 80px;
          line-height: 80px;
          border-bottom: 1px solid @bold-line-color;
          div {
            float: left;
            height: 100%;
            box-sizing: border-box;
            text-align: center;
            font-size: 18px;
            &.select-ops-show {
              height: 40px;
              margin-top: 20px;
              padding-left: 5%;
              overflow: hidden;
              &>div{
                  width: 40px;
                  text-align: center;
                  border-radius: 50%;
                  overflow: hidden;
                  border: 1px solid;
              }
                .delete-selected-icon {
                  span {
                    font-size: 18px;
                    transition:all .5s;
                    color: @bold-line-color;
                  }
                  &:hover {
                    border-color: @danger-color!important;
                    span {
                      color: @danger-color;
                    }
                  }
                }
                .append-icon {
                  height: 40px;
                  line-height: 40px;
                  transition: all .5s;
                  border-color: #fff;
                  span {
                    font-size: 18px;
                    transition:all .5s;
                    color: @bold-line-color;
                  }
                  &:hover {
                    border-color: @light-color!important;
                    span {
                      color: @light-color;
                      transform: scale(1.1);
                    }
                  }
                }
            }
          }
        }
        .users-box {
          ul {
            li {
              height: 110px;
              line-height: 110px;
              box-sizing: border-box;
              border-bottom: 1px solid @light-line-color;
              &:hover {
                background-color: @light-line-color;
              }
              div {
                float: left;
                height: 100%;
                box-sizing: border-box;
                text-align: center;
                &.opts {
                  div {
                    float: left;
                    margin: 0 10px;
                    span {
                      font-size: 20px;
                    }
                    &.edit{
                      margin-left: 33%;
                      &:hover  {
                      transform: scale(1.2);
                      span{
                        color: @main-color;
                      }
                    }
                    }
                    &.delete:hover {
                      transform: scale(1.2);
                      span {
                        color: @danger-color;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .users-box-no {
          width: 100%;
          height: 200px;
          line-height: 200px;
          font-size: 18px;
          border-bottom: 1px solid rgba(0,0,0,.3);
          text-align: center;
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
            display: inline-block;
            max-width: 600px;
            height: 400px;
            margin: 100px auto 0;
            box-sizing: border-box;
            background-color: #fff;
            .roots-wrapper {
              height: 300px;
              margin: 0 50px;
              &>div {
                float: left;
                width: 500px;
                height: 300px;
                box-sizing: border-box;
                border-bottom: 1px solid @light-line-color;
              }
              .roots-list {
                padding: 1% 0;
                box-sizing: border-box;
                overflow: auto;
                .no-roots {
                  width: 100%;
                  height: 200px;
                  line-height: 200px;
                  text-align: center;
                  font-size: 18px;
                  button {
                    display: inline-block;
                    background-color: transparent;
                    font-size: 14px;
                    cursor: pointer;
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }
              }
            }
            .btns {
              display: block;
              width: 100%;
              height: 40px;
              line-height: 40px;
              text-align: center;
              margin: 5px auto 0;
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
                            background-color: @danger-color;
                        }
                        &:hover {
                            box-shadow: 0 0 3px @bold-line-color;
                        }
                    }
                }
            }
        }
        .append-tip {
          width: 600px;
          margin: 100px auto 0;
          background-color: #fff;
          .append-body {
            display: inline-block;
            width: 100%;
            margin-top: 20px;
            .input-box {
              width: 100%;
              height: 60px;
              margin: 10px 0;
              text-align: center;
              label {
                display: inline-block;
                width: 100px;
                height: 60px;
                text-align: center;
              }
              input {
                display: inline-block;
                width: 200px;
                height: 30px;
                box-sizing: border-box;
                margin-left: 10px;
                padding: 5px 10px;
                border-radius: 5px;
                box-shadow: 0 0 3px @light-line-color;
                &:focus {
                box-shadow: 0 0 5px @bold-line-color;
                }
                &[type='number']{
                  &::-webkit-outer-spin-button,
                  &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                  }
                  appearance: textfield;
                }
              }
            }
            
            .btns {
              width: 100%;
              height: 60px;
              padding: 10px 0;
              margin: 10px 0;
              text-align: center;
              button {
                width: 60px;
                height: 40px;
                margin-right: 20px;
                color: #ccc;
                background-color: transparent;
                transition: all .3s;
                border: 1px solid transparent;
                &.append-btn:hover {
                  background-color: @light-color;
                  color: #fff;
                  border-color: @light-color;
                }
                &.cancel-btn:hover {
                  color: #aaa;
                  border-color: #aaa;
                }
              }
            }
          }
        }
    }
</style>