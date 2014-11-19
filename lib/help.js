'use strict'

module.exports = function(command) {
  if (!command) {
    return console.log('general help')
  }

  return console.log(command, 'specific help')
}
