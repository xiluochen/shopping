// pages/shopcar/shopcar.js
const app = getApp();
const { baseUrl } = app.globalData;
const computedBehavior = require("miniprogram-computed").behavior;
Page({
  behaviors: [computedBehavior],
  data: {
    shopcarInfos:[],
    isAll: false
  },
  computed: {
    checkInds(data){
      const infos = data.shopcarInfos;
      const ids = infos.filter(item=>(item.isChecked));
      return {
        ids,
        totMoney: ids.reduce((prev,item)=>(prev+item.num*item.target.price), 0),
      }
    }
  },
  handlerBuy(){
    const { checkInds } = this.data;
    if(checkInds.totMoney>0){
      wx.navigateTo({
        url:'/pages/settle/settle?ids='+encodeURIComponent(JSON.stringify(checkInds.ids)),
      });
    }
  },
  handlerCheckChanged(e){
    const { index } = e.target.dataset;
    let infos = this.data.shopcarInfos;
    infos[index].isChecked = !infos[index].isChecked;
    this.setData({
      shopcarInfos: infos,
      isAll:infos.reduce((prev,item)=>(prev+(item.isChecked?1:0)), 0)===infos.length
    });
  },
  handlerCheckedAll(){
    const {isAll} = this.data;
    let infos = this.data.shopcarInfos;
    if(infos.length > 0){
      infos = infos.map(item=>({
        ...item,        
        isChecked:!isAll
      }));
      this.setData({
        shopcarInfos:infos,
        isAll: !isAll
      });
    }
  },

  askShopCar(){
    const token = wx.getStorageSync('token');
    if(token){
      wx.request({
        url: baseUrl+'user/shopcar',
        method:'GET',
        header: {
          token
        },
        success:(res)=>{
          if(res.statusCode === 200&& res.data.code === 20000){
            this.setData({
              shopcarInfos: res.data.data.map(item=>({id:item._id, isChecked:false, ...item})) 
            });
          }
        },
        fail: (err)=>{
          console.log(err);
          if(err.response.data === 'please login'){
            wx.removeStorageSync('token');
          }
          wx.navigateBack(-1);
        }
      })
    }
  },
  onLoad(options) {
      this.askShopCar();
  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  }
})