exports.do_login = async (ctx,username,password)=>{
  let data = await ctx.db.query(`select * from user_table where username = ? and password = ?`,[username,password])
  return data
}