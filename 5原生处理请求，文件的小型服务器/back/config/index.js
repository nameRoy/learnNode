const ProConfig = require('./configPro')
const DevConfig = require('./configDev')
// 总配置文件
module.exports = {
  mode:'dev',
  ...DevConfig
}
