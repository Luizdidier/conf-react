import TokBoxSessionEvents, { EVENTS } from './index';
import { logger } from '../../../../utils';

describe('TokBoxSessionEvents', () => {
  let session = {
    on: jest.fn()
  };
  let instance;

  beforeEach(() => {
    logger.config({ jwt: 'abc123' });
    logger.log = jest.fn();
    instance = new TokBoxSessionEvents(session);
  });

  describe('constructor', () => {
    it('attaches events to the session', () => {
      expect(session.on).toHaveBeenCalled();
    });
  });

  describe('events', () => {
    describe('onArchiveStarted', () => {
      let { archiveStarted } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onArchiveStarted(event);
      });

      it.skip(`logged the event ${archiveStarted}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SESSION_${archiveStarted}`, event);
      });
    });

    describe('onArchiveStopped', () => {
      let { archiveStopped } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onArchiveStopped(event);
      });

      it.skip(`logged the event ${archiveStopped}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SESSION_${archiveStopped}`, event);
      });
    });

    describe('onConnectionCreated', () => {
      let { connectionCreated } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onConnectionCreated(event);
      });

      it.skip(`logged the event ${connectionCreated}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SESSION_${connectionCreated}`, event);
      });
    });

    describe('onConnectionDestroyed', () => {
      let { connectionDestroyed } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onConnectionDestroyed(event);
      });

      it.skip(`logged the event ${connectionDestroyed}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SESSION_${connectionDestroyed}`, event);
      });
    });

    describe('onSessionConnected', () => {
      let { sessionConnected } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onSessionConnected(event);
      });

      it(`logged the event ${sessionConnected}`, () => {
        expect(logger.log).toHaveBeenCalledWith(sessionConnected, event);
      });
    });

    describe('onSessionDisconnected', () => {
      let { sessionDisconnected } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onSessionDisconnected(event);
      });

      it(`logged the event ${sessionDisconnected}`, () => {
        expect(logger.log).toHaveBeenCalledWith(sessionDisconnected, event);
      });
    });

    describe('onSessionReconnected', () => {
      let { sessionReconnected } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onSessionReconnected(event);
      });

      it(`logged the event ${sessionReconnected}`, () => {
        expect(logger.log).toHaveBeenCalledWith(sessionReconnected, event);
      });
    });

    describe('onSessionReconnecting', () => {
      let { sessionReconnecting } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onSessionReconnecting(event);
      });

      it.skip(`logged the event ${sessionReconnecting}`, () => {
        expect(logger.log).toHaveBeenCalledWith(sessionReconnecting, event);
      });
    });

    describe('onStreamCreated', () => {
      let { streamCreated } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onStreamCreated(event);
      });

      it.skip(`logged the event ${streamCreated}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SESSION_${streamCreated}`, event);
      });
    });

    describe('onStreamDestroyed', () => {
      let { streamDestroyed } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onStreamDestroyed(event);
      });

      it.skip(`logged the event ${streamDestroyed}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SESSION_${streamDestroyed}`, event);
      });
    });

    describe('onStreamPropertyChanged', () => {
      let { streamPropertyChanged } = EVENTS;
      let event = {};

      beforeEach(() => {
        instance.onStreamPropertyChanged(event);
      });

      it.skip(`logged the event ${streamPropertyChanged}`, () => {
        expect(logger.log).toHaveBeenCalledWith(`SESSION_${streamPropertyChanged}`, event);
      });
    });
  });
});
