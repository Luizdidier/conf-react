'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lookup;

var _registry = require('./registry');

var _registry2 = _interopRequireDefault(_registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Looks up the provider in the registry.
 *
 * @param {string} provider - The provider to be looked up.
 * @returns {class}
 */
function lookup(provider) {
  return _registry2.default[provider];
}