'use strict'

var abbrev = require('abbrev')

var exports = module.exports = function(argv, twitterwall) {
  var cmd = argv._.shift()
  var command = exports.abbrevs[cmd]
  if(command) return exports.commands[command](argv, twitterwall)

  console.log('command', '"block ' + cmd + '"', 'not found')
}

exports.viewBlockingList = function(blocks){
  if(blocks && blocks.length > 0){
    console.log('blocking list (' + blocks.length + '):')
    blocks.forEach(function(v, i){
      console.log((i+1) + '. ' + v)
    })
  }
  else console.log('empty blocking list.')
}


exports.commands = {
  add: function(argv, twitterwall){
    console.log('add')
  },
  remove: function(argv, twitterwall){
    console.log('remove')
  },
  list: function(argv, twitterwall){
    console.log('list')
  }
}

exports.abbrevs = abbrev(Object.keys(exports.commands))