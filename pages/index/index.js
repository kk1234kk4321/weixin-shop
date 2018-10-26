//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    userType: app.globalData.userType,
    openType: app.globalData.openType
  },
  changeData() {
    this.setData({
      openType: app.globalData.openType
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function() {
    var that = this;
    wx.onSocketMessage((res) => {
      console.log("收到的数据", res.data);
      var resdata = JSON.parse(res.data);
      switch (resdata.cmd) {
        case 101:
          app.globalData.openId = resdata.openId;
          app.globalData.userType = resdata.userType;
          break;
        // case 110: //已签约
        //   app.globalData.openId = resdata.openId;
        //   app.globalData.userType = resdata.userType;
        //   that.setData({
        //     userType: resdata.userType
        //   })
        //   console.log("签约openID:", app.globalData.openId);
        //   var openType = app.globalData.openType;
        //   break;
        case 201:
          console.log("购物开门")
          wx.navigateTo({
            url: '/pages/open-over/open-over?status=' + resdata.status + '&cmd=201',
          });
          break;
        case 301:
          console.log("补货开门")
          wx.navigateTo({
            url: '/pages/open-over/open-over?status=' + resdata.status + '&cmd=301',
          });
          break;
        case 210:
          console.log("购物关门")
          wx.navigateTo({
            url: '/pages/shopping-over/shopping-over?status=' + resdata.status + '&cmd=210',
          });
          break;
        case 310:
          console.log("补货关门")
          wx.navigateTo({
            url: '/pages/replenish-over/replenish-over?status=' + resdata.status + '&cmd=310',
          });
          break;
        default:
          app.globalData.openId = resdata.openId;
          app.globalData.userType = resdata.userType;
          that.setData({
            userType: resdata.userType
          })
          console.log("签约openID:", app.globalData.openId);
          var openType = app.globalData.openType;
          break;
      }
    })

  },
  toMyinfo(e){
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})