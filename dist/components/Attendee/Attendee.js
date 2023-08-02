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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  * React.Component representing an attendee.
  *
  * @class
  */
var Attendee = function (_Component) {
  _inherits(Attendee, _Component);

  _createClass(Attendee, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        onSubscribed: function onSubscribed() {},
        onDestroyed: function onDestroyed() {},
        subscriberOptions: {}
      };
    }

    /**
     * Set up for props and default options.
     *
     * @constructor
     */

  }]);

  function Attendee(props) {
    _classCallCheck(this, Attendee);

    var _this = _possibleConstructorReturn(this, (Attendee.__proto__ || Object.getPrototypeOf(Attendee)).call(this, props));

    var subscriberOptions = props ? props.subscriberOptions || {} : {};

    _this.options = _extends({
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, subscriberOptions);
    return _this;
  }

  /**
   * Initializes a subscriber when component is mounted.
   *
   * @public
   */


  _createClass(Attendee, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          stream = _props.stream,
          provider = _props.provider;

      var targetElement = this._getElement();
      var options = this.options;


      this.subscriber = provider.createSubscriber(stream, targetElement, options, this.onSubscribed.bind(this));

      this.subscriber.on('subscribeSuccess', this.onSubscribed.bind(this));

      this.subscriber.on('destroyed', this.onDestroyed.bind(this));
    }

    /**
     * Calls the onSubscribed method passed in via props.
     *
     * @event
     */

  }, {
    key: 'onSubscribed',
    value: function onSubscribed() {
      var provider = this.props.provider;

      var statsFn = provider.statsFnBuilder(this.subscriber);
      this.props.onSubscribed(this.subscriber, statsFn);
    }

    /**
     * Calls the onDestroyed method passed in via props.
     *
     * @event~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */

  }, {
    key: 'onDestroyed',
    value: function onDestroyed() {
      var stream = this.props.stream;


      this.props.onDestroyed(stream, this.subscriber);
    }

    /**
     * Renders the target element for the attendee.
     *
     * @public
     */

  }, {
    key: 'render',
    value: function render() {
      var userType = this.props.userType;

      return _react2.default.createElement('div', { className: 'cf-attendee ' + userType });
    }

    /**
     * Returns the element of the component.
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

  return Attendee;
}(_react.Component);

exports.default = Attendee;