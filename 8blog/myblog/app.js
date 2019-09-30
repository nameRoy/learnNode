const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const index = require('./routes/index')
const users = require('./routes/users')
const body = require('koa-better-body')
const static = require('./libs/static')
const mysql = require('mysql')
const config = require('./config')
const co = require('co-mysql')
const connection = mysql.createPool({
  ...config.mysqlConfig
});
const session = require('koa-session')
app.context.db = co(connection)
app.context.cfg = config
// error handler
onerror(app)

// middlewares
app.keys = ['dfgfgjhaksfjlk;as','ajfgkaflgljhuith','ufsbghkdjgflh58u494fjc','bhvncijf8r843gjl./']
app.use(session({
  maxAge:86400000,
  renew: true,
  rolling: true
},app))

app.use(body({
  uploadDir: path.resolve(__dirname,"./public/upload"),
  keepExtensions: true
}))

app.use(json())
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
static(index)
app.use(index.routes(), index.allowedMethods())
static(users)
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
