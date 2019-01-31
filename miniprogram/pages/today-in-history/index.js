// pages/today-in-history/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 1990,
    month: 1,
    day: 1,
    list: [],
    show: false,
    currentDate: Date.now()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    this.setData({
      year,
      month,
      day
    });
    this.doGetList();
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 监听日期选择
   */
  onChangeDate: function() {
    this.setData({
      show: true
    });
  },

  /**
   * 监听取消
   */
  onCancel: function() {
    this.setData({
      show: false
    });
  },

  /**
   * 监听确定
   */
  onConfirm: function(event) {
    console.log(event.detail)
    const date = new Date(event.detail);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      year,
      month,
      day,
      show: false
    });
    this.doGetList();
  },

  /**
   * 监听用户分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '快来看看历史上的今天发生的事件',
      path: '/pages/today-in-history/index'
    }
  },

  /**
   * 执行数据获取
   */
  doGetList: function() {
    const {
      month,
      day
    } = this.data;
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
        name: 'todayInHistory',
        data: {
          month,
          day
        }
      }).then(res => {
        wx.hideLoading();
        console.log(res);
        let list = res.result.reverse();
        this.setData({
          list
        });
      })
      .catch(console.error)
  }
})