const app = getApp();
Page({
  data: {},
  onLoad(res) {
    var that = this;
    console.log('补货单详细列表请求，userid===>', app.globalData.userId)
    wx.request({
      url: 'http://erp.zhangyuanzhineng.com:8080/erpLife/out/userSupplyDetailQuery.do',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        supplyId: res.supplyId,
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
    wx.setNavigationBarTitle({
      title: '补货订单明细列表'
    });
  },
});