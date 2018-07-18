//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
  },
  handleClick(){
    wx.switchTab({
      url: '/pages/user/list',
    })
  },
  //事件处理函数
  onLoad: function (options) {
    wx.getUserInfo({
      success: (data) => {
        this.setData({
          userInfo: data.userInfo
        })
      }
    })
  }
})
