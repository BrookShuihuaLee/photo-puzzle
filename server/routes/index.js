const Router = require('koa-router')

const apiRouter = require('./apis')

const router = new Router()
router.use('/apis', apiRouter.routes())

module.exports = router