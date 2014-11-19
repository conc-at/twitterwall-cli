'use strict'

var abbrev = require('abbrev')

var exports = module.exports = function(argv, twitterwall) {
  var cmd = argv._.shift()
  var command = exports.abbrevs[cmd]
  if(command) return exports.commands[command](argv, twitterwall)

  console.log('command', '"flash ' + cmd + '"', 'not found')
}

exports.flashCallback = function(smsg, emsg){
  return function(err){
    if(err) return console.log(emsg)
    console.log(smsg)
  }
}

exports.commands = {
  send: function(argv, twitterwall){
    var message = argv._.shift()
    if(!message) return console.log('empty message!')
    var duration = parseInt(argv.d || argv.duration, 10)
    if(isNaN(duration)) duration = 0
    twitterwall.flashTimeout(message, duration*1000, (argv.m || argv.markdown), exports.flashCallback('flash message sent.', 'could not send flash message!'))
  },
  clear: function(argv, twitterwall){
    twitterwall.clearFlash(exports.flashCallback('flash message cleared.', 'could not clear flash message!'))
  },
}

exports.abbrevs = abbrev(Object.keys(exports.commands))
