const app = getApp();
var resultList = require("../add-replenish/replenish-data.js");
Page({
  onLoad() {
    var that = this;
    console.log('补货列表请求，openId===>', app.globalData.openId)
    wx.request({
      url: 'http://erp.zhangyuanzhineng.com:8080/erpLife/out/userSupplyQuery.do',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        openId: app.globalData.openId,
      },
      success: function (res) {
        console.log("res====>", res);
        that.setData({
          array: res.data.list
        })
      },
      fail: function (res) {
        console.log("fail reson:", res);
        if (res.error == 12 || res.error == 13) {
          wx.alert({
            content: '网络出错或超时，请稍候重试！',
          });
        } else {
          wx.alert({
            content: '操作失败，请重新操作！',
          });
        }
      },
    });

    /*this.setData({
        array:resultList.result
    });*/
  },
  open() {
    let msg = {
      "authcode": app.globalData.authCode,
      "timestamp": Date.parse(new Date()),
      "keepTime": "3600",
      "deviceId": app.globalData.deviceId,
      "boxId": app.globalData.boxId,
      "cmd": 300,//补货开门
    };
    wx.sendSocketMessage({
      data: JSON.stringify(msg)
    });
  },
  detail(e) {
    console.log("准备进入补货订单明细页面====", e);
    var id = e.currentTarget.dataset.replenishId;
    wx.navigateTo({
      url: `/pages/replenish-detail/replenish-detail?supplyId=` + id,
    });
  }
});