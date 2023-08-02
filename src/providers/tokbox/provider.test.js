import TokBoxProvider from './index';

describe('tokbox provider', () => {
  let OT = {};
  let publisher = {
    element: {
      style: 'display: block;'
    }
  };
  let subscriber = {
    element: {
      style: 'display: block;'
    }
  };
  let props = {
    apiKey: 'abc123',
    sessionId: 'xyz123',
    hostElement: 'host-element',
    attendeesElement: 'attendees-element',
    token: 1234,
    role: 'member'
  }

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('public api', () => {
    describe('supportsVideo', () => {
      let provider;

      beforeEach(() => {
        OT.checkSystemRequirements = jest.fn(() => true);
        provider = new TokBoxProvider({ props, OT });
        provider.supportsVideo();
      });

      it('calls the OT checkSystemRequirements method', () => {
        expect(OT.checkSystemRequirements).toHaveBeenCalled();
      });
    });

    describe('connect', () => {
      let provider;

      let session = {
        connect: jest.fn(),
        on: jest.fn()
      };

      beforeEach(() => {
        OT.initSession = jest.fn(() => session);

        provider = new TokBoxProvider({ props, OT });

        provider.connect();
      });

      it('sets isConnected to true', () => {
        expect(provider.isConnected).toBeTruthy();
      });

      it('sets the session instance on the prototype', () => {
        expect(provider.session).toEqual(session);
      });

      it('connects to the session', () => {
        expect(provider.session.connect).toHaveBeenCalledWith(props.token, provider._onConnectComplete);
      });

      it('attaches the streamCreated event', () => {
        expect(provider.session.on).toHaveBeenCalledWith('streamCreated', provider._onStreamCreated);
      });
    });

    describe('createPublisher', () => {
      let publisher = {
        on: jest.fn()
      };
      let OT = {
        initPublisher: () => publisher
      };
      let session = {
        publish: jest.fn()
      };
      let provider;

      beforeEach(() => {
        provider = new TokBoxProvider({ props, OT });
        provider.session = session;

        provider.createPublisher();
      });

      it('publishes the publisher to the session', () => {
        expect(session.publish).not.toHaveBeenCalledWith(publisher);
      });
    });

    describe('createSubscriber', () => {
      let subscriber = {
        on: jest.fn()
      };
      let session;
      let provider;
      let stream = {};
      let targetElement = {};
      let options = {};
      let eventHandler = () => {};

      beforeEach(() => {
        provider = new TokBoxProvider({ props, OT });
        provider.session = {
          subscribe: jest.fn(() => subscriber)
        };

        session = provider.session;

        provider.createSubscriber(stream, targetElement, options, eventHandler);
      });

      it('creates a subscriber to the session', () => {
        expect(session.subscribe).toHaveBeenCalledWith(
          stream,
          targetElement,
          options,
          eventHandler
        );
      });
    });
  });

  describe('private api', () => {
    let provider;

    beforeEach(() => {
      provider = new TokBoxProvider({ props, OT });
      provider.session = {
        subscribe: jest.fn(() => subscriber)
      }
      provider.trigger = jest.fn();
    });

    describe('_onStreamCreated', () => {
      let event = { stream: 'abc123' };

      beforeEach(() => {
        provider._onStreamCreated(event);
      });

      it('triggers the onStreamCreated event', () => {
        expect(provider.trigger).toHaveBeenCalledWith('onStreamCreated', event.stream);
      });
    });
  });
});
