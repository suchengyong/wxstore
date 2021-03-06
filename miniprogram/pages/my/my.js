// miniprogram/pages/my/my.js
const app = getApp()
const db = wx.cloud.database({
  env: 'boutique10'
})
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: true,
    statusnum: [0, 0, 0, 0],
    manager: ''
  },
  backend: function() {
    wx.redirectTo({
      url: '/manager/index/index',
    })
  },
  gotodetail: function(e) {
    wx.navigateTo({
      url: '../orderlist/orderlist?status=' + e.currentTarget.dataset.status,
    })
  },
  address: function(e) {
    wx.chooseAddress({
      success: res => {
        console.log(res)
      }
    })
  },

  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      manager: app.globalData.userid
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    db.collection('order').get().then(res => {
      let count = [0, 0, 0, 0]
      for (let i of res.data) {
        if (i.status == 0) {
          count[0] += 1
        } else if (i.status == 1) {
          count[1] += 1
        } else if (i.status == 2) {
          count[2] += 1
        } else if (i.status == 3) {
          count[3] += 1
        }
      }
      this.setData({
        statusnum: count
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})