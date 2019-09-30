const md5 = require('../libs/md5')
const do_login = require('../models/login')
exports.dologinHandler = async (ctx)=>{
  username = ctx.request.fields.username
  password = md5(ctx.request.fields.password+ctx.cfg.salt)
  let data = await do_login.do_login(ctx,username,password)
  if(data.length != 0){
    ctx.redirect('/table')
  }else{
    ctx.redirect('/login?errmsg=true')

  }
  
}