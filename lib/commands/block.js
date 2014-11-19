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

exports.blockCallback = function(smsg, emsg){
  if(typeof emsg === 'undefined') {
    emsg = smsg
    smsg = undefined
  }
  return function(err, data){
    if(err) return console.log(emsg)
    if(smsg) console.log(smsg)
    exports.viewBlockingList(data)
  }
}

exports.commands = {
  add: function(argv, twitterwall){
    var keyword = argv._.shift()
    if(!keyword) return console.log('empty keyword!')
    twitterwall.block(keyword, exports.blockCallback('blocked "' + keyword + '"', 'could not block keyword!'))
  },
  remove: function(argv, twitterwall){
    var keyword = argv._.shift()
    if(!keyword) return console.log('empty keyword!')
    twitterwall.unblock(keyword, exports.blockCallback('unblocked "' + keyword + '"', 'could not unblock keyword!'))
  },
  list: function(argv, twitterwall){
    twitterwall.listBlock(exports.blockCallback('could not view blocking list!'))
  },
  clear: function(argv, twitterwall){
    twitterwall.clearBlock(exports.blockCallback('blocking list cleared.', 'could not clear blocking list!'))
  }
}

exports.abbrevs = abbrev(Object.keys(exports.commands))