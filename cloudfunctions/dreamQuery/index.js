// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()
const db = cloud.database()

// 聚合数据
const {
  baseUrl,
  key
} = require('./config')

const COL_NAME = 'dreamQuery'

// 云函数入口函数
exports.main = async(event, context) => {
  const {
    q,
    cid
  } = event;
  console.log('q', q)
  console.log('cid', cid)

  const ret = await db.collection(COL_NAME).where({
    q: q,
    cid: cid
  }).get()

  if (ret.data.length > 0) {
    return ret.data[0].result
  }

  const resp = await axios.get(baseUrl, {
    params: {
      key,
      q: q,
      cid: cid
    }
  }).then(res => {
    return res.data
  })
  console.log('resp', resp)

  await db.collection(COL_NAME).add({
    data: {
      q: q,
      cid: cid,
      result: resp.result
    }
  })

  return resp.result
}