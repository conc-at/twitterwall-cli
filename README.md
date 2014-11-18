# CLI tool for [twitterwall](https://github.com/conc-at/twitterwall)

## Install Twitterwall CLI

    $ npm install -g twitterwall-cli

## Usage

```
Usage: twitterwall [options] [command]

  Commands:

    block <keyword>                    block user or keyword
    unblock <keyword>                  unblock user or keyword
    listblock                          view current blocking list
    clearblock                         clear the blocking list
    tweet <user> <message>             send a faketweet
    flashtimeout <message> <duration>  send a flash message with a timeout
    flash <message>                    send a flash message
    clearflash                         clear current flash message
    reconfigure                        reconfigure .twitterwallrc

  Options:

    -h, --help     output usage information
    -V, --version  output the version number```

## Licence

The [MIT License (MIT)](http://opensource.org/licenses/MIT)

Copyright © 2014 [Stephan Bönnemann](https://twitter.com/boennemann) & [Christoph Witzko](https://twitter.com/christophwitzko)
