'use strict'

var abbrev = require('abbrev')

var lib = require('./lib')

var abbrevs = abbrev(Object.keys(lib.commands))
var pkg = require('./package.json')

module.exports = function(argv) {
  if (argv.version || argv.v) return console.log(pkg.version)

  var command = abbrevs[argv._[0]]

  if (!command) console.log('command not found')
  if (!command || !argv._.length || argv.help || argv.h) return lib.help(command)

  argv._ = argv._.slice(1)

  return lib.commands[command](argv)
}
