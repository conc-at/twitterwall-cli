'use strict'

var fs = require('fs')
var path = require('path')

var pkgjson = require('../package.json')
var urljoin = require('url-join')
var request = require('request')
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
              console.log('".twitterwallrc" written...')
              if(typeof cb === 'function') cb()
            }
            else console.log('invalid password!')
          })
        }
        else console.log('invalid username!')
      })
    }
    else console.log('invalid server!')
  })
}

function runProgram(){
  program.version('v' + pkgjson.version)
  program
    .command('block')
    .description('run remote setup commands')
    .action(function(){
      console.log('block')
    })

  program
    .command('unblock')
    .description('run remote setup commands')
    .action(function(){
      console.log('unblock')
    })

  program
    .command('tweet')
    .description('run remote setup commands')
    .option('-t, --twitteruser <user>', 'set the twitteruser')
    .action(function(){
      console.log('tweet')
    })

  program
    .command('flash')
    .description('run remote setup commands')
    .action(function(){
      console.log('flash')
    })

  program
    .command('reconfigure')
    .description('reconfigure .twitterwallrc')
    .action(setUp)

  program.parse(process.argv)
}

module.exports = function(){
  process.title = pkgjson.name

  if(!configExist) return setUp(runProgram)
  else{
    var cfd = fs.readFileSync(configFile)
    config = JSON.parse(cfd.toString())
    runProgram()
  }
}
