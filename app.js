//app.js
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this;
        if (res.code) {
          var code = res.code
          wx.request({
            url: "http://192.168.1.185:8080" + '/weixin/jscode/' + res.code,
            data: {},
            method: 'GET',
            success: function (res) {
              console.log('返回openId')
              console.log(res.data)
              that.globalData.openId = res.data  
              console.log("啦啦啦")   

              let msg = {
                "authcode": code,
                "deviceId": that.globalData.deviceId,
                "boxId": that.globalData.boxId,
                "cmd": 100 //扫码进入小程序，传递auth_code
              }
              that.globalData.authCode = code;
              console.log("发送cmd100|扫码", msg);
              wx.sendSocketMessage({
                data: JSON.stringify(msg),
                success: (res) => {
                  console.log("send cmd100 success");
                },
                fail: (res) => {
                  console.log("send cmd100 fail", res);
                }
              });
            },
            fail: function (res) {
              console.log("获取OPENID失败，", res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    //console.log('启动参数：'+JSON.stringify(options.query));
    console.log('启动参数:App Launch', options);
    if (options.query) {
      if (options.query.deviceId) {
        this.globalData.deviceId = options.query.deviceId;
      }
      if (options.query.openType) {
        this.globalData.openType = options.query.openType;
      }
      console.log("参数deviceId", this.globalData.deviceId);
      console.log("参数openType", this.globalData.openType);
    }
    console.log('getSystemInfoSync', wx.getSystemInfoSync());
    console.log('SDKVersion', wx.SDKVersion);

    wx.connectSocket({
      //url: 'ws://localhost:8080/WebsocketHome/actions', // 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
      //url: 'ws://222.186.101.234:8090/erpLife/socket/websocket'
      //url: 'ws://192.168.1.115:8080/erpLife/socket/websocket'
      url: 'ws://erp.zhangyuanzhineng.com:8080/erpLife/socket/websocket'
    })
  },

  onHide() {
    console.log('App Hide');
  },

  globalData: {
    authCode: "",
    deviceId: "100200100002",//99872212,
    boxId: 1,
    openId: "",//"2088902710839148",//"2088112422848101",
    userType: 0,
    openType: '',//"palm"
    
  },
  userInfo: null,

  //获取用户信息
  getUserInfo() {
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    }
  }
})