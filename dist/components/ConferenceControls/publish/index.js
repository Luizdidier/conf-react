'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  * React.Component representing a control for publishing.
  *
  * @class
  */
var PublishControl = function (_Component) {
  _inherits(PublishControl, _Component);

  function PublishControl() {
    _classCallCheck(this, PublishControl);

    return _possibleConstructorReturn(this, (PublishControl.__proto__ || Object.getPrototypeOf(PublishControl)).apply(this, arguments));
  }

  _createClass(PublishControl, [{
    key: 'renderText',

    /**
     * Returns a String representing the text for the control.
     *
     * @function
     * @returns {String}
     * @public
     */
    value: function renderText() {
      var isPublished = this.props.isPublished;

      var text = 'Start Call';

      if (isPublished) {
        text = 'End Call';
      }

      return text;
    }

    /**
     * Renders the control.
     *
     * @function
     * @public
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isPublished = _props.isPublished,
          onStart = _props.onStart,
          onEnd = _props.onEnd,
          buttonClass = _props.buttonClass,
          role = this._getRole(),
          action = isPublished ? onEnd : onStart;

      if (role === 'member') return null;

      return _react2.default.createElement(
        'button',
        { className: buttonClass, onClick: action },
        this.renderText()
      );
    }

    /**
     * Returns the role from the conference object.
     *
     * @returns {String}
     * @private
     */

  }, {
    key: '_getRole',
    value: function _getRole() {
      var conference = this.props.conference;
      var config = conference.props.config;
      var role = config.role;


      return role;
    }
  }]);

  return PublishControl;
}(_react.Component);

exports.default = PublishControl;