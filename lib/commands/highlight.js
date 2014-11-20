'use strict'

module.exports = function(argv, twitterwall) {
  var id = argv._.shift()
  if(!id) return console.log('no tweet id')
  twitterwall.highlight(id, function(err){
    if(err) return console.log('could not highlight tweet!')
    console.log('tweet highlighted.')
  })
}
