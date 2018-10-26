const app = getApp();

Page({

  data: {
    path: []
  },
  onLoad(res) {

    var addColor = '#A9A9A9';
    var minusColor = '#A9A9A9';
    if (res.currCount < res.count) {
      addColor = 'black';
    }
    if (res.currCount > 0 && res.currCount <= res.count) {
      minusColor = 'black'
    }

    this.setData({
      data: res,
      addColor: addColor,
      minusColor: minusColor,
    });

  },
  add(event) {
    var data = event.target.dataset;
    var count = data.count;
    var unitPrice = data.unitPrice;
    var totalPrice = data.totalPrice;
    var currCount = data.currCount;
    var currPrice = data.currPrice;

    if (currCount < count) {
      currCount = currCount + 1;
      currPrice = parseFloat(currPrice) + parseFloat(unitPrice);
      data.currCount = currCount;
      data.currPrice = currPrice;
      this.onLoad(data);
    }

  },
  minus(event) {
    var data = event.target.dataset;
    var count = data.count;
    var unitPrice = data.unitPrice;
    var totalPrice = data.totalPrice;
    var currCount = data.currCount;
    var currPrice = data.currPrice;

    if (currCount > 0 && currCount <= count) {
      currCount = currCount - 1;
      currPrice = currPrice - unitPrice;
      data.currCount = currCount;
      data.currPrice = currPrice;
      this.onLoad(data);
    }

  },
  formSubmit(e) {
    var formData = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    if (formData.count == 0) {
      wx.alert({
        title: '注意', // alert 框的标题
        content: "退款商品数不能为0",
      });
      return
    }
    if (!formData.userAlipay) {
      wx.alert({
        title: '注意', // alert 框的标题
        content: "请填写接收退款的支付宝账号",
      });
      return
    }
    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var len = formData.paths.length; //总共个数
    var i = 0; //第几个
    if (len > 0) {
      this.uploadDIY(formData.paths, successUp, failUp, i, len, formData);
    }
    var jsonobj = {
      "deviceId": app.globalData.deviceId,
      "backDescr": formData.backDescr,
      "count": formData.count,
      "id": formData.id,
      "orderId": formData.orderId,
      "userAlipay": formData.userAlipay
    }
    wx.request({
      url: 'http://erp.zhangyuanzhineng.com:8080/erpLife/out/userRefund.do',
      data: {
        refundJson: JSON.stringify(jsonobj)
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function () {
        wx.alert({
          title: '退款',
          content: '提交成功',
          buttonText: '确定',
          success: () => {
            wx.navigateTo({
              url: `/pages/add-order/add-order`,
            });
          },
        });
      },
      fail: function (res) {
        //console.log('失败原因：',res.data);
        wx.alert({
          content: '操作失败，请重新操作！'
        });
      }
    });

  },

  /* 函数描述：作为上传文件时递归上传的函数体体；
   * 参数描述： 
   * filePaths是文件路径数组
   * successUp是成功上传的个数
   * failUp是上传失败的个数
   * i是文件路径数组的指标
   * length是文件路径数组的长度
   */
  uploadDIY(filePaths, successUp, failUp, i, length, formData) {
    wx.uploadFile({
      url: 'http://erp.zhangyuanzhineng.com:8080/erpLife/out/userPicUpload.do',
      filePath: filePaths[i],
      fileName: 'uploads',
      fileType: 'image',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        'orderId': formData.orderId,
        'id': formData.id
      },
      success: (res) => {
        successUp++;
        console.log("success" + successUp);
      },
      fail: (res) => {
        failUp++;
        console.log(res);
      },
      complete: () => {
        i++;
        if (i == length) {
          //my.alert({content:'总共'+successUp+'张上传成功,'+failUp+'张上传失败！'});
        }
        else {  //递归调用uploadDIY函数
          this.uploadDIY(filePaths, successUp, failUp, i, length, formData);
        }
      },
    });
  },

  uploadImg() {
    var path = this.data.path;
    wx.chooseImage({
      count: 3 - path.length,
      success: (res) => {
        path = path.concat(res.apFilePaths);
        if (path.length > 3) {
          path = path.slice(0, 3);
        }
        this.setData({
          "path": path
        });
      },
    });
  },

  showImg: function (event) {
    var url = event.target.dataset.url;
    wx.previewImage({
      urls: [
        url
      ],
    });
  },


  removeImg: function (event) {
    var idx = event.target.dataset.idx;
    var path = this.data.path;
    path.splice(idx, 1)
    this.setData({
      "path": path
    });
  }
});