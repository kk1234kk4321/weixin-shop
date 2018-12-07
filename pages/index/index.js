//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userid: app.globalData.userid,
    openType: app.globalData.openType,
    loadover: app.globalData.loadover,
    signstr: '',
    contract_code: "",
    request_serial: "",
    timestamp: ""
  },
  changeData() {
    this.setData({
      openType: app.globalData.openType,
      loadover:app.globalData.loadover
    })
  },

  dd: function(signstr) {
    this.signstr = signstr;
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
        case 2101:
          this.setData({
            loadover: true
          })
          app.globalData.loadover=true;
          app.globalData.userid = resdata.userid;
          app.globalData.userType = resdata.userType;
          this.data.contract_code = resdata.contract_code;
          this.data.request_serial = resdata.request_serial;
          this.data.timestamp = resdata.timestamp;
          this.data.signstr = resdata.signstr;
          console.log(resdata);
          break;
        case 2110: //已签约
          this.setData({

            loadover: true
          })
          app.globalData.loadover = true;
          console.log("loadover===>", app.globalData.loadover)
          app.globalData.userid = resdata.userid;
          app.globalData.userType = resdata.userType;
          app.globalData.agreement_no = resdata.agreement_no;
          that.setData({
            userType: resdata.userType
          })
          break;
        case 2201:
          console.log("购物开门成功")
          wx.navigateTo({
            url: '/pages/open-over/open-over?status=' + resdata.status + '&cmd=2201',
          });
          break;
        case 2301:
          console.log("补货开门")
          wx.navigateTo({
            url: '/pages/open-over/open-over?status=' + resdata.status + '&cmd=2301',
          });
          break;
        case 2210:
          console.log("购物关门成功")
          wx.navigateTo({
            url: '/pages/shopping-over/shopping-over?status=' + resdata.status + '&cmd=2210',
          });
          break;
        case 2310:
          console.log("补货关门")
          wx.navigateTo({
            url: '/pages/replenish-over/replenish-over?status=' + resdata.status + '&cmd=2310',
          });
          break;
        default:
          app.globalData.userType = resdata.userType;
          that.setData({
            userType: resdata.userType
          })
          console.log("签约userid:", app.globalData.userid);
          var openType = app.globalData.openType;
          break;
      }
    })

  },
  toMyinfo(e) {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    });
  },
  toWebSocket(e) {
    console.log("agreement_no:" + app.globalData.agreement_no);
    if (app.globalData.agreement_no == "") {
      var contract_code = this.data.contract_code;
      var request_serial = this.data.request_serial;
      var timestamp = this.data.timestamp;
      var sign = this.data.signstr;
      wx.navigateToMiniProgram({
        appId: 'wxbd687630cd02ce1d',
        path: 'pages/index/index',
        extraData: {
          appid: 'wx0dcf16c6bf96bbb6',
          contract_code: contract_code,
          contract_display_account: '微信用户',
          mch_id: '1502097461',
          notify_url: 'https://www.qq.com/test/papay',
          plan_id: '122965',
          request_serial: request_serial,
          timestamp: timestamp,
          sign: sign
        },
        success(res) {
          console.log(res)
        },
        fail(res) {
          console.log(res)
          // 未成功跳转到签约小程序 
        }
      })
    } else {
      let msg = {
        "authcode": app.globalData.authcode,
        "timestamp": Date.parse(new Date()),
        "expiretime": 600,
        "deviceId": app.globalData.deviceId,
        "boxId": app.globalData.boxId,
        "cmd": 2200,
        "agreement_no": app.globalData.agreement_no,
        "userid": app.globalData.userid
      };
      console.log("发送cmd2200|购物开门", msg);
      wx.sendSocketMessage({
        data: JSON.stringify(msg)
      });
    }
  },
  onLoad: function(res) {
    this.changeData();
    console.log("loadover===>", app.globalData.loadover)
  },
  toReplenish(e) {
    wx.navigateTo({
      url: '/pages/add-replenish/add-replenish',
    })
  },
  toOrder() {
    wx.navigateTo({
      url: '/pages/add-order/add-order',
    });
  }
})