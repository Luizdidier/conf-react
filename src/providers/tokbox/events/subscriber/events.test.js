import TokBoxSubscriberEvents, { EVENTS } from './';
import { logger } from '../../../../utils';

describe('TokBoxSubscriberEvents', () => {
  let subscriber = {
    on: jest.fn()
  };
  let instance;

  beforeEach(() => {
    logger.config({ jwt: 'abc123' });
    logger.log = jest.fn();
    instance = new TokBoxSubscriberEvents(subscriber);
  });

  describe('constructor', () => {
    it('attaches events to the subscriber', () => {
      expect(subscriber.on).toHaveBeenCalled();
    });
  });

  describe('events', () => {
    describe('onConnected', () => {
      let { connected } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onConnected(event);
      });

      it(`logged the event ${connected}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${connected}`, event);
      });
    });

    describe('onDestroyed', () => {
      let { destroyed } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onDestroyed(event);
      });

      it(`logged the event ${destroyed}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${destroyed}`, event);
      });
    });

    describe('onDisconnected', () => {
      let { disconnected } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onDisconnected(event);
      });

      it(`logged the event ${disconnected}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${disconnected}`, event);
      });
    });

    describe('onVideoDimensionsChanged', () => {
      let { videoDimensionsChanged } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onVideoDimensionsChanged(event);
      });

      it.skip(`logged the event ${videoDimensionsChanged}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${videoDimensionsChanged}`, event);
      });
    });

    describe('onVideoDisabled', () => {
      let { videoDisabled } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onVideoDisabled(event);
      });

      it.skip(`logged the event ${videoDisabled}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${videoDisabled}`, event);
      });
    });

    describe('onVideoDisableWarning', () => {
      let { videoDisableWarning } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onVideoDisableWarning(event);
      });

      it.skip(`logged the event ${videoDisableWarning}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${videoDisableWarning}`, event);
      });
    });

    describe('onVideoDisableWarningLifted', () => {
      let { videoDisableWarningLifted } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onVideoDisableWarningLifted(event);
      });

      it.skip(`logged the event ${videoDisableWarningLifted}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${videoDisableWarningLifted}`, event);
      });
    });

    describe('onVideoElementCreated', () => {
      let { videoElementCreated } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onVideoElementCreated(event);
      });

      it.skip(`logged the event ${videoElementCreated}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${videoElementCreated}`, event);
      });
    });

    describe('onVideoEnabled', () => {
      let { videoEnabled } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onVideoEnabled(event);
      });

      it.skip(`logged the event ${videoEnabled}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SUBSCRIBER_${videoEnabled}`, event);
      });
    });
  });
});
