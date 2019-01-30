// pages/dream/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    currentCategory: {},
    searchStr: '',
    activeNames: ['1'],
    resultList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.doGetCategory();
  },

  onSearch: function (event) {
    const { searchStr, currentCategory } = this.data;
    this.setData({
      activeNames: []
    });
    if (searchStr) {
      wx.cloud.callFunction({
        name: 'dreamQuery', 
        data: {
          q: searchStr,
          cid: currentCategory.id || ''
        }
      }).then(res => {
        const list = res.result;
        this.setData({
          resultList: list
        })
      })
    }
  },

  onSearchChange: function (event) {
    const value = event.detail;
    this.setData({
      searchStr: value
    });
  },

  onActiveChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  onTagClick: function(event) {
    const id = event.currentTarget.dataset.id;
    const {
      categoryList: list,
      currentCategory: current
    } = this.data;
    if (current && id === current.id) {
      this.setData({
        currentCategory: null
      });
      return ;
    }
    const target = list.find(item => item.id === id);
    this.setData({
      currentCategory: target
    })
  },

  doGetCategory: function() {
    wx.cloud.callFunction({
      name: 'dreamCategory'
    }).then(res => {
      const list = res.result
      this.setData({
        categoryList: list
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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