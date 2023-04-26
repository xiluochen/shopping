// pages/payforresult/success.js
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seconds:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    timer = setInterval(()=>{
      const { seconds } = this.data;
      this.setData({
        seconds: seconds-1
      });
      if(seconds === 1){
        wx.navigateTo({
          url: '/pages/home/home',
          replace:true
        })
      }
    }, 1000)
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
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(timer);
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