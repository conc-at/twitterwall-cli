'use strict'

module.exports = function(argv, twitterwall) {
  return console.log('not implemented yet!')
  /* eslint-disable no-unreachable */
  if (process.argv.length < 4 || !process.argv[3]) return console.log('no tweet id!')
  var id = process.argv[3]
  var rres = /https:\/\/twitter\.com\/.*\/status\/(\d+)/.exec(id)
  if (rres && rres[1]) id = rres[1]
  twitterwall.highlight(id, function (err) {
    if (err) return console.log('could not highlight tweet!')
    console.log('tweet highlighted.')
  })
}
