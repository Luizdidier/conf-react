'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _session = require('../../providers/tokbox/events/session');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React.Component representing a publisher. This is the user who is attending the conference.
 *
 * @class
 */
var Publisher = function (_Component) {
  _inherits(Publisher, _Component);

  _createClass(Publisher, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        autoPublish: true,
        onPublished: function onPublished() {}
      };
    }

    /**
     * Set up props and defines default properties.
     *
     * @constructor
     */

  }]);

  function Publisher(props) {
    _classCallCheck(this, Publisher);

    var _this = _possibleConstructorReturn(this, (Publisher.__proto__ || Object.getPrototypeOf(Publisher)).call(this, props));

    _this.defaultProperties = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    return _this;
  }

  /**
   * Initializes a publisher for the current session.
   *
   * @public
   */


  _createClass(Publisher, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var autoPublish = this.props.autoPublish;


      if (autoPublish) {
        this.createPublisher();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.publishAudio !== prevProps.publishAudio) {
        if (this.publisher) {
          var publishAudio = this.props.publishAudio;

          this.publisher.publishAudio(publishAudio);
        }
      }
    }
  }, {
    key: 'createPublisher',
    value: function createPublisher() {
      var defaultProperties = this.defaultProperties,
          provider = this.props.provider;
      var _props$properties = this.props.properties,
          properties = _props$properties === undefined ? {} : _props$properties;

      properties = _extends({}, defaultProperties, properties);
      var targetElement = this._getElement();

      this.publisher = provider.createPublisher(targetElement, properties, this.onPublished.bind(this));

      this.publisher.on('streamCreated', this.onPublisherStreamCreated.bind(this));
      this.publisher.on('subscribeSuccess', this.onSubscribeSuccess.bind(this));
      // Support for autopublishing
      // if is connected (manual publishing) then publish immediately
      // otherwise (auto publishing) listen for the sessionConnected event and then publish
      if (provider.session.currentState === 'connected') {
        provider.session.publish(this.publisher);
      } else {
        provider.session.on(_session.EVENTS.SESSION_CONNECTED, this.onSessionConnected.bind(this));
      }
    }
  }, {
    key: 'destroyPublisher',
    value: function destroyPublisher() {
      this.publisher.destroy();
    }
  }, {
    key: 'disconnectSession',
    value: function disconnectSession(subscribers) {
      var session = this.publisher.session;

      subscribers.forEach(function (subscriber) {
        return session.unsubscribe(subscriber);
      });
      session.disconnect();
      this.destroyPublisher();
    }
    /**
     * Renders the DOM element for the component.
     *
     * @public
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { 'aria-label': 'Members Video Panel', tabIndex: '1', id: 'cf-video-container--host' });
    }

    /**
     * Fired when the publisher's stream is created.
     *
     * Developed to avoid race conditions during initialization
     * for the video test.
     */

  }, {
    key: 'onPublisherStreamCreated',
    value: function onPublisherStreamCreated(event) {
      if (!this.props.onPublisherStreamCreated) {
        return;
      }

      this.props.onPublisherStreamCreated(event.stream, this.publisher);
    }
  }, {
    key: 'onSubscribeSuccess',
    value: function onSubscribeSuccess(event) {
      if (!this.props.onSubscriberStreamCreated) {
        return;
      }

      this.props.onSubscriberStreamCreated(event, this.publisher);
    }
    /**
     * Event handler for when the publisher is published.
     *
     * @event
     * @public
     */

  }, {
    key: 'onPublished',
    value: function onPublished() {
      this.props.onPublished(this);
    }

    /**
     * Event handler for when the session is connected.
     *
     * @event
     * @public
     */

  }, {
    key: 'onSessionConnected',
    value: function onSessionConnected() {
      var provider = this.props.provider;

      provider.session.publish(this.publisher);
    }

    /**
     * Returns the DOMElement for the component.
     *
     * @returns {DOMElement}
     * @private
     */

  }, {
    key: '_getElement',
    value: function _getElement() {
      return _reactDom2.default.findDOMNode(this);
    }
  }]);

  return Publisher;
}(_react.Component);

exports.default = Publisher;