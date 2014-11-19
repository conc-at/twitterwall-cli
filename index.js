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

  if (cmd && !command) return console.log(cmd, 'not found')
  if (!command || !argv._.length || argv.help || argv.h) return lib.help(command)

  lib.config(command, function(config) {
    if (command === 'signin') return lib.commands[command](argv, config)
    lib.commands[command](argv, new Twitterwall(config))
  })
}
