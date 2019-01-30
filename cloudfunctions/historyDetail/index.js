// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()
const db = cloud.database()

// 聚合数据
const { baseUrl, key } = require('./config')

const COL_NAME = 'historyDetail'

// 云函数入口函数
exports.main = async (event, context) => {
  const eId = event.id;
  console.log('eId', eId)

  const ret = await db.collection(COL_NAME).where({
    e_id: eId
  }).get()

  if (ret.data.length > 0) {
    return ret.data[0].result
  }

  const resp = await axios.get(baseUrl, {
    params: {
      key,
      e_id: eId
    }
  }).then(res => {
    return res.data
  })
  console.log('resp', resp)

  await db.collection(COL_NAME).add({
    data: {
      e_id: eId,
      result: resp.result
    }
  })

  return resp.result
}