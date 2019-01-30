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

const COL_NAME = 'dreamCategory'

// 云函数入口函数
exports.main = async(event, context) => {
  const fId = event.fId || '0'

  console.log('fId', fId)

  const ret = await db.collection(COL_NAME).where({
    fid: fId
  }).get()

  if (ret.data.length > 0) {
    return ret.data[0].result
  }

  const params = fId === '0' ? {
    key
  } : {
    key,
    fid: fId
  }

  const resp = await axios.get(baseUrl, {
    params
  }).then(res => {
    return res.data
  })
  console.log('resp', resp)

  await db.collection(COL_NAME).add({
    data: {
      fid: fId,
      result: resp.result
    }
  })

  return resp.result
}