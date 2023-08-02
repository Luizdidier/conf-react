'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Clones children and injects the props passed in.
 *
 * @param children
 * @param props
 * @returns {Array}
 */

var cloneChildrenAndInjectProps = function cloneChildrenAndInjectProps(children, props) {
  return _react.Children.map(children, function (child) {
    if ((0, _react.isValidElement)(child)) {
      return (0, _react.cloneElement)(child, props);
    }
    return child;
  });
};

exports.default = cloneChildrenAndInjectProps;