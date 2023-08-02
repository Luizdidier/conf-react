'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _phoenix = require('phoenix');

var _console = require('../../utils/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEYS = {
  ENTER: 13
};

/**
 * React.Component representing a Chat.
 *
 * @class
 */

var Chat = function (_Component) {
  _inherits(Chat, _Component);

  /**
   * Creates a Chat.
   *
   * @param {object} props - Properties to be used within the component.
   */
  function Chat(props) {
    _classCallCheck(this, Chat);

    var _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this, props));

    _this.Socket = _phoenix.Socket;

    _this.state = {
      messages: [],
      presence: {},
      connected: false
    };

    _this._setupEvents();
    return _this;
  }

  /**
   * When the component is mounted, create a new Socket and join the channel.
   *
   * @function
   * @protected
   */


  _createClass(Chat, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.socket = this._setupSocket();
      this.channel = this._setupChannel();
    }

    /**
     * onSendMessage event. Ussed to push a new a message to the channel.
     *
     * @public
     */

  }, {
    key: 'onSendMessage',
    value: function onSendMessage(message) {
      this.channel.push('new_msg', { body: message });
    }

    /**
     * onKeyPress event. Used to send a message on the enter key press.
     *
     * @public
     */

  }, {
    key: 'onKeyPress',
    value: function onKeyPress(e) {
      if (e.charCode === KEYS.ENTER) {
        e.preventDefault();

        var message = e.target.value;

        if (message !== '') {
          this.onSendMessage(message);
          e.target.value = '';
        }
      }
    }

    /**
     * React.Component#render. Used to create the DOM for rendering a chat.
     *
     * @protected
     */

  }, {
    key: 'render',
    value: function render() {
      var messages = this.state.messages;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'messages' },
          messages.map(function (_ref, i) {
            var body = _ref.body,
                name = _ref.name;
            return _react2.default.createElement(
              'p',
              { key: i },
              _react2.default.createElement(
                'strong',
                null,
                name
              ),
              ': ',
              body
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'message-input' },
          _react2.default.createElement('input', { onKeyPress: this.onKeyPress })
        )
      );
    }

    /**
     * Sets up the events used in the component, binding their context to that of the component instance.
     *
     * @private
     */

  }, {
    key: '_setupEvents',
    value: function _setupEvents() {
      this.onSendMessage = this.onSendMessage.bind(this);
      this.onKeyPress = this.onKeyPress.bind(this);
    }

    /**
     * Creates a Socket.
     *
     * @returns {socket}
     * @protected
     */

  }, {
    key: '_createSocket',
    value: function _createSocket() {
      var config = this.props.config;
      var chatServiceURL = config.chatServiceURL,
          guardian_token = config.jwt;


      (0, _console.assert)(chatServiceURL, 'Please provide a chat service URL');

      var options = {
        params: {
          guardian_token: guardian_token
        }
      };

      return new this.Socket(chatServiceURL, options);
    }

    /**
     * Creates a Channel.
     *
     * @returns {channel}
     * @protected
     */

  }, {
    key: '_createChannel',
    value: function _createChannel() {
      var config = this.props.config;
      var guardian_token = config.jwt,
          conf_name = config.sessionId;

      var room = 'conferences:' + conf_name;
      var options = { guardian_token: guardian_token };

      return this.socket.channel(room, options);
    }

    /**
     * Creates and connects to a socket.
     *
     * @returns {socket}
     */

  }, {
    key: '_setupSocket',
    value: function _setupSocket() {
      var socket = this._createSocket();
      socket.connect();

      return socket;
    }

    /**
     * Creates and sets up a  channel.
     *
     * @returns {channel}
     */

  }, {
    key: '_setupChannel',
    value: function _setupChannel() {
      var _this2 = this;

      var channel = this._createChannel();
      channel.join().receive('ok', function (_ref2) {
        var messages = _ref2.messages;

        var state = Object.assign(_this2.state, { connected: true });

        _this2.setState(state);
      }).receive('error', function () {
        var state = Object.assign(_this2.state, { connected: false });

        _this2.setState(state);
      });

      channel.on('presence_state', function (initialPresence) {
        var presence = _phoenix.Presence.syncState(_this2.state.presence, initialPresence);

        _this2.setState(Object.assign(_this2.state, { presence: presence }));
      });

      channel.on('presence_diff', function (diff) {
        var oldPresence = _this2.state.presence.presence;

        var syncedPresence = _phoenix.Presence.syncDiff(oldPresence, diff);

        _this2.setState(Object.assign(_this2.state, { presence: presence }));
      });

      channel.on('new_msg', function (message) {
        var messages = _this2.state.messages;


        messages.push(message);

        _this2.setState(Object.assign(_this2.state, { messages: messages }));

        var messagesEle = document.querySelector('.messages');

        messagesEle.scrollTop = messagesEle.scrollHeight;
      });

      return channel;
    }
  }]);

  return Chat;
}(_react.Component);

exports.default = Chat;