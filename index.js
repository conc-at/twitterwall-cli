'use strict'

var abbrev = require('abbrev')
var Twitterwall = require('twitterwall.js')

var lib = require('./lib')

var abbrevs = abbrev(Object.keys(lib.commands))
var pkg = require('./package.json')

module.exports = function(argv) {
  if (argv.version || argv.v) return console.log(pkg.version)

  var cmd = argv._.shift()
  var command = abbrevs[cmd]
  var isSignin = command === 'signin'

  if (cmd && !command) return console.log('command', '"' + cmd + '"', 'not found')
  if (!command || (isSignin ? false : !argv._.length) || argv.help || argv.h) return lib.help(command)

  lib.config(command, function(config) {
    if (isSignin) return lib.commands[command](argv, config)
    lib.commands[command](argv, new Twitterwall(config))
  })
}
