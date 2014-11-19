'use strict'

var abbrev = require('abbrev')

var lib = require('./lib')

var abbrevs = abbrev(Object.keys(lib.commands))
var pkg = require('./package.json')

module.exports = function(argv) {
  if (argv.version || argv.v) return console.log(pkg.version)

  var command = abbrevs[argv._[0]]

  if (argv._[0] && !command) return console.log('command not found')
  if (!command || !argv._.length || argv.help || argv.h) return lib.help(command)

  lib.config(command, function(config) {
    argv._ = argv._.slice(1)
    lib.commands[command](argv, config)
  })
}
