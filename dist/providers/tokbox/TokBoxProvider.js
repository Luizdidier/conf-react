'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _events = require('./events');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Class representing the TokBox provider. */
var TokBoxProvider = function (_BaseProvider) {
  _inherits(TokBoxProvider, _BaseProvider);

  /**
   * Creates a TokBoxProvider.
   */
  function TokBoxProvider(_ref) {
    var props = _ref.props,
        component = _ref.component,
        _ref$OT = _ref.OT,
        OT = _ref$OT === undefined ? window.OT : _ref$OT;

    _classCallCheck(this, TokBoxProvider);

    var _this = _possibleConstructorReturn(this, (TokBoxProvider.__proto__ || Object.getPrototypeOf(TokBoxProvider)).apply(this, arguments));

    _this.subscribers = [];

    _this.OT = OT;
    _this._extractProps(props);
    _this._addEventHandlers();
    _this.component = component || {};
    _this.publisherEvents = [];
    _this.subscriberEvents = [];
    _this.isConnected = false;
    return _this;
  }

  /**
   * Creates an initializes a session.
   *
   * @public
   */


  _createClass(TokBoxProvider, [{
    key: 'connect',
    value: function connect() {
      if (this.isConnected) {
        return this.session;
      }

      _get(TokBoxProvider.prototype.__proto__ || Object.getPrototypeOf(TokBoxProvider.prototype), 'connect', this).apply(this, arguments);

      this.session = this.OT.initSession(this.api_key, this.session_id);

      this.sessionEvents = new _events.TokBoxSessionEvents(this.session);

      this.session.connect(this.token, this._onConnectComplete);
      this.session.on(_events.SESSION_EVENTS.STREAM_CREATED, this._onStreamCreated);

      this.isConnected = true;

      return this.session;
    }

    /**
     * Creates and returns an instance of a publisher.
     *
     * @param targetElement {DOMElement}
     * @param options {Object}
     * @param eventHandler {Function}
     * @returns {Publisher}
     * @public
     */

  }, {
    key: 'createPublisher',
    value: function createPublisher(targetElement, options, eventHandler) {
      if (!this.session) {
        this.connect();
      }

      var publisher = this.OT.initPublisher(targetElement, options, eventHandler);
      var publisherEvents = new _events.TokBoxPublisherEvents(publisher);

      this.publisherEvents.push(publisherEvents);

      return publisher;
    }

    /**
     * Creates and returns an isntance of a subscirber.
     *
     * @param stream {Stream}
     * @param targetElement {DOMElement}
     * @param options {Object}
     * @param eventHander {Function}
     * @returns {Subscriber}
     * @public
     */

  }, {
    key: 'createSubscriber',
    value: function createSubscriber(stream, targetElement, options, eventHandler) {
      var subscriber = this.session.subscribe(stream, targetElement, options, eventHandler);
      var subscriberEvents = new _events.TokBoxSubscriberEvents(subscriber);

      this.subscriberEvents.push(subscriberEvents);

      return subscriber;
    }

    //////////

  }, {
    key: 'tmpPromisify',
    value: function tmpPromisify(fn) {
      return function () {
        var args = Array.from(arguments);
        return new Promise(function (resolve, reject) {
          return fn.apply(undefined, _toConsumableArray(args).concat([function (error, content) {
            return error ? reject(error) : resolve(content);
          }]));
        });
      };
    }
  }, {
    key: 'statsFnBuilder',
    value: function statsFnBuilder(subscriber) {
      var iPromisedYouStats = this.tmpPromisify(subscriber.getStats);

      return function (completionHandler) {
        iPromisedYouStats().then(function (results) {
          var completeStats = _extends({}, results, {
            width: subscriber.videoWidth(),
            height: subscriber.videoHeight()
          });

          completionHandler(completeStats);
        });
      };
    }
    //////////

    /**
     * Uses TokBox default system check.
     *
     * TODO Integrate that undocumented plugin call somehow.
     */

  }, {
    key: 'supportsVideo',
    value: function supportsVideo() {
      return !!this.OT.checkSystemRequirements();
    }

    /**
     * Attaches the properties onto the prototype instance.
     *
     * @param {Object} props - The configuration object.
     * @private
     */

  }, {
    key: '_extractProps',
    value: function _extractProps(props) {
      var api_key = props.apiKey,
          session_id = props.sessionId,
          token = props.token,
          hostElement = props.hostElement,
          attendeesElement = props.attendeesElement,
          role = props.role;


      (0, _utils.assert)(api_key, 'Please define an api key');
      (0, _utils.assert)(session_id, 'Please define a session id');

      this.api_key = api_key;
      this.session_id = session_id;
      this.token = token;
      this.hostElement = hostElement;
      this.attendeesElement = attendeesElement;
      this.role = role;
    }

    /**
     * Adds the event listeners available for TokBox.
     *
     * @private
     */

  }, {
    key: '_addEventHandlers',
    value: function _addEventHandlers() {
      this._onConnectComplete = this._onConnectComplete.bind(this);
      this._onConnectError = this._onConnectError.bind(this);
      this._onStreamCreated = this._onStreamCreated.bind(this);
      this._onSessionSubscribed = this._onSessionSubscribed.bind(this);
      this._onSessionSubscribedSuccess = this._onSessionSubscribedSuccess.bind(this);
      this._onSessionSubscribedFailure = this._onSessionSubscribedFailure.bind(this);
    }

    /**
     * Event handler when the connection to TokBox is complete.
     *
     * @event
     * @private
     */

  }, {
    key: '_onConnectComplete',
    value: function _onConnectComplete(error) {
      if (error) {
        return this._onConnectError();
      }

      this.trigger('sessionCreated');
    }

    /**
     * Event handler when the connection to TokBox encounters an error.
     *
     * @event
     * @private
     */

  }, {
    key: '_onConnectError',
    value: function _onConnectError() {
      this.trigger('connectFailure');
    }

    /**
     * Event handler when the connection to TokBox triggers a stream created.
     * This will trigger when someone joins a "room".
     *
     * @event
     * @private
     */

  }, {
    key: '_onStreamCreated',
    value: function _onStreamCreated(_ref2) {
      var stream = _ref2.stream;

      this.trigger('onStreamCreated', stream);
    }

    /**
     * Event handler when there is a session that has subscribed.
     * This triggers when a stream is created successfully.
     *
     * @event
     * @private
     */

  }, {
    key: '_onSessionSubscribed',
    value: function _onSessionSubscribed(error) {
      if (error) {
        return this._onSessionSubscribedFailure();
      }

      return this._onSessionSubscribedSuccess();
    }

    /**
     * Event handler for when a session has subscribed is successful.
     *
     * @event
     * @private
     */

  }, {
    key: '_onSessionSubscribedSuccess',
    value: function _onSessionSubscribedSuccess() {
      this.trigger('subscribeSuccess');
    }

    /**
     * Event handler for when a session has subscribed an encounters an error.
     *
     * @event
     * @private
     */

  }, {
    key: '_onSessionSubscribedFailure',
    value: function _onSessionSubscribedFailure() {
      this.trigger('subscribeFailure');
    }
  }]);

  return TokBoxProvider;
}(_base2.default);

exports.default = TokBoxProvider;