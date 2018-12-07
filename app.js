//app.js
App({
  onLaunch: function (option) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('getSystemInfoSync', wx.getSystemInfoSync());
    console.log('SDKVersion', wx.SDKVersion);

    if (option.query && option.query.q) {
      var link = decodeURIComponent(option.query.q);
      console.log("参数link", link);
      if (link) {
        var regex = /\/deviceId\/(\S*)\/openType/;
        var result;
        if ((result = regex.exec(link)) != null) {
          this.globalData.deviceId = result[1];
        }
      }
    }
    console.log("参数deviceId", this.globalData.deviceId);


    wx.connectSocket({
      //url: 'ws://localhost:8080/WebsocketHome/actions', // 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
      //url: 'ws://222.186.101.234:8090/erpLife/socket/websocket'
      //url: 'ws://192.168.1.115:8080/erpLife/socket/websocket'
      url: 'ws://117.89.132.47:8088/erpLife/socket/websocket'
    })
  },

  onShow(res) {
    if (res.scene === 1038) { // 场景值1038：从被打开的小程序返回
      const {
        appId,
        extraData
      } = res.referrerInfo
      if (appId == 'wxbd687630cd02ce1d') { // appId为wxbd687630cd02ce1d：从签约小程序跳转回来
        if (typeof extraData == 'undefined') {
          // TODO
          // 客户端小程序不确定签约结果，需要向商户侧后台请求确定签约结果
          return;
        }
        if (extraData.return_code == 'SUCCESS') {
          // TODO
          // 客户端小程序签约成功，需要向商户侧后台请求确认签约结果
          var contract_id = extraData.contract_id;
          this.globalData.agreement_no = contract_id;
          let msg = {
            "authcode": this.globalData.authcode,
            "sign_time": Date.parse(new Date()),
            "agreement_no": contract_id,
            "userid": this.globalData.userid,
            "cmd": 2102,
          };
          console.log("发送cmd2102|签约成功", msg);
          wx.sendSocketMessage({
            data: JSON.stringify(msg)
          });

          return;
        } else {
          // TODO
          // 签约失败
          return;
        }
      }
    }



    wx.onSocketClose((res) => {
      console.log('服务器通信异常！');
    });

    wx.onSocketOpen((res) => {
      console.log("连接已经打开", res);
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 userid, sessionKey, unionId
          if (res.code) {
            var code = res.code
            this.globalData.authcode = code;
            let msg = {
              "authcode": code,
              "deviceId": this.globalData.deviceId,
              "boxId": this.globalData.boxId,
              "cmd": 2100 //扫码进入小程序，传递auth_code
            }
            this.globalData.authcode = code;
            console.log("发送cmd2100|扫码", msg);
            wx.sendSocketMessage({
              data: JSON.stringify(msg),
              success: (res) => {
                console.log("send cmd2100 success");
              },
              fail: (res) => {
                console.log("send cmd2100 fail", res);
              }
            });
          }
        }
      })
    })

    wx.onSocketError(function(res) {
      console.log('服务器连接失败！' + res);
    });
  },

  onHide() {
    console.log('App Hide');
  },

  globalData: {
    authcode: "",
    deviceId: "",//"100200100001", //99872212,
    boxId: 1,
    userid: "", //"2088902710839148",//"2088112422848101",
    userType: 0,
    openType: '', //"palm",
    agreement_no: '',
    erpUrl: "https://erp.zhangyuanzhineng.com",
    loadover: false,
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
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
            wx.alert("user", res.userInfo)
          }
        })
      }
    }
  }
})