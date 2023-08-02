'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../../../../utils');

var _reverseEvents = require('../reverse-events');

var _reverseEvents2 = _interopRequireDefault(_reverseEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Constant representing events for subscribers. */
var EVENTS = exports.EVENTS = {
  connected: 'CONNECTED',
  destroyed: 'DESTROYED',
  disconnected: 'DISCONNECTED',
  videoDimensionsChanged: 'VIDEO_DIMENSIONS_CHANGED',
  videoDisabled: 'VIDEO_DISABLED',
  videoDisableWarning: 'VIDEO_DISABLE_WARNING',
  videoDisableWarningLifted: 'VIDEO_DISABLE_WARNING_LIFTED',
  videoElementCreated: 'VIDEO_ELEMENT_CREATED',
  videoEnabled: 'VIDEO_ENABLED'
};

(0, _reverseEvents2.default)(EVENTS);

EVENTS.withPrefix = function (str) {
  return 'SUBSCRIBER_' + str;
};

/** Class managing event logging for TokBox subscriber. */

var TokBoxSubscriberEvents = function () {
  /**
   * Creates a TokBoxSusbscriberEvents instance.
   */
  function TokBoxSubscriberEvents(publisher) {
    _classCallCheck(this, TokBoxSubscriberEvents);

    this.publisher = publisher;

    publisher.on({
      connected: this.onConnected,
      destroyed: this.onDestroyed,
      disconnected: this.onDisconnected,
      videoDimensionsChanged: this.onVideoDimensionsChanged,
      videoDisabled: this.onVideoDisabled,
      videoDisableWarning: this.onVideoDisableWarning,
      videoDisableWarningLifted: this.onVideoDisableWarningLifted,
      videoElementCreated: this.onVideoElementCreated,
      videoEnabled: this.onVideoEnabled
    });
  }

  /**
   *
   * @event
   */


  _createClass(TokBoxSubscriberEvents, [{
    key: 'onConnected',
    value: function onConnected(event) {
      _utils.logger.log(EVENTS.withPrefix(EVENTS.connected), event);
    }

    /**
     *
     * @event
     */

  }, {
    key: 'onDestroyed',
    value: function onDestroyed(event) {
      _utils.logger.log(EVENTS.withPrefix(EVENTS.destroyed), event);
    }

    /**
     *
     * @event
     */

  }, {
    key: 'onDisconnected',
    value: function onDisconnected(event) {
      _utils.logger.log(EVENTS.withPrefix(EVENTS.disconnected), event);
    }

    /**
     *
     * @event
     */

  }, {
    key: 'onVideoDimensionsChanged',
    value: function onVideoDimensionsChanged(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.videoDimensionsChanged), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onVideoDisabled',
    value: function onVideoDisabled(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.videoDisabled), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onVideoDisableWarning',
    value: function onVideoDisableWarning(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.videoDisableWarning), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onVideoDisableWarningLifted',
    value: function onVideoDisableWarningLifted(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.videoDisableWarningLifted), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onVideoElementCreated',
    value: function onVideoElementCreated(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.videoElementCreated), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onVideoEnabled',
    value: function onVideoEnabled(event) {
      // logger.log(EVENTS.withPrefix(EVENTS.videoEnabled), event);
    }
  }]);

  return TokBoxSubscriberEvents;
}();

exports.default = TokBoxSubscriberEvents;