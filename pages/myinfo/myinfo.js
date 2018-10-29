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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
