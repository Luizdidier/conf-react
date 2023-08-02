import TokBoxPublisherEvents, { EVENTS } from './index';
import { logger } from '../../../../utils';

describe('TokBoxPublisherEvents', () => {
  let publisher = {
    on: jest.fn()
  };
  let instance;

  beforeEach(() => {
    logger.config({ jwt: 'abc123' });
    logger.log = jest.fn();
    instance = new TokBoxPublisherEvents(publisher);
  });

  describe('constructor', () => {
    it('attaches events to the publisher', () => {
      expect(publisher.on).toHaveBeenCalled();
    });
  });

  describe('events', () => {
    describe('onAccessAllowed', () => {
      let { accessAllowed } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onAccessAllowed(event);
      });

      it.skip(`logged the event ${accessAllowed}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${accessAllowed}`, event);
      });
    });

    describe('onAccessDenied', () => {
      let { accessDenied } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onAccessDenied(event);
      });

      it.skip(`logged the event ${accessDenied}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${accessDenied}`, event);
      });
    });

    describe('onAccessDialogClosed', () => {
      let { accessDialogClosed } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onAccessDialogClosed(event);
      });

      it.skip(`logged the event ${accessDialogClosed}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${accessDialogClosed}`, event);
      });
    });

    describe('onAccessDialogOpened', () => {
      let { accessDialogOpened } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onAccessDialogOpened(event);
      });

      it.skip(`logged the event ${accessDialogOpened}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${accessDialogOpened}`, event);
      });
    });

    describe('onDestroyed', () => {
      let { destroyed } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onDestroyed(event);
      });

      it.skip(`logged the event ${destroyed}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${destroyed}`, event);
      });
    });

    describe('onMediaStopped', () => {
      let { mediaStopped } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onMediaStopped(event);
      });

      it.skip(`logged the event ${mediaStopped}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${mediaStopped}`, event);
      });
    });

    describe('onStreamCreated', () => {
      let { streamCreated } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onStreamCreated(event);
      });

      it(`logged the event ${streamCreated}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${streamCreated}`, event);
      });
    });

    describe('onStreamDestroyed', () => {
      let { streamDestroyed } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onStreamDestroyed(event);
      });

      it(`logged the event ${streamDestroyed}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${streamDestroyed}`, event);
      });
    });

    describe('onVideoDimensionsChanged', () => {
      let { videoDimensionsChanged } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onVideoDimensionsChanged(event);
      });

      it.skip(`logged the event ${videoDimensionsChanged}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${videoDimensionsChanged}`, event);
      });
    });

    describe('onVideoElementCreated', () => {
      let { videoElementCreated } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onVideoElementCreated(event);
      });

      it.skip(`logged the event ${videoElementCreated}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`PUBLISHER_${videoElementCreated}`, event);
      });
    });
  });
});
