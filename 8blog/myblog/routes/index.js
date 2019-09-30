const router = require('koa-router')()
const doLogin = require('../controller/doLogin')
router.get('/', async (ctx, next) => {
  ctx.redirect('/login')
})
router.get('/login',async (ctx,next)=>{
  await ctx.render('login',{
    HTTP_ROOT:ctx.cfg.HTTP_ROOT,
    errmsg:ctx.query.errmsg
  })
})
router.post('/login',async ctx=>{
  await doLogin.dologinHandler(ctx)
})

router.get('/table',async ctx=>{
  await ctx.render('table',{
    HTTP_ROOT:ctx.cfg.HTTP_ROOT,
    page_types:{
      banner:'banner',
      user:'user',
      tab:'tab'
    },
    page_type:'banner'
  })
})
module.exports = router
