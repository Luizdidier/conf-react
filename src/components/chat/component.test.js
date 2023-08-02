import React from 'react';
import { mount } from 'enzyme';
import Chat from './index';
import { Channel, Socket } from 'phoenix';

describe('rendering component', () => {
  describe('public api', () => {
    describe('componentDidMount', () => {
      let chat;
      let mockedMethods;

      beforeEach(() => {
        class ExtendedChat extends Chat {}

        mockedMethods = {
          _setupSocket: jest.fn(),
          _setupChannel: jest.fn()
        };

        Object.assign(ExtendedChat.prototype, mockedMethods);

        chat = mount(<ExtendedChat />);
      });

      it('creates a socket', () => {
        expect(mockedMethods._setupSocket).toHaveBeenCalled();
      });

      it('creates a channel', () => {
        expect(mockedMethods._setupChannel).toHaveBeenCalled();
      });
    });
  });

  describe('private api', () => {
    describe('_setupEvents', () => {
      let chat;

      beforeEach(() => {
        chat = new Chat();

        chat.onSendMessage = {
          bind: jest.fn((i) => i)
        };
        chat.onKeyPress = {
          bind: jest.fn((i) => i)
        }
        chat._setupEvents();
      });

      it('binds the context of onSendMessage to instance of Chat', () => {
        expect(chat.onSendMessage).toBeInstanceOf(Chat);
      });

      it('binds the context of onKeyPress to instance of Chat', () => {
        expect(chat.onKeyPress).toBeInstanceOf(Chat);
      });
    });

    describe('_createSocket', () => {
      let chat;
      let socket;

      beforeEach(() => {
        chat = new Chat();
        chat.props = {
          config: {
            jwt: 'abc123',
            chatServiceURL: 'wss://path.com/to/websocket'
          }
        };

        socket = chat._createSocket();
      });

      it('returns a new socket instance', () => {
        expect(socket).toBeInstanceOf(Socket);
      });

      describe('intialization of socket', () => {
        beforeEach(() => {
          chat.props.config.chatServiceURL = 'http://example.com';
          chat.Socket = jest.fn();
          chat._createSocket();
        });

        it('passes the correct arguments', () => {
          expect(chat.Socket).toHaveBeenCalledWith(
            chat.props.config.chatServiceURL,
            { 'params': { 'guardian_token': chat.props.config.jwt }}
          );
        });
      });
    });

    describe('_createChannel', () => {
      let chat;
      let channel;

      beforeEach(() => {
        chat = new Chat();
        chat.props = {
          config: {
            jwt: 'abc123',
            sessionId: '456xyz'
          }
        };
        chat.socket = new Socket('/myendpoint', { params: { guardian_token: 'abc123' } });

        channel = chat._createChannel();
      });

      it('returns an new channel', () => {
        expect(channel).toBeInstanceOf(Channel);
      });
    });

    describe('_setupSocket', () => {
      let chat;
      let channel;
      let socket = new Socket('/myendpoint', { params: { guardian_token: 'abc123' }});
      let returnedSocket;

      beforeEach(() => {
        chat = new Chat();

        socket.connect = jest.fn();
        chat._createSocket = jest.fn(() => socket);

        returnedSocket = chat._setupSocket();
      });

      it('creates a socket and connects to it', () => {
        expect(socket.connect).toHaveBeenCalled();
        expect(returnedSocket).toEqual(socket);
      });
    });

    describe('_setupChannel', () => {
      let chat;
      let mockChannel;
      let returnedChannel;

      beforeEach(() => {
        let MockChannel = function() {
          this.join = jest.fn(() => this);
          this.receive = jest.fn(() => this);
          this.on = jest.fn(() => this);
        };
        mockChannel = new MockChannel();

        chat = new Chat();

        chat._createChannel = jest.fn(() => mockChannel);

        returnedChannel = chat._setupChannel();
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('creates a channel and joins it', () => {
        expect(mockChannel.join).toHaveBeenCalled();
      });

      it('attaches a presence_state event handler to the channel', () => {
        expect(mockChannel.on).toHaveBeenCalledTimes(3);
      });
    });
  });
});
