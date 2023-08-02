'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBadVideoParams = exports.logger = exports.cloneChildrenAndInjectProps = exports.assert = exports.debug = exports.info = exports.error = exports.warn = exports.log = undefined;

var _console = require('./console');

var _cloneChildrenAndInjectProps = require('./clone-children-and-inject-props');

var _cloneChildrenAndInjectProps2 = _interopRequireDefault(_cloneChildrenAndInjectProps);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _videoParams = require('./validation/videoParams');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.log = _console.log;
exports.warn = _console.warn;
exports.error = _console.error;
exports.info = _console.info;
exports.debug = _console.debug;
exports.assert = _console.assert;
exports.cloneChildrenAndInjectProps = _cloneChildrenAndInjectProps2.default;
exports.logger = _logger2.default;
exports.isBadVideoParams = _videoParams.isBadVideoParams;