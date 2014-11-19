'use strict'

var abbrev = require('abbrev')

var exports = module.exports = function(argv, twitterwall) {
  var cmd = argv._.shift()
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
