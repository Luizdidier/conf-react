import Attendee from './index';
import TokBoxProvider from '../../providers/tokbox/TokBoxProvider';

describe('rendering component', () => {
  let component;

  let subscriber = {
    on: jest.fn()
  };

  let event = {
    stream: {}
  };

  let subscriberOptions = {};

  let provider = {
    session: {
      subscribe: jest.fn(() => subscriber)
    },
    createSubscriber: jest.fn(() => subscriber)
  };

  beforeEach(() => {
    component = new Attendee();
    component.props = { event, provider, subscriberOptions };
    component._getElement = jest.fn();
    component.attachEvents = jest.fn();
  });

  describe('constructor', () => {
    it('sets options for subscriber', () => {
      let options = { insertMode: 'append', width: '100%', height: '100%' };
      expect(component.options).toEqual(options);
    });
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      component.componentDidMount();
    });

    it('sets the subscriber', () => {
      expect(component.subscriber).toEqual(subscriber);
    });
  });

  describe('events', () => {
    const stream = {},
      onDestroyed = jest.fn(),
      onSubscribed = jest.fn(),
      dummySubscriber = { on: () => '' },
      fakeStatsFnBuilder = jest.fn(),
      dummyProviderObject = { createSubscriber: () => dummySubscriber, statsFnBuilder: () => fakeStatsFnBuilder };
    beforeEach(() => {
      component.props = { stream, onDestroyed, onSubscribed, provider: dummyProviderObject };
      component.componentDidMount();
    });

    describe('onDestroyed', () => {
      beforeEach(() => {
        component.onDestroyed();
      });

      it('calls the onDestroyed prop', () => {
        expect(onDestroyed).toHaveBeenCalledWith(stream, dummySubscriber);
      });
    });

    describe('onSubscribed', () => {
      beforeEach(() => {
        component.onSubscribed();
      });

      it("calls the onSubscribed prop with instance's subscriber value", () => {
        expect(onSubscribed).toHaveBeenCalledWith(dummySubscriber, fakeStatsFnBuilder);
      });
    });
  });
});
