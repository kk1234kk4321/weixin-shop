const app = getApp();
var resultList = require("../add-order/order-data.js");
Page({
  onLoad() {
    console.log("app.globalData.userid===>", app.globalData.userid);
    var that = this;
    wx.request({
      url: app.globalData.erpUrl+"erpLife/out/wxuserSalesQuery.do",
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        userWxId: app.globalData.userid,
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
          wx.showModal({
            content: '网络出错或超时，请稍候重试！',
          });
        } else {
          wx.showModal({
            content: '操作失败，请重新操作！',
          });
        }
      },
    });
    // this.setData({
    //     array:resultList.result
    // });
    wx.setNavigationBarTitle({
      title: '订单列表'
    });
  },
  backOrker(event) {
    var data = event.target.dataset;
    wx.navigateTo({
      url: '/pages/back-order/back-order?id=' + data.id + '&name=' + data.name +
        '&count=' + data.count + '&unitPrice=' + data.unitPrice +
        '&totalPrice=' + data.totalPrice + '&currCount=' + data.count +
        '&currPrice=' + data.totalPrice + '&orderId=' + data.orderId,
    });
  },
  toBack(e) {
    wx.reLaunch({
      url:"/pages/index/index"
    });
  }
});
