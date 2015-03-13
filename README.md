# bitchan-web [![Build Status](https://travis-ci.org/bitchan/bitchan-web.svg?branch=master)](https://travis-ci.org/bitchan/bitchan-web) [![npm version](https://badge.fury.io/js/bitchan-web.svg)](http://badge.fury.io/js/bitchan-web)

**Nothing interesting here yet.**

Browser bitchan and Bitmessage client.

Provides web interface for bitchan and is also compatible with other Bitmessage clients thus allowing you to communicate with them using only some decent browser. Read more about bitchan [at the wiki](https://github.com/bitchan/meta/wiki).

## Usage

### With prehosted version

`bitchan-web` executes all crypto operations on the client-side so it's rather safe to use prehosted version of it. <https://bitchan.it/> is the officially hosted `bitchan-web` instance, you might start with it to get the first impression of how it looks like.

However beware of some dangers:
* Don't use unknown instances to send sensitive data over it: owner of site is able to add some backdoor to the code so he/she will know all messages that you are trying to pass.
* Don't use `bitchan.it` instance for sensitive data either: despite the fact it's secured by the HTTPS, some powerful attacker can get access to the server where it's hosted and inject malware into it. Also it's possible to issue different valid certificate with this CNAME and execute MITM so [here](https://raw.githubusercontent.com/bitchan/meta/master/bitchan.it.fingerprint.asc) is the current signed fingerprint.
* Domain and/or hosting may be seized for some reason so don't forget to periodically export your private keys and history stored in the browser. See [this issue](https://github.com/bitchan/meta/issues/3) for details.

### With bitchan-node

The recommended way is to install [bitchan-node](https://github.com/bitchan/bitchan-node) which automatically hosts the latest version of `bitchan-web` at localhost. This way you are not only protected against dangers of prehosted version but also help others by providing yet another WebSocket gateway to the Bitmessage network. You may also let your friends access your own instance.

### With npm

Every npm release contains prebuilt version of `bitchan-web` static in the `dist` subfolder. You need to simply `npm install bitchan-web` and then host `node_modules/bitchan-web/dist` with you favourite web server. For example:

```bash
$ npm i bitchan-web
$ cd node_modules/bitchan-web/dist
$ python -mSimpleHTTPServer
# open http://localhost:8000 in browser
```

### With deb package

*TODO*

### With manual build

*TODO*

## License

bitchan-web - Browser bitchan client

Written in 2014-2015 by Kagami Hiiragi <kagami@genshiken.org>

To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.

You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
