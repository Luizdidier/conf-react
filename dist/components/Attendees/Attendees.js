'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Attendees = function (_Component) {
  _inherits(Attendees, _Component);

  function Attendees() {
    _classCallCheck(this, Attendees);

    return _possibleConstructorReturn(this, (Attendees.__proto__ || Object.getPrototypeOf(Attendees)).apply(this, arguments));
  }

  _createClass(Attendees, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          conference = _props.conference,
          provider = _props.provider;

      var children = (0, _utils.cloneChildrenAndInjectProps)(this.props.children, { conference: conference, provider: provider });

      return _react2.default.createElement(
        'div',
        { id: 'cf-video-container--attendees' },
        children
      );
    }
  }]);

  return Attendees;
}(_react.Component);

exports.default = Attendees;