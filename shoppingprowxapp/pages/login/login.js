// pages/login/login.js
const global = getApp();
Page({
  data: {
  },
  handlerLoginBtn(e){
    const { baseUrl } = global.globalData;
    const { username, password } = e.detail.value;
    wx.request({
      url: baseUrl + 'login',
      method:'GET',
      data:{
        username,
        password
      },
      success:(res)=>{
        if(res.statusCode === 200 && res.data.code === 20000){
          wx.setStorageSync('token', res.data.token);
          wx.navigateTo({
            url: '/pages/home/home',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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