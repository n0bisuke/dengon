'use strict';

var SockJS = require('../sockjs-stream'),
  _URL = require('url');

function buildBuilder (client, opts) {
  var wsOpt = {
      protocol: 'mqttv3.1'
    },
    host = opts.hostname || 'localhost',
    port = String(opts.port || 80),
    path = opts.path || '/',
    url = opts.protocol + '://' + host + ':' + port + path;

  if ('wss' === opts.protocol) {
    if (opts.hasOwnProperty('rejectUnauthorized')) {
      wsOpt.rejectUnauthorized = opts.rejectUnauthorized;
    }
  }

  return websocket(url/*, wsOpt*/);
}

function buildBuilderBrowser (mqttClient, opts) {
  var url,
    parsed = _URL.parse(document.URL);

  if (!opts.protocol) {
    if ('https:' === parsed.protocol) {
      opts.protocol = 'https';
    } else {
      opts.protocol = 'http';
    }
  }

  if (!opts.hostname) {
    opts.hostnme = opts.host;
  }

  if (!opts.hostname) {
    opts.hostname = parsed.hostname;
    if (!opts.port) {
      opts.port = parsed.port;
    }
  }

  if (!opts.port) {
    if ('https' === opts.protocol) {
      opts.port = 443;
    } else {
      opts.port = 80;
    }
  }

  if(opts.protocol == 'sockjss') opts.protocol = 'https';
  else opts.protocol = 'http';

  if (!opts.path) {
    opts.path = '/';
  }

  url = opts.protocol + '://' + opts.hostname + ':' + opts.port + opts.path;

  //変更
  return SockJS(url);
}

if ('browser' !== process.title) {
  module.exports = buildBuilder;
} else {
  module.exports = buildBuilderBrowser;
}
