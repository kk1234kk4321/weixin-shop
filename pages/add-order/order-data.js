var orderData = [
  {
    "orderId": "145562526094987265",
    "orderTime": "2017-12-07 16:13:30",
    "isOrder": 1,
    "orderList": [
      {
        "id": "11111",
        "goodsName": "乐事薯片（黄瓜味）",
        "unitPrice": 0.01,
        "count": 2,
        "totalPrice": 0.02,
        "isBack": 0
      },
      {
        "id": "11111",
        "goodsName": "乐事薯片（意大利香浓红烩味）",
        "unitPrice": 0.01,
        "count": 2,
        "totalPrice": 0.02,
        "isBack": 0
      }
    ],
    "totalCount": 2,
    "sumPrice": 0.02
  },
  {
    "orderId": "145562526094987265",
    "orderTime": "2017-12-07 16:13:30",
    "isOrder": 1,
    "orderList": [
      {
        "id": "11111",
        "goodsName": "乐事薯片（黄瓜味）",
        "unitPrice": 0.01,
        "count": 1,
        "totalPrice": 0.01,
        "isBack": 0
      },
      {
        "id": "11111",
        "goodsName": "乐事薯片（意大利香浓红烩味）",
        "unitPrice": 0.01,
        "count": 1,
        "totalPrice": 0.01,
        "isBack": 2
      }
    ],
    "totalCount": 2,
    "sumPrice": 0.02
  },
  {
    "orderId": "145562526094987265",
    "orderTime": "2017-12-07 16:13:30",
    "isOrder": 1,
    "orderList": [
      {
        "id": "11111",
        "goodsName": "乐事薯片（黄瓜味）",
        "unitPrice": 0.01,
        "count": 1,
        "totalPrice": 0.01,
        "isBack": 0
      },
      {
        "id": "11111",
        "goodsName": "乐事薯片（意大利香浓红烩味）",
        "unitPrice": 0.01,
        "count": 1,
        "totalPrice": 0.01,
        "isBack": 1
      }
    ],
    "totalCount": 2,
    "sumPrice": 0.02
  }
]

module.exports = { result: orderData }

//isBack:0=申请退款；1=退款中；2=退款成功
//isOrder:1=支付成功；0=支付失败