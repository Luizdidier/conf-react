'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function consoleMethod(name) {
  var consoleObj = window.console;

  var method = (typeof consoleObj === 'undefined' ? 'undefined' : _typeof(consoleObj)) === 'object' ? consoleObj[name] : null;

  if (typeof method !== 'function') {
    return;
  }

  if (typeof method.bind === 'function') {
    return method.bind(consoleObj);
  }

  return function () {
    method.apply(consoleObj, arguments);
  };
}

function assertPolyfill(test, message) {
  if (!test) {
    try {
      throw new Error('assertion failed: ' + message);
    } catch (error) {
      setTimeout(function () {
        throw error;
      }, 0);
    }
  }
}

var console = {
  /**
   Logs the arguments to the console.
   You can pass as many arguments as you want and they will be joined together with a space.
     ```javascript
    var foo = 1;
    Logger.log('log value of foo:', foo);
    // "log value of foo: 1" will be printed to the console
    ```
    @method log
   @param {*} arguments
   @public
  */
  log: consoleMethod('log'),

  /**
   Prints the arguments to the console with a warning icon.
   You can pass as many arguments as you want and they will be joined together with a space.
     ```javascript
    Logger.warn('Something happened!');
    // "Something happened!" will be printed to the console with a warning icon.
    ```
    @method warn
   @param {*} arguments
   @public
  */
  warn: consoleMethod('warn'),

  /**
   Prints the arguments to the console with an error icon, red text and a stack trace.
   You can pass as many arguments as you want and they will be joined together with a space.
     ```javascript
    Logger.error('Danger! Danger!');
    // "Danger! Danger!" will be printed to the console in red text.
    ```
    @method error
   @param {*} arguments
   @public
  */
  error: consoleMethod('error'),

  /**
   Logs the arguments to the console.
   You can pass as many arguments as you want and they will be joined together with a space.
     ```javascript
    var foo = 1;
    Logger.info('log value of foo:', foo);
    // "log value of foo: 1" will be printed to the console
    ```
    @method info
   @param {*} arguments
   @public
  */
  info: consoleMethod('info'),

  /**
   Logs the arguments to the console in blue text.
   You can pass as many arguments as you want and they will be joined together with a space.
     ```javascript
    var foo = 1;
    Logger.debug('log value of foo:', foo);
    // "log value of foo: 1" will be printed to the console
    ```
    @method debug
   @param {*} arguments
   @public
  */
  debug: consoleMethod('debug') || consoleMethod('info'),

  /**
   If the value passed in is not truthy it will throw an error with a stack trace.
     ```javascript
    Logger.assert(true); // undefined
    Logger.assert(true === false); // Throws an Assertion failed error.
    Logger.assert(true === false, 'Something invalid'); // Throws an Assertion failed error with message.
    ```
    @method assert
   @param {Boolean} bool Value to test
   @param {String} message Assertion message on failed
   @public
  */
  assert: consoleMethod('assert') || assertPolyfill
};

var log = console.log,
    warn = console.warn,
    error = console.error,
    info = console.info,
    debug = console.debug,
    assert = console.assert;
exports.log = log;
exports.warn = warn;
exports.error = error;
exports.info = info;
exports.debug = debug;
exports.assert = assert;
exports.default = console;