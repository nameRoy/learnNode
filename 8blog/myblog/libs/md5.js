const crypto = require('crypto')

module.exports = function(password){
  let hash = crypto.createHash('md5')
  hash.update(password)
  return hash.digest('hex')
}