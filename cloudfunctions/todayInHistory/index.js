// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()
const db = cloud.database()

// 聚合数据
const { baseUrl, key } = require('./config')

// 云函数入口函数
exports.main = async(event, context) => {
  const {
    month,
    day
  } = event

  const ret = await db.collection('todayInHistory').where({
    date: `${month}/${day}`
  }).get()

  if (ret.data.length > 0) {
    return ret.data[0].result
  }

  const resp = await axios.get(baseUrl, {
    params: {
      key,
      date: `${month}/${day}`
    }
  }).then(res => {
    return res.data
  })
  
  await db.collection('todayInHistory').add({
    data: {
      date: `${month}/${day}`,
      result: resp.result
    }
  })

  return resp.result
}