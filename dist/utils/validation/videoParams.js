'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBadVideoParams = undefined;

var _lodash = require('lodash');

function isBadVideoParams(videoParams) {
  if (!videoParams) {
    return true;
  }

  if ((0, _lodash.isEmpty)(videoParams.sessionId)) {
    return true;
  }

  return false;
}

exports.isBadVideoParams = isBadVideoParams;