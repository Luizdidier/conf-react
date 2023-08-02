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

/** Constant represting events for sessions.  */
var EVENTS = exports.EVENTS = {
  archiveStarted: 'ARCHIVE_STARTED',
  archiveStopped: 'ARCHIVE_STOPPED',
  connectionCreated: 'CONNECTION_CREATED',
  connectionDestroyed: 'CONNECTION_DESTROYED',
  sessionConnected: 'SESSION_CONNECTED',
  sessionDisconnected: 'SESSION_DISCONNECTED',
  sessionReconnected: 'SESSION_RECONNECTED',
  sessionReconnecting: 'SESSION_RECONNECTING',
  streamCreated: 'STREAM_CREATED',
  streamDestroyed: 'STREAM_DESTROYED',
  streamPropertyChanged: 'STREAM_PROPERTY_CHANGED'
};

(0, _reverseEvents2.default)(EVENTS);

EVENTS.withPrefix = function (str) {
  return 'SESSION_' + str;
};

/** Class managing event logging for TokBox provider. */

var TokBoxSessionEvents = function () {
  /**
   * Creates a TokBoxSessionEvents instance.
   */
  function TokBoxSessionEvents(session) {
    _classCallCheck(this, TokBoxSessionEvents);

    this.session = session;

    session.on({
      archiveStarted: this.onArchiveStarted,
      archiveStopped: this.onArchiveStopped,
      connectionCreated: this.onConnectionCreated,
      connectionDestroyed: this.onConnectionDestroyed,
      sessionConnected: this.onSessionConnected,
      sessionDisconnected: this.onSessionDisconnected,
      sessionReconnected: this.onSessionReconnected,
      sessionReconnecting: this.onSessionReconnecting,
      streamCreated: this.onStreamCreated,
      streamDestroyed: this.onStreamDestroyed,
      streamPropertyChanged: this.onStreamPropertyChanged
    });
  }
  /**
   *
   * @event
   */


  _createClass(TokBoxSessionEvents, [{
    key: 'onSessionConnected',
    value: function onSessionConnected(event) {
      _utils.logger.log(EVENTS.sessionConnected, event);
    }

    /**
     *
     * @event
     */

  }, {
    key: 'onSessionDisconnected',
    value: function onSessionDisconnected(event) {
      _utils.logger.log(EVENTS.sessionDisconnected, event);
    }

    /**
     *
     * @event
     */

  }, {
    key: 'onSessionReconnected',
    value: function onSessionReconnected(event) {
      _utils.logger.log(EVENTS.sessionReconnected, event);
    }

    /**
     * Logging is disabled on the below events they dont provide any relevant/useful info about the video call.
    /**
     /**
     *
     * @event
     */

  }, {
    key: 'onArchiveStarted',
    value: function onArchiveStarted(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.archiveStarted), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onArchiveStopped',
    value: function onArchiveStopped(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.archiveStopped), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onConnectionCreated',
    value: function onConnectionCreated(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.connectionCreated), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onConnectionDestroyed',
    value: function onConnectionDestroyed(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.connectionDestroyed), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onSessionReconnecting',
    value: function onSessionReconnecting(event) {}
    // logger.log(EVENTS.sessionReconnecting, event);


    /**
     *
     * @event
     */

  }, {
    key: 'onStreamCreated',
    value: function onStreamCreated(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.streamCreated), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onStreamDestroyed',
    value: function onStreamDestroyed(event) {}
    // logger.log(EVENTS.withPrefix(EVENTS.streamDestroyed), event);


    /**
     *
     * @event
     */

  }, {
    key: 'onStreamPropertyChanged',
    value: function onStreamPropertyChanged(event) {
      // logger.log(EVENTS.withPrefix(EVENTS.streamPropertyChanged), event);
    }
  }]);

  return TokBoxSessionEvents;
}();

exports.default = TokBoxSessionEvents;