'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
     //  HOST_API: '"http://eur.sixg.vip/api.html"',
     HOST_API: '"http://htx1.pyplb.com/api.html"',

 
    //   GO_API: '"127.0.0.1:9026"',
     // GO_API: '"eurgo.sixg.vip"',
    
     GO_API: '"eurgo.eur.jiujiutc.com"',
     PJ_API: '"eurgo.eur.jiujiutc.com"',
     //PJ_API: '"eurgo.sixg.vip"',
   //  PJ_API: '"127.0.0.1:9026"',
  JAVA_API: '"http://127.0.0.16:8080"'
})
