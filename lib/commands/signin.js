'use strict'

var fs = require('fs')
var path = require('path')

var async = require('async')
var read = require('read')

var configFile = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.twitterwallrc')

var exports = module.exports = function(argv, config, callback) {
  async.series({
    server: exports.server.bind(null, config),
    username: exports.username.bind(null, config),
    password: exports.password.bind(null, config)
  }, function(err, results) {
    if (err) {
      return console.log(err)
    }
    fs.writeFileSync(configFile, JSON.stringify(results, null, 2))
    console.log('signed in.')
    if (typeof callback === 'function') callback(results)
  })
}

exports.server = function(config, callback) {
  read({
    prompt: 'Enter twitterwall server:',
    default: config.server
  }, function(err, server) {
    if (!err && server.length > 0 && /^https?:\/\//i.test(server)) {
      return callback(null, server)
    }
    callback('invalid server! do not forget the http(s)://')
  })
}

exports.username = function(config, callback) {
  read({
    prompt: 'Enter username:',
    default: config.username || 'admin'
  }, function(err, username){
    if (!err && username.length > 0) {
      return callback(null, username)
    }
    callback('invalid username!')
  })
}

exports.password = function(config, callback) {
  read({
    prompt: 'Enter password:',
    default: config.password,
    silent: true,
    replace: '*'
  }, function(err, password){
    if (!err && password.length > 0) {
      return callback(null, password)
    }
    callback('invalid password!')
  })
}
