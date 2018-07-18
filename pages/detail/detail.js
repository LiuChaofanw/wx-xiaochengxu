// pages/detail/detail.js
let datas = require('../../datas/list-data');
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index=options.id;
    let detailObj = datas.list_data[index];
    this.setData({
      index,detailObj
    })

    wx.getStorage({
      key:'isCollected',
      success: (event) => {
        let isCollected = event.data[index]? event.data[index]:false;
        this.setData({
          isCollected
        })
      }
    })
    if(appDatas.data.isPlay && appDatas.data.pageIndex === index){
      this.setData({
        isMusicPlay: true
      })
    }

    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isMusicPlay: true
      })
      appDatas.data.pageIndex = index;
      appDatas.data.isPlay = true
    })

    wx.onBackgroundAudioPause(() => {
      this.setData({
        isMusicPlay: false
      })
      appDatas.data.pageIndex = index;
      appDatas.data.isPlay = false;

    })


  },
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈','分享给微信好友','分享到QQ好友'
      ]
    })
  },
  handleCollection(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    });
    let title = isCollected? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    });
    let obj = wx.getStorageSync('isCollected');
    if(!obj){
      obj = {}
    }
    let index = this.data.index;
    obj[index] = isCollected;
    wx.setStorageSync('isCollected', obj)
  },
  handleMusicPlay(){
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });
    let { dataUrl, title, coverImgUrl } = this.data.detailObj.music;
    if(isMusicPlay){
      wx.playBackgroundAudio({
        dataUrl,title
      })
    }else {
      wx.pauseBackgroundAudio()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})