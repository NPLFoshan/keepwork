'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  KEEPWORK_API_PREFIX: '"https://stage.keepwork.com/api/wiki/models"',
  GITLAB_API_PREFIX: '"https://git.stage.keepwork.com"',
  ES_GATEWAY_BASE_URL: '"https://esgateway.stage.keepwork.com/"'
})
