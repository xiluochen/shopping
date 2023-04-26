// pages/home/home.js
import { helps } from '../../static/datas/data';
const global = getApp();
const {baseUrl} = global.globalData;
Page({
  data: {
    swiperData:[],
    recommend:[],
    userInfo:{},
    isListShow:false,
    helps: helps.map(item=>({isChecked: false, ...item}))
  },
  handlerNavigate(e){
    const {target} = e.target.dataset;
    const { userInfo } = this.data;
    this.setData({
      isListShow: false
    });
    if(target.indexOf('shopcar')&&userInfo.username){
      wx.navigateTo({
        url: target,
      })
    }
  },
  handlerIconShow(){
    const { isListShow } = this.data;
    this.setData({
      isListShow: !isListShow
    })
  },
  handlerGoodDetail(e){
    const { id } = e.target.dataset;
    wx.navigateTo({
      url: '/pages/good/good?id='+id,
    })
  },
  handlerTapNavigate(e){
    const {target} = e.target.dataset;
     wx.navigateTo({
       url: '/pages'+target+target,
     });
  },
  handlerTapHelp(e){
    let oriHelps = [...this.data.helps];
    oriHelps.forEach((item, index)=>{
      if(index == e.target.dataset.index){
        item.isChecked = !item.isChecked;
      }
    });
    this.setData({
      helps:oriHelps
    })
  },
  handlerLoginTap(){
    wx.navigateTo({
      url: '../login/login',
      replace: true,
    })
  },
  handlerLogout(){
    const token = wx.getStorageSync('token');
    if(token){
      wx.request({
        url: baseUrl+'logout',
        method:'POST',
        header:{
          token
        },
        success: (res)=>{
          if(res.statusCode === 200&&res.data.code === 20000){
            this.setData({
              'userInfo':{}
            })
          }
        }
      })
    }
    
  },
  askUserInfo(){
    const token = wx.getStorageSync('token');
    if(typeof token === 'string'&&token.length>0){
      wx.request({
        url: baseUrl+'user',
        method:'GET',
        header:{
          token
        },
        success:(res)=>{
          if(res.statusCode === 200 && res.data.code === 20000){
            this.setData({
              'userInfo': res.data.data
            })
          }else {
            wx.removeStorageSync('token');
          }
        },
        fail:(err)=>{
          wx.removeStorageSync('token');
        }
      })
    }
  },
  askSwiper(){
    wx.request({
      url: baseUrl+'swiper',
      method:'GET',
      success:(res)=>{
        if(res.statusCode === 200 && res.data.code === 20000){
          this.setData({
            swiperData: res.data.data.map(item=>({id:item._id, ...item}))
          })
        }
      }
    });
  },
  askRecommend(){
    const token = wx.getStorageSync('token');
    wx.request({
      url: baseUrl+'recommend',
      method:'GET',
      header:{
        token
      },
      success: (res)=>{
        if(res.statusCode === 200 && res.data.code === 20000){
          this.setData({
            recommend: res.data.data.map(item=>({id:item.id,...item}))
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('token')){
      this.askUserInfo();
    }
    this.askSwiper();
    this.askRecommend();
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