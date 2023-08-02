'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _Attendee = require('../Attendee');

var _Attendee2 = _interopRequireDefault(_Attendee);

var _Attendees = require('../Attendees');

var _Attendees2 = _interopRequireDefault(_Attendees);

var _Conference = require('../Conference');

var _Conference2 = _interopRequireDefault(_Conference);

var _ConferenceControls = require('../ConferenceControls');

var _ConferenceControls2 = _interopRequireDefault(_ConferenceControls);

var _Notification = require('../Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _Publisher = require('../Publisher');

var _Publisher2 = _interopRequireDefault(_Publisher);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SETTINGS = {
  NOTIFICATIONS: {
    CONNECTION_LOST: 'Network connection lost.',
    PATIENT_CONNECTED: 'You connected',
    PATIENT_DISCONNECTED: 'You disconnected',
    PROVIDER_CONNECTED: 'Provider has joined the room.',
    PROVIDER_DISCONNECTED: 'Provider has disconnected.',
    SESSION_RECONNECTED: 'Reconnected',
    SESSION_RECONNECTING: 'Network connection lost. Attempting to reconnect.',
    WAITING_FOR_PATIENT: 'Waiting for patient.'
  },
  REASONS: {
    NETWORK_TIMEDOUT: 'networkTimedout'
  }
};

var VideoConference = function (_Component) {
  _inherits(VideoConference, _Component);

  function VideoConference(props) {
    _classCallCheck(this, VideoConference);

    var _this = _possibleConstructorReturn(this, (VideoConference.__proto__ || Object.getPrototypeOf(VideoConference)).call(this, props));

    _this.componentWillUnmount = function () {
      var subscribers = _this.state.subscribers;

      _this.publisher.disconnectSession(subscribers);
      _this.publisher.props.provider.session.disconnect();
    };

    _this.bindCustomPublisherEvents = function (publisher) {
      _this.session = publisher.props.provider.session;

      try {
        _this.session.on({
          sessionDisconnected: _this.onSessionDisconnected,
          sessionReconnected: _this.onSessionReconnected,
          sessionReconnecting: _this.onSessionReconnecting
        });
      } catch (error) {
        throw new Error('Could not bind events to publisher!');
      }
    };

    _this.onConnectionLost = function () {
      _this.setState({
        show: false,
        notification: SETTINGS.NOTIFICATIONS.CONNECTION_LOST
      });
    };

    _this.onCreateConference = function (config) {
      _this.setState({ show: true });
    };

    _this.onCreatePublisher = function () {
      _this.setState({ renderPublisher: true });
    };

    _this.onCreateAttendee = function (stream) {
      var attendees = _this.state.attendees,
          _JSON$parse = JSON.parse(stream.connection.data),
          userType = _JSON$parse.userType;


      if (userType === "tdoc_member") {
        _this.setState({
          attendees: [].concat(_toConsumableArray(attendees), [stream]),
          notification: SETTINGS.NOTIFICATIONS.PATIENT_CONNECTED
        });
      } else {
        // Not quite sure if we need this...
        _this.setState({
          attendees: [].concat(_toConsumableArray(attendees), [stream]),
          notification: SETTINGS.NOTIFICATIONS.PROVIDER_CONNECTED
        });
      }
    };

    _this.onDestroyAttendee = function (stream) {
      var attendees = _this.state.attendees;

      var filteredAttendees = attendees.filter(function (attendee) {
        return attendee !== stream;
      });

      var _JSON$parse2 = JSON.parse(stream.connection.data),
          userType = _JSON$parse2.userType;

      if (userType === "tdoc_member") {
        _this.setState({
          attendees: filteredAttendees,
          notification: SETTINGS.NOTIFICATIONS.PATIENT_DISCONNECTED
        });
      } else {
        // Not sure if this is needed or not...
        _this.setState({
          attendees: filteredAttendees,
          notification: SETTINGS.NOTIFICATIONS.PROVIDER_DISCONNECTED
        });
      }
    };

    _this.onPublisherStreamCreated = function (stream) {
      _this.setState({ myStreamId: stream.streamId });
    };

    _this.onSubscriberStreamCreated = function (subscriber) {
      var subscribers = _this.state.subscribers;

      _this.setState({ subscribers: [].concat(_toConsumableArray(subscribers), [subscriber]) });
    };

    _this.onPublished = function (event) {
      _this.bindCustomPublisherEvents(event);
      _this.setState({ isPublished: true });
    };

    _this.onRetryConnection = function (resolve, reject, error) {
      if ((0, _lodash.isEmpty)(error)) {
        resolve();
      } else {
        reject(error);
      }
    };

    _this.onSessionDisconnected = function (stream) {
      // if (stream.reason !== SETTINGS.REASONS.NETWORK_TIMEDOUT) return false;
      if (stream.reason !== SETTINGS.REASONS.NETWORK_TIMEDOUT) {
        _this.setState({ isPublished: false });
        return;
      }

      return new Promise(function (resolve, reject) {
        stream.target.connect(stream.target.apiKey, _this.onRetryConnection.bind(_this, resolve, reject));
      }).then(function () {
        window.location.reload(true);
      }).catch(function (error) {
        _this.onConnectionLost();
      });
    };

    _this.onSessionReconnected = function (stream) {
      _this.setState({ notification: SETTINGS.NOTIFICATIONS.SESSION_RECONNECTED });
    };

    _this.onSessionReconnecting = function (stream) {
      _this.setState({ notification: SETTINGS.NOTIFICATIONS.SESSION_RECONNECTING });
    };

    _this.isOwnStream = function (stream) {
      return stream.streamId === _this.state.myStreamId;
    };

    _this.onStartPublisher = function () {
      _this.publisher.createPublisher();
      _this.setState({
        isPublished: true,
        notification: SETTINGS.NOTIFICATIONS.PROVIDER_CONNECTED
      });
    };

    _this.onEndCall = function () {
      var subscribers = _this.state.subscribers;

      _this.publisher.disconnectSession(subscribers);
      _this.setState({
        isPublished: false,
        subscribers: []
      });
    };

    _this.renderAttendee = function (attendee, index) {
      if (!attendee) return false;

      var streamId = attendee.streamId;

      var key = streamId + '_' + index;

      var _JSON$parse3 = JSON.parse(attendee.connection.data),
          userType = _JSON$parse3.userType;

      return _react2.default.createElement(_Attendee2.default, {
        key: key,
        stream: attendee,
        userType: userType,
        onSubscribed: _this.onSubscriberStreamCreated,
        onDestroyed: _this.onDestroyAttendee
      });
    };

    _this.notCompatibleBrowserCheck = function () {
      return window.OT.checkSystemRequirements() === 0 && !window.OTPlugin.isSupported();
    };

    _this.state = {
      show: false,
      renderPublisher: null,
      isPublished: false,
      attendees: [],
      subscribers: [],
      myStreamId: null,
      config: _this.props.config,
      notification: null
    };
    return _this;
  }

  _createClass(VideoConference, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          config = _state.config,
          attendees = _state.attendees,
          isPublished = _state.isPublished,
          notification = _state.notification;

      // Logger is causing issues in IE11. Member is not able to see himself in IE11.

      _utils.logger.config({ jwt: config.jwt, baseURL: config.loggerBaseUrl, endpoint: config.loggerEndpoint });

      if (this.notCompatibleBrowserCheck()) {
        return _react2.default.createElement(
          'div',
          { className: 'not-supported-browser' },
          _react2.default.createElement(
            'p',
            null,
            'Your browser is incompatible with the video component of this application. Please upgrade to the latest version of Chrome or Firefox or download our mobile app to have a video consult.'
          )
        );
      }

      if (!config) return false;

      return _react2.default.createElement(
        'div',
        { className: 'conf-app' },
        _react2.default.createElement(
          'div',
          { className: 'conf-app--video' },
          _react2.default.createElement(
            _Conference2.default,
            {
              config: config,
              onCreatePublisher: this.onCreatePublisher,
              onStreamCreated: this.onCreateAttendee
            },
            _react2.default.createElement(
              _Attendees2.default,
              null,
              _react2.default.createElement(_Publisher2.default, {
                ref: function ref(ele) {
                  return _this2.publisher = ele;
                },
                onPublished: this.onPublished,
                onPublisherStreamCreated: this.onPublisherStreamCreated
              }),
              attendees.map(this.renderAttendee)
            ),
            _react2.default.createElement(_Notification2.default, { notification: notification }),
            _react2.default.createElement(
              _ConferenceControls2.default,
              null,
              _react2.default.createElement(_ConferenceControls.PublishControl, {
                isPublished: isPublished,
                onStart: this.onStartPublisher,
                onEnd: this.onEndCall,
                buttonClass: 'button'
              })
            )
          )
        )
      );
    }
  }]);

  return VideoConference;
}(_react.Component);

VideoConference.propTypes = {
  config: _propTypes2.default.object.isRequired
};
exports.default = VideoConference;