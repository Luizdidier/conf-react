'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./ProviderPicker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProviderPicker = function (_Component) {
  _inherits(ProviderPicker, _Component);

  function ProviderPicker(props) {
    _classCallCheck(this, ProviderPicker);

    var _this = _possibleConstructorReturn(this, (ProviderPicker.__proto__ || Object.getPrototypeOf(ProviderPicker)).call(this, props));

    _this.state = {
      apiKey: '',
      sessionId: '',
      token: '',
      role: 'member',
      layout: 'fullscreen'
    };

    _this.onConnect = _this.onConnect.bind(_this);
    _this.onApiKeyChange = _this.onApiKeyChange.bind(_this);
    _this.onSessionIdChange = _this.onSessionIdChange.bind(_this);
    _this.onTokenChange = _this.onTokenChange.bind(_this);
    _this.onRoleChange = _this.onRoleChange.bind(_this);
    _this.onLayoutChange = _this.onLayoutChange.bind(_this);
    return _this;
  }

  _createClass(ProviderPicker, [{
    key: 'onApiKeyChange',
    value: function onApiKeyChange(event) {
      var state = Object.assign(this.state, { apiKey: event.target.value });

      this.setState(state);
    }
  }, {
    key: 'onSessionIdChange',
    value: function onSessionIdChange(event) {
      var state = Object.assign(this.state, { sessionId: event.target.value });

      this.setState(state);
    }
  }, {
    key: 'onTokenChange',
    value: function onTokenChange(event) {
      var state = Object.assign(this.state, { token: event.target.value });

      this.setState(state);
    }
  }, {
    key: 'onRoleChange',
    value: function onRoleChange(event) {
      var state = Object.assign(this.state, { role: event.target.value });

      this.setState(state);
    }
  }, {
    key: 'onLayoutChange',
    value: function onLayoutChange(event) {
      var state = Object.assign(this.state, { layout: event.target.value });

      this.setState(state);
    }
  }, {
    key: 'onConnect',
    value: function onConnect() {
      var _state = this.state,
          apiKey = _state.apiKey,
          sessionId = _state.sessionId,
          token = _state.token,
          role = _state.role,
          layout = _state.layout;


      this.props.onCreateConference({
        apiKey: apiKey,
        sessionId: sessionId,
        token: token,
        provider: 'tokbox',
        role: role,
        layout: layout
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'cf-provider-picker' },
        _react2.default.createElement(
          'strong',
          null,
          'Provider'
        ),
        _react2.default.createElement(
          'div',
          { className: 'cf-provider-form' },
          _react2.default.createElement(
            'div',
            { className: 'cf-provider-fieldset' },
            _react2.default.createElement(
              'select',
              null,
              _react2.default.createElement(
                'option',
                null,
                'TokBox'
              )
            ),
            _react2.default.createElement('input', { placeholder: 'API Key', value: this.state.apiKey, onChange: this.onApiKeyChange }),
            _react2.default.createElement('input', { placeholder: 'Session ID', value: this.state.sessionId, onChange: this.onSessionIdChange }),
            _react2.default.createElement('input', { placeholder: 'Token', value: this.state.token, onChange: this.onTokenChange }),
            _react2.default.createElement(
              'select',
              { onChange: this.onRoleChange },
              _react2.default.createElement(
                'option',
                { value: 'member' },
                'As Member'
              ),
              _react2.default.createElement(
                'option',
                { value: 'provider' },
                'As Provider'
              )
            ),
            _react2.default.createElement(
              'select',
              { onChange: this.onLayoutChange },
              _react2.default.createElement(
                'option',
                { value: 'fullscreen' },
                'fullscreen'
              ),
              _react2.default.createElement(
                'option',
                { value: 'boxed host--fullscreen' },
                'boxed (host fullscreen)'
              ),
              _react2.default.createElement(
                'option',
                { value: 'boxed host--boxed' },
                'boxed (host boxed)'
              )
            )
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.onConnect },
            'Connect'
          )
        )
      );
    }
  }]);

  return ProviderPicker;
}(_react.Component);

exports.default = ProviderPicker;