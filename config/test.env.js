'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    HOST_API: '"http://htx1.pyplb.com/api.html"',
    // HOST_API: '"http://admin.vpay.cis/api.html"',
    GO_API: '"127.0.0.1:9026"',
    PJ_API: '"127.0.0.1:9026"',
    JAVA_API: '"http://159.138.20.186:8080"'
})
