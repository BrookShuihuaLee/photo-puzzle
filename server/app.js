const Koa = require('koa')
const KoaLog = require('koa-log')

const { PORT } = require('./config')
const router = require('./routes')

new Koa().use(router.routes()).use(KoaLog()).listen(PORT)