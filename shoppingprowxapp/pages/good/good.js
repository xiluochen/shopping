// pages/good/good.js
const app = getApp()
let timer;
const { baseUrl } = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    detail:{},
    nums:1
  },

  handlerCount(e){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      let{value} = e.detail;
      value = Number(value);
      if(value&&value>0){
        this.setData({
          nums: value
        })
      }else {
        this.setData({
          nums: 1
        })
      }
    }, 500);
  },

  handlerAddShopcar(){
    let { nums, detail } = this.data;
    nums = Number(nums);
    const token = wx.getStorageSync('token');
    if(nums&&nums>0&&token){
      wx.request({
        url: baseUrl+'user/shopcar',
        method:'POST',
        header:{
          token
        },
        data: {
            target: detail.id,
            num:nums,
        },
        success:(res)=>{
          if(res.statusCode === 200 && res.data.code === 20000){
            wx.navigateTo({
              url: '/pages/shopcar/shopcar',
            })
          }
        }
      })
    }else if(!token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    wx.request({
      url: baseUrl+'good/'+options.id,
      success:(res)=>{
        if(res.statusCode === 200 && res.data.code === 20000){
          const { data } = res.data;
          this.setData({
            detail: {id:data._id, ...data}
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

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