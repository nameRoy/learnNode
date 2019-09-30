const static = require('koa-static')
const path = require('path')
module.exports = (router, opts) => {
  opts = opts || {};
  opts.image = opts.image || 30;
  opts.script = opts.script || 1;
  opts.styles = opts.styles || 30;
  opts.html = opts.html || 30;
  opts.other = opts.other || 7;

  router.all(/((\.jpg)|(\.png)|(\.gif))$/i, static(path.resolve(__dirname, '../public'), {
    maxage: opts.image * 86400 * 1000
  }));
  router.all(/((\.js)|(\.jsx))$/i, static(path.resolve(__dirname, '../public'), {
    maxage: opts.script * 86400 * 1000
  }));
  router.all(/(\.css)$/i, static(path.resolve(__dirname, '../public'), {
    maxage: opts.styles * 86400 * 1000
  }));
  router.all(/((\.html)|(\.htm))$/i, static(path.resolve(__dirname, '../public'), {
    maxage: opts.html * 86400 * 1000
  }));
  router.all('*', static(path.resolve(__dirname, '../public'), {
    maxage: opts.other * 86400 * 1000
  }));
}