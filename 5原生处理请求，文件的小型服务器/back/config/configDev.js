const path=require('path');

module.exports = {
  DB_HOST: 'localhost',
  DB_PORT: 3306,
  DB_USER: 'root',
  DB_PASS: 'hu1ming2xu3,',
  DB_NAME: 'small_server',

  //http
  HTTP_PORT: 8080,
  HTTP_ROOT: path.resolve(__dirname, '../static/'),
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload/')
}