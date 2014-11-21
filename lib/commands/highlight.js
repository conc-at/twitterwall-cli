'use strict'

module.exports = function(argv, twitterwall) {
  if(process.argv.length < 4 || !process.argv[3]) return console.log('no tweet id!')
  twitterwall.highlight(process.argv[3], function(err){
    if(err) return console.log('could not highlight tweet!')
    console.log('tweet highlighted.')
  })
}
