import { logger } from '../../../../utils';

import reverseEvents from '../reverse-events';

/** Constant represting events for sessions.  */
export const EVENTS = {
  archiveStarted: 'ARCHIVE_STARTED',
  archiveStopped: 'ARCHIVE_STOPPED',
  connectionCreated: 'CONNECTION_CREATED',
  connectionDestroyed: 'CONNECTION_DESTROYED',
  sessionConnected: 'SESSION_CONNECTED',
  sessionDisconnected: 'SESSION_DISCONNECTED',
  sessionReconnected: 'SESSION_RECONNECTED',
  sessionReconnecting: 'SESSION_RECONNECTING',
  streamCreated: 'STREAM_CREATED',
  streamDestroyed: 'STREAM_DESTROYED',
  streamPropertyChanged: 'STREAM_PROPERTY_CHANGED'
};

reverseEvents(EVENTS);

EVENTS.withPrefix = function(str) {
  return `SESSION_${str}`;
}

/** Class managing event logging for TokBox provider. */
class TokBoxSessionEvents {
  /**
   * Creates a TokBoxSessionEvents instance.
   */
  constructor(session) {
    this.session = session;

    session.on({
      archiveStarted: this.onArchiveStarted,
      archiveStopped: this.onArchiveStopped,
      connectionCreated: this.onConnectionCreated,
      connectionDestroyed: this.onConnectionDestroyed,
      sessionConnected: this.onSessionConnected,
      sessionDisconnected: this.onSessionDisconnected,
      sessionReconnected: this.onSessionReconnected,
      sessionReconnecting: this.onSessionReconnecting,
      streamCreated: this.onStreamCreated,
      streamDestroyed: this.onStreamDestroyed,
      streamPropertyChanged: this.onStreamPropertyChanged
    });
  }
  /**
   *
   * @event
   */
  onSessionConnected(event) {
    logger.log(EVENTS.sessionConnected, event);
  }

  /**
   *
   * @event
   */
  onSessionDisconnected(event) {
    logger.log(EVENTS.sessionDisconnected, event);
  }

  /**
   *
   * @event
   */
  onSessionReconnected(event) {
    logger.log(EVENTS.sessionReconnected, event);
  }

  /**
   * Logging is disabled on the below events they dont provide any relevant/useful info about the video call.
  /**

  /**
   *
   * @event
   */
  onArchiveStarted(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.archiveStarted), event);
  }

  /**
   *
   * @event
   */
  onArchiveStopped(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.archiveStopped), event);
  }

  /**
   *
   * @event
   */
  onConnectionCreated(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.connectionCreated), event);
  }

  /**
   *
   * @event
   */
  onConnectionDestroyed(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.connectionDestroyed), event);
  }

  /**
   *
   * @event
   */
  onSessionReconnecting(event) {
    // logger.log(EVENTS.sessionReconnecting, event);
  }

  /**
   *
   * @event
   */
  onStreamCreated(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.streamCreated), event);
  }

  /**
   *
   * @event
   */
  onStreamDestroyed(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.streamDestroyed), event);
  }

  /**
   *
   * @event
   */
  onStreamPropertyChanged(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.streamPropertyChanged), event);
  }
}

export default TokBoxSessionEvents;
