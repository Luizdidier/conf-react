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

/** Constant represting events for publishers.  */
var EVENTS = exports.EVENTS = {
  accessAllowed: 'ACCESS_ALLOWED',
  accessDenied: 'ACCESS_DENIED',
  accessDialogClosed: 'ACCESS_DIALOG_CLOSED',
  accessDialogOpened: 'ACCESS_DIALOG_OPENED',
  destroyed: 'DESTROYED',
  mediaStopped: 'MEDIA_STOPPED',
  streamCreated: 'STREAM_CREATED',
  streamDestroyed: 'STREAM_DESTROYED',
  videoDimensionsChanged: 'VIDEO_DIMENSIONS_CHANGED',
  videoElementCreated: 'VIDEO_ELEMENT_CREATED'
};

(0, _reverseEvents2.default)(EVENTS);

EVENTS.withPrefix = function (str) {
  return 'PUBLISHER_' + str;
};
/** Class managing event logging for TokBox publisher. */

var TokBoxPublisherEvents = function () {
  function TokBoxPublisherEvents(publisher) {
    _classCallCheck(this, TokBoxPublisherEvents);

    this.publisher = publisher;

    publisher.on({
      accessAllowed: this.onAccessAllowed,
      accessDenied: this.onAccessDenied,
      accessDialogClosed: this.onAccessDialogClosed,
      accessDialogOpened: this.onAccessDialogOpened,
      destroyed: this.onDestroyed,
      mediaStopped: this.onMediaStopped,
      streamCreated: this.onStreamCreated,
      streamDestroyed: this.onStreamDestroyed,
      videoDimensionsChanged: this.onVideoDimensionsChanged,
      videoElementCreated: this.onVideoElementCreated
    });
  }

  /**
   *
   * @event
   */


  _createClass(TokBoxPublisherEvents, [{
    key: 'onStreamCreated',
    value: function onStreamCreated(event) {
      _utils.logger.log(EVENTS.withPrefix(EVENTS.streamCreated), event);
    }

    /**
     *
     * @event
     */

  }, {
    key: 'onStreamDestroyed',
    value: function onStreamDestroyed(event) {
      _utils.logger.log(EVENTS.withPrefix(EVENTS.streamDestroyed), event);
    }

    /**
     * Logging is disabled on the below events they dont provide any relevant/useful info about the video call.
    /**
     
    /**
     *
     * @event
     */

  }, {
    key: 'onAccessAllowed',
    value: function onAccessAllowed(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.accessAllowed), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onAccessDenied',
    value: function onAccessDenied(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.accessDenied), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onAccessDialogClosed',
    value: function onAccessDialogClosed(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.accessDialogClosed), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onAccessDialogOpened',
    value: function onAccessDialogOpened(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.accessDialogOpened), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onDestroyed',
    value: function onDestroyed(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.destroyed), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onMediaStopped',
    value: function onMediaStopped(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.mediaStopped), event);


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
    key: 'onVideoElementCreated',
    value: function onVideoElementCreated(event) {
      // logger.log(EVENTS.withPrefix(EVENTS.videoElementCreated), event);
    }
  }]);

  return TokBoxPublisherEvents;
}();

exports.default = TokBoxPublisherEvents;