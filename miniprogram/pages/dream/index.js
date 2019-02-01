// pages/dream/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    currentCategory: {},
    searchStr: '',
    activeNames: ['1'],
    resultList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.doGetCategory();
    wx.showShareMenu({
      withShareTicket: true
    });
  },  
  
  /**
   * 监听用户分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '来看看关于梦的解析',
      path: '/pages/dream/index'
    }
  },

  /**
   * 监听搜索
   */
  onSearch: function (event) {
    const { searchStr, currentCategory } = this.data;
    this.setData({
      activeNames: []
    });
    if (!searchStr) {
      Toast('请输入关键词');
      return ;
    }
    Toast.loading({
      mask: true,
      message: '搜索中...'
    });
    wx.cloud.callFunction({
      name: 'dreamQuery', 
      data: {
        q: searchStr,
        cid: currentCategory.id || ''
      }
    }).then(res => {
      const list = res.result;
      this.setData({
        resultList: list || []
      });
      Toast.clear();
    })
  },

  /**
   * 监听搜索字段改变
   */
  onSearchChange: function (event) {
    const value = event.detail;
    this.setData({
      searchStr: value
    });
  },

  /**
   * 监听展开
   */
  onActiveChange: function (event) {
    this.setData({
      activeNames: event.detail
    });
  },

  /**
   * 监听tag点击
   */
  onTagClick: function(event) {
    const id = event.currentTarget.dataset.id;
    const {
      categoryList: list,
      currentCategory: current
    } = this.data;
    if (current && id === current.id) {
      this.setData({
        currentCategory: {}
      });
      return ;
    }
    const target = list.find(item => item.id === id);
    this.setData({
      currentCategory: target
    })
  },

  /**
   * 执行获取分类
   */
  doGetCategory: function() {
    wx.cloud.callFunction({
      name: 'dreamCategory'
    }).then(res => {
      const list = res.result
      this.setData({
        categoryList: list
      })
    })
  }
})