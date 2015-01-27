'use strict'

var exports = module.exports = function(command) {
  if (!command) return console.log(exports.generalHelp)
  console.log(exports.helps[command])
}

exports.generalHelp = 'usage: twitterwall <command> [options]\n\nCommands:\n' +[
  '',
  'block      block, unblock, clear or view blocking list',
  'flash      send or clear flash messages',
  'tweet      send a fake tweet',
  'highlight  highlight a tweet (not supported yet)',
  'signin     reconigure twitterwall server and login credentials'
  ].join('\n    ') + '\n\nOptions:\n' + [
  '',
  '-h, --help     output usage information',
  '-v, --version  output the version number'
  ].join('\n    ') + '\n'

exports.helps = {
  block: 'usage: twitterwall block <command> [keyword]\n\nCommands:\n' + [
          '',
          'add     block keyword',
          'remove  unblock keyword',
          'list    view current blocking list',
          'clear   clear the blocking list'
          ].join('\n    ') + '\n',
  flash: 'usage: twitterwall flash <command> [message] [options]\n\nCommands:\n' + [
          '',
          'send   send a flash message',
          'clear  clear current flash message'
          ].join('\n    ') + '\n\nOptions:\n' + [
          '',
          '-d, --duration  set the display duration in seconds',
          '-m, --markdown  parse message as markdown'
          ].join('\n    ') + '\n',
  tweet: 'usage: twitterwall tweet <username> <message>\n',
  highlight: 'usage: twitterwall highlight <id>\n'
}
