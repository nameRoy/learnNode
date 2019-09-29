const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const session = require('koa-session')
const json = require('koa-json')
const onerror = require('koa-onerror')
const betterBody = require('koa-better-body')
const logger = require('koa-logger')
const static = require('./libs/static')
const index = require('./routes/index')
const users = require('./routes/users')
const {dbCofig} = require('./config/config_dev')
const mysql = require('mysql');
const pool  = mysql.createPool({
  ...dbCofig
});
app.context.db = pool
// error handler
onerror(app)

// middlewares
app.keys = fs.readFileSync('genKey').toString().split("\n")


app.use(session({
  key: 'session',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true, 
  httpOnly: true, 
  signed: true, 
  rolling: false, 
  renew: true
},app))


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
static(users)
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// 处理数据
app.use(betterBody({
  uploadDir:path.resolve(__dirname,'./public/upload'),
  keepExtensions:true
}))
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
