'use strict'

var fs = require('fs')
var path = require('path')

var exports = module.exports = function (command, callback) {
  if (command === 'signin' && !exports.exists) return callback({})
  if (!exports.exists) return require('./commands/signin')(null, {}, callback)
  callback(JSON.parse(fs.readFileSync(exports.file).toString()))
}

exports.file = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.twitterwallrc')
exports.exists = fs.existsSync(exports.file) && fs.statSync(exports.file).isFile()
