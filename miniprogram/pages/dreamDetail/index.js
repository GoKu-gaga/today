// pages/dreamDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '加载中...',
    });
    this.doGetDetail(options.id);
  },

  /**
   * 执行获取详情
   */
  doGetDetail: function(dreamid) {
    wx.showLoading();
    wx.cloud.callFunction({
      name: 'dreamDetail',
      data: {
        dreamid
      }
    }).then(res => {
      wx.hideLoading();
      const {
        title,
        list
      } = res.result;
      wx.setNavigationBarTitle({
        title: title,
      })
      this.setData({
        detailList: list
      });
    })
  }
})