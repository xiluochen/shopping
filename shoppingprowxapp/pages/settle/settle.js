// pages/settle/settle.js
const app = getApp();
const { baseUrl } = app.globalData;
let timer=null;
const computedBehavior = require("miniprogram-computed").behavior;
Page({
  behaviors:[computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    locs:[],
    goods:[],
    time: 300,
  },

  computed: {
    minutes(data){
      let minu = Math.floor(data.time/60);
      if(minu<10)return '0'+minu;
      return minu;
    },
    seconds(data){
      let sec = data.time%60;
      if(sec<10)return '0'+sec;
      return sec;
    }
  },
  handlerLocTap(e){
    const { index } = e.currentTarget.dataset;
    let newArr = this.data.locs;
    if(index>=0&&index<newArr.length){
      newArr = [newArr[index], ...newArr.filter((_, ind)=>(ind!==index))] ;
      this.setData({
        locs: newArr
      })
    }
  },

  handlerBuyfor(){
    const { goods } = this.data;
    const token = wx.getStorageSync('token');
    if(goods.length > 0){
      wx.request({
        url:  baseUrl + 'payfor',
        method:'POST',
        header:{
          token
        },
        data: {
          pays: goods
        },
        success(res){
          if(res.statusCode === 200 && res.data.code === 20000){
            wx.navigateTo({
              url: '/pages/payforresult/success',
            })
          }
        }
      })
    }
  },

  askLocs(){
    const token = wx.getStorageSync('token');
    if(token){
      wx.request({
        url: baseUrl + 'user/locs',
        header: {
          token
        },
        success:(res)=>{
          if(res.statusCode === 200 && res.data.code === 20000){
            this.setData({
              locs:res.data.data.map(item=>({id:item._id, ...item}))
            });
            timer = setInterval(()=>{
              if(this.data.time>0){
                this.setData({
                  time: this.data.time-1
                })
              }else {
                wx.navigateBack(-1);
                clearInterval(timer);
              }
              
            }, 1000)
          }
        },
        fail(){
          wx.navigateBack(-1);
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      goods: JSON.parse(decodeURIComponent(options.ids))
    })
    this.askLocs();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})