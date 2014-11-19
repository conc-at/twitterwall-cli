'use strict'

module.exports = function(argv, twitterwall) {
  var username = argv._.shift()
  var message = argv._.shift()
  if(!username || !message) return console.log('no username or message')
  twitterwall.tweet(username, message, function(err){
    if(err) return console.log('could not send faketweet!')
    console.log('faketweet sent.')
  })
}
