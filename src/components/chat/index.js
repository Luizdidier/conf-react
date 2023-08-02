import React, { Component } from 'react';
import { Socket, Presence } from 'phoenix';
import { assert } from '../../utils/console';

const KEYS = {
  ENTER: 13
};

/**
 * React.Component representing a Chat.
 *
 * @class
 */
class Chat extends Component {
  /**
   * Creates a Chat.
   *
   * @param {object} props - Properties to be used within the component.
   */
  constructor(props) {
    super(props);

    this.Socket = Socket;

    this.state = {
      messages: [],
      presence: {},
      connected: false
    };

    this._setupEvents();
  }

  /**
   * When the component is mounted, create a new Socket and join the channel.
   *
   * @function
   * @protected
   */
  componentDidMount() {
    this.socket = this._setupSocket();
    this.channel = this._setupChannel();
  }

  /**
   * onSendMessage event. Ussed to push a new a message to the channel.
   *
   * @public
   */
  onSendMessage(message) {
    this.channel.push('new_msg', { body: message });
  }

  /**
   * onKeyPress event. Used to send a message on the enter key press.
   *
   * @public
   */
  onKeyPress(e) {
    if (e.charCode === KEYS.ENTER) {
      e.preventDefault();

      let message = e.target.value;

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
  render() {
    let { messages } = this.state;

    return (
      <div>
        <div className="messages">
          {messages.map(({ body, name }, i) =>
            <p key={i}>
              <strong>{name}</strong>: {body}
            </p>
          )}
        </div>
        <div className="message-input">
          <input onKeyPress={this.onKeyPress} />
        </div>
      </div>
    );
  }

  /**
   * Sets up the events used in the component, binding their context to that of the component instance.
   *
   * @private
   */
  _setupEvents() {
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  /**
   * Creates a Socket.
   *
   * @returns {socket}
   * @protected
   */
  _createSocket() {
    let { config } = this.props;

    let {
      chatServiceURL,
      jwt: guardian_token,
    } = config;

    assert(chatServiceURL, 'Please provide a chat service URL');

    let options = {
      params: {
        guardian_token
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
  _createChannel() {
    let { config } = this.props;
    let { jwt: guardian_token, sessionId: conf_name } = config;
    let room = `conferences:${conf_name}`;
    let options = { guardian_token };

    return this.socket.channel(room, options);
  }

  /**
   * Creates and connects to a socket.
   *
   * @returns {socket}
   */
  _setupSocket() {
    let socket = this._createSocket();
    socket.connect();

    return socket;
  }

  /**
   * Creates and sets up a  channel.
   *
   * @returns {channel}
   */
  _setupChannel() {
    let channel = this._createChannel();
    channel.join()
      .receive('ok', ({ messages }) => {
        let state = Object.assign(this.state, { connected: true });

        this.setState(state);
      })
      .receive('error', () => {
        let state = Object.assign(this.state, { connected: false });

        this.setState(state);
      });

    channel.on('presence_state', (initialPresence) => {
      let presence = Presence.syncState(this.state.presence, initialPresence);

      this.setState(Object.assign(this.state, { presence }));
    });

    channel.on('presence_diff', (diff) => {
      let { presence: oldPresence } = this.state.presence;
      let syncedPresence = Presence.syncDiff(oldPresence, diff);

      this.setState(Object.assign(this.state, { presence }));
    });

    channel.on('new_msg', (message) => {
      let { messages } = this.state;

      messages.push(message);

      this.setState(Object.assign(this.state, { messages }));

      let messagesEle = document.querySelector('.messages');

      messagesEle.scrollTop = messagesEle.scrollHeight;
    });

    return channel;
  }
}

export default Chat;
