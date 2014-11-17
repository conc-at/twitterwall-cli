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
              console.log('".twitterwallrc" written.')
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

function sendRequest(url, data, cb){
  request({
    url: urljoin(config.server, url),
    method: 'POST',
    json: true,
    body: data,
    auth: config
  }, function (error, response, body){
    if(!error && response.statusCode === 200){
      cb(null, body)
    }
    else if(response.statusCode === 401) console.log('user unauthorized!\nuse the "reconfigure" command to change your login credentials.')
    else cb(error)
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
  program.version('v' + pkgjson.version)
  program
    .command('block <keyword>')
    .description('block user or keyword')
    .action(function(keyword){
      if(keyword.length > 0){
        sendRequest('block', {block: keyword}, function(err, data){
          if(!err){
            viewBlockingList(data)
          }
          else console.log('could not block keyword!')
        })
      }
      else console.log('empty keyword!')
    })

  program
    .command('unblock <keyword>')
    .description('unblock user or keyword')
    .action(function(keyword){
      if(keyword.length > 0){
        sendRequest('block', {unblock: keyword}, function(err, data){
          if(!err){
            viewBlockingList(data)
          }
          else console.log('could not unblock keyword!')
        })
      }
      else console.log('empty keyword!')
    })

  program
    .command('listblock')
    .description('view current blocking list')
    .action(function(){
      sendRequest('block', {}, function(err, data){
        if(!err){
          viewBlockingList(data)
        }
        else console.log('could not view blocking list!')
      })
    })

  program
    .command('tweet <user> <message>')
    .description('send a faketweet')
    .action(function(user, message){
      if(user.length > 0 && message.length > 0){
        sendRequest('tweet', {user: user, text: message}, function(err, data){
          if(!err && data && data.success){
            console.log('faketweet sent.')
          }
          else console.log('could not send faketweet!')
        })
      }
      else console.log('empty message or no twitter username!')
    })

  program
    .command('flash <message>')
    .description('send a flash message')
    .action(function(message){
      if(message.length > 0) console.log('not implemented yet:', message)
      else console.log('empty message!')
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
