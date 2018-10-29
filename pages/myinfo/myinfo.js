// pages/myinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: app.globalData.openId,
    userType:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      openId: app.globalData.openId
    });
    app.getUserInfo().then(user => this.setData({
      user,
    }), );
  },

  toOrder(e){
    wx.navigateTo({
      url:'/pages/add-order/add-order',
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '我的信息'
    });
  }
})
