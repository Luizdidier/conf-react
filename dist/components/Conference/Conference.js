'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _providers = require('../../providers');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULTS = {
  HOST_CONTAINER: 'cf-video-container--host',
  ATTENDEES_CONTAINER: 'cf-video-container--attendees'
};

/**
  * React.Component representing a video Conference.
  *
  * @class
  */

var Conference = function (_Component) {
  _inherits(Conference, _Component);

  _createClass(Conference, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        onCreatePublisher: function onCreatePublisher() {}
      };
    }

    /**
     * Creates a video Conference.
     *
     * @param {object} props - Properties to be used within the component.
     */

  }]);

  function Conference(props) {
    _classCallCheck(this, Conference);

    var _this = _possibleConstructorReturn(this, (Conference.__proto__ || Object.getPrototypeOf(Conference)).call(this, props));

    var config = _this.props.config;

    var finalConfig = _extends({}, config, {
      hostElement: DEFAULTS.HOST_CONTAINER,
      attendeesElement: DEFAULTS.ATTENDEES_CONTAINER
    });

    _this._setupProvider(finalConfig);
    return _this;
  }

  /**
   * When the component is mounted, create and connect to the Provider.
   *
   * @function
   * @protected
   */


  _createClass(Conference, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.conference.connect();
    }
  }, {
    key: 'onCreatePublisher',
    value: function onCreatePublisher() {
      this.props.onCreatePublisher();
    }
  }, {
    key: 'onStreamCreated',
    value: function onStreamCreated(event) {
      this.props.onStreamCreated(event);
    }

    /**
     * React.Component#render hook. Used to render the elements used to compose the video conference.
     *
     * @function
     * @protected
     */

  }, {
    key: 'render',
    value: function render() {
      var config = this.props.config;


      (0, _utils.assert)(config, 'Please supply a config.');

      var conference = this;
      var provider = this.conference;

      var children = (0, _utils.cloneChildrenAndInjectProps)(this.props.children, { conference: conference, provider: provider });

      return _react2.default.createElement(
        'div',
        { id: 'cf-video-container' },
        children
      );
    }

    /**
     * Sets up the provider to be used.
     *
     * @private
     */

  }, {
    key: '_setupProvider',
    value: function _setupProvider(config) {
      var provider = config.provider;


      (0, _utils.assert)(provider, 'Please supply a provider in your config');

      var Provider = (0, _providers.lookup)(provider),
          conference = new Provider({
        props: config,
        component: this
      });

      this.conference = conference;

      this._setupProviderEvents();

      var onVideoProviderCreated = this.props.onVideoProviderCreated;

      if (onVideoProviderCreated) {
        onVideoProviderCreated(this.conference);
      }
    }

    /**
     * Sets up events for the provider.
     *
     * @private
     */

  }, {
    key: '_setupProviderEvents',
    value: function _setupProviderEvents() {
      this.conference.on('onCreatePublisher', this.onCreatePublisher.bind(this));
      this.conference.on('onStreamCreated', this.onStreamCreated.bind(this));
    }
  }]);

  return Conference;
}(_react.Component);

exports.default = Conference;