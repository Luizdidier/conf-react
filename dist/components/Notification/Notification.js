'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notification = function Notification(props) {

  if ((0, _lodash.isEmpty)(props.notification)) {
    return false;
  }
  return _react2.default.createElement(
    'div',
    { className: 'notification-status' },
    _react2.default.createElement(
      'p',
      null,
      props.notification
    )
  );
};

Notification.propTypes = {
  notification: _propTypes2.default.string
};

exports.default = Notification;