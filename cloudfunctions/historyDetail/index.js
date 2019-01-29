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

  const countRes = await db.collection(COL_NAME).where({
    e_id: eId
  }).count()

  if (countRes.total === 0) {
    const resp = await axios.get(baseUrl, {
      params: {
        key,
        e_id: eId
      }
    }).then(res => {
      return res.data
    })

    await db.collection(COL_NAME).add({
      data: {
        e_id: eId,
        result: resp.result
      }
    })

    return resp.result
  }

  const ret = await db.collection(COL_NAME).where({
    e_id: eId
  }).get()

  return ret.data[0].result
}