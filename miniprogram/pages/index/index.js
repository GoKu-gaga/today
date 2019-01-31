// pages/index/index.js
const MENUS = [{
    name: '历史上的今天',
    url: '/pages/today-in-history/index',
    style: 'background-color: #E8D3A9;'
  },
  {
    name: '周公解梦',
    url: '/pages/dream/index',
    style: 'background-color: #D3D5B0;'
  },
  // {name: '今日笑话'},
  // {name: '今日趣图'}
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: MENUS
  }
})