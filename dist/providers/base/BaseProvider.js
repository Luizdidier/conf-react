"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a provider. */
var BaseProvider = function () {

  /**
   * Create a Provider.
   */
  function BaseProvider() {
    _classCallCheck(this, BaseProvider);

    this.attendeesElement = null;
    this.hostElement = null;
    this.session = null;

    this._events = {
      connectFailure: function connectFailure() {},
      onCreatePublisher: function onCreatePublisher() {},
      onStreamCreated: function onStreamCreated() {},
      published: function published() {},
      sessionCreated: function sessionCreated() {},
      subscribeFailure: function subscribeFailure() {},
      subscribeSuccess: function subscribeSuccess() {},
      unpublished: function unpublished() {}
    };
  }

  /**
   * Connect to Provider.
   */


  _createClass(BaseProvider, [{
    key: "connect",
    value: function connect() {}
    // Base ctor does nothing.


    /**
     * Perform video provider-specific capabilities check.
     *
     * Base provider does not support video since there's
     * no underlying implementation.
     *
     * @returns {boolean} True if video is supported
     */

  }, {
    key: "supportsVideo",
    value: function supportsVideo() {
      return false;
    }

    /**
     * Attaches an event.
     *
     * @param {string} event - The event name.
     * @param {function} callback - The callback function to be called when the event triggers.
     * @public
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      var evt = this._events[event];

      console.assert(evt, "Could not find event :: " + event);

      this._events[event] = callback;
    }

    /**
     * Triggers an event.
     *
     * @public
     * @param {string} event - The event name.
     */

  }, {
    key: "trigger",
    value: function trigger() {
      var _arguments = Array.prototype.slice.call(arguments),
          event = _arguments[0],
          data = _arguments[1];

      this._events[event](data);
    }
  }]);

  return BaseProvider;
}();

exports.default = BaseProvider;