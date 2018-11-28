// pages/myinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: app.globalData.userid,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      userid: app.globalData.userid
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
copyCode(e){
 wx.setClipboardData({
   data: this.data.userid,
   success(res){
     wx.getClipboardData({
       success(res){
         console.log("userid=", res.data)
       }
     })
   
   }
 })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '我的信息'
    });
  },
  onGotUserInfo: function (e) {
    this.setData({

    })
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
})
