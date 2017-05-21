const Router = require('koa-router')
const qiniu = require('qiniu')

const { AK, SK, BUCKET } = require('../../config')

qiniu.conf.ACCESS_KEY = AK
qiniu.conf.SECRET_KEY = SK

const router = new Router()
router.get('/getToken', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.body = { uptoken: new qiniu.rs.PutPolicy(BUCKET).token() }
    await next()
})

module.exports = router