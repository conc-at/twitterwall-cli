'use strict'

var fs = require('fs')
var path = require('path')

var pkgjson = require('../package.json')
var Twitterwall = require('twitterwall.js')
var program = require('commander')
var read = require('read')

var config = {}
var configFile = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.twitterwallrc')
var configExist = fs.existsSync(configFile) && fs.statSync(configFile).isFile()

function setUp(cb){
  console.log('setting up ".twitterwallrc"...')
  read({prompt: 'Enter twitterwall server:', default: config.server}, function (err, server) {
    if(!err && server.length > 0 && /^https?:\/\//i.test(server)){
      read({prompt: 'Enter username:', default: 'admin' || config.username}, function(err, username){
        if(!err && username.length > 0){
          read({prompt: 'Enter password:', default: config.password, silent: true, replace: '*'}, function(err, password){
            if(!err && password.length > 0){
              config = {
                username: username,
                password: password,
                server: server
              }
              fs.writeFileSync(configFile, JSON.stringify(config))
              console.log('".twitterwallrc" written.')
              if(typeof cb === 'function') cb()
            }
            else console.log('invalid password!')
          })
        }
        else console.log('invalid username!')
      })
    }
    else console.log('invalid server! do not forget the http(s)://')
  })
}

function viewBlockingList(blocks){
  if(blocks && blocks.length > 0){
    console.log('blocking list (' + blocks.length + '):')
    blocks.forEach(function(v, i){
      console.log((i+1) + '. ' + v)
    })
  }
  else console.log('empty blocking list!')
}

function runProgram(){
  var twitterwall = new Twitterwall(config)
  program.version('v' + pkgjson.version)
  program
    .command('block <keyword>')
    .description('block user or keyword')
    .action(function(keyword){
      twitterwall.block(keyword, function(err, data){
        if(!err) viewBlockingList(data)
        else console.log('could not block keyword!')
      })
    })

  program
    .command('unblock <keyword>')
    .description('unblock user or keyword')
    .action(function(keyword){
      twitterwall.unblock(keyword, function(err, data){
        if(!err) viewBlockingList(data)
        else console.log('could not unblock keyword!')
      })
    })

  program
    .command('listblock')
    .description('view current blocking list')
    .action(function(){
      twitterwall.listBlock(function(err, data){
        if(!err) viewBlockingList(data)
        else console.log('could not view blocking list!')
      })
    })

  program
    .command('clearblock')
    .description('clear the blocking list')
    .action(function(){
      twitterwall.clearBlock(function(err, data){
        if(!err) viewBlockingList(data)
        else console.log('could not clear blocking list!')
      })
    })

  program
    .command('tweet <user> <message>')
    .description('send a faketweet')
    .action(function(user, message){
      twitterwall.tweet(user, message, function(err){
        if(!err) console.log('faketweet sent.')
        else console.log('could not send faketweet!')
      })
    })

  program
    .command('flashtimeout <message> <duration>')
    .description('send a flash message with a timeout')
    .action(function(message, duration){
      duration = parseInt(duration, 10)
      if(isNaN(duration)) duration = 0
      twitterwall.flashTimeout(message, duration*1000, function(err){
        if(!err) console.log('flash message sent.')
        else console.log('could not flash message!')
      })
    })

  program
    .command('flash <message>')
    .description('send a flash message')
    .action(function(message){
      twitterwall.flash(message, function(err){
        if(!err) console.log('flash message sent.')
        else console.log('could not flash message!')
      })
    })

  program
    .command('clearflash')
    .description('clear current flash message')
    .action(function(){
      twitterwall.clearFlash(function(err){
        if(!err) console.log('flash message cleared.')
        else console.log('could not clear flash message!')
      })
    })

  program
    .command('reconfigure')
    .description('reconfigure .twitterwallrc')
    .action(setUp)

  program.parse(process.argv)
  if(program.args.length === 0) program.help()
}

module.exports = function(){
  if(!configExist) return setUp(runProgram)
  else{
    var cfd = fs.readFileSync(configFile)
    config = JSON.parse(cfd.toString())
    runProgram()
  }
}
