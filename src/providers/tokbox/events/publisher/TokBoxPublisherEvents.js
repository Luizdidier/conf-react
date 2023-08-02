import { 
  logger, 
} from '../../../../utils';

import reverseEvents from '../reverse-events';

/** Constant represting events for publishers.  */
export const EVENTS = {
  accessAllowed: 'ACCESS_ALLOWED',
  accessDenied: 'ACCESS_DENIED',
  accessDialogClosed: 'ACCESS_DIALOG_CLOSED',
  accessDialogOpened: 'ACCESS_DIALOG_OPENED',
  destroyed: 'DESTROYED',
  mediaStopped: 'MEDIA_STOPPED',
  streamCreated: 'STREAM_CREATED',
  streamDestroyed: 'STREAM_DESTROYED',
  videoDimensionsChanged: 'VIDEO_DIMENSIONS_CHANGED',
  videoElementCreated: 'VIDEO_ELEMENT_CREATED'
};

reverseEvents(EVENTS);

EVENTS.withPrefix = function(str) {
  return `PUBLISHER_${str}`;
}
/** Class managing event logging for TokBox publisher. */
class TokBoxPublisherEvents {
  constructor(publisher) {
    this.publisher = publisher;

    publisher.on({
      accessAllowed: this.onAccessAllowed,
      accessDenied: this.onAccessDenied,
      accessDialogClosed: this.onAccessDialogClosed,
      accessDialogOpened: this.onAccessDialogOpened,
      destroyed: this.onDestroyed,
      mediaStopped: this.onMediaStopped,
      streamCreated: this.onStreamCreated,
      streamDestroyed: this.onStreamDestroyed,
      videoDimensionsChanged: this.onVideoDimensionsChanged,
      videoElementCreated: this.onVideoElementCreated
    });
  }

  /**
   *
   * @event
   */
  onStreamCreated(event) {
    logger.log(EVENTS.withPrefix(EVENTS.streamCreated), event);
  }

  /**
   *
   * @event
   */
  onStreamDestroyed(event) {
    logger.log(EVENTS.withPrefix(EVENTS.streamDestroyed), event);
  }

  /**
   * Logging is disabled on the below events they dont provide any relevant/useful info about the video call.
  /**

  
  /**
   *
   * @event
   */
  onAccessAllowed(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.accessAllowed), event);
  }

  /**
   *
   * @event
   */
  onAccessDenied(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.accessDenied), event);
  }

  /**
   *
   * @event
   */
  onAccessDialogClosed(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.accessDialogClosed), event);
  }

  /**
   *
   * @event
   */
  onAccessDialogOpened(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.accessDialogOpened), event);
  }

  /**
   *
   * @event
   */
  onDestroyed(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.destroyed), event);
  }

  /**
   *
   * @event
   */
  onMediaStopped(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.mediaStopped), event);
  }

  /**
   *
   * @event
   */
  onVideoDimensionsChanged(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.videoDimensionsChanged), event);
  }

  /**
   *
   * @event
   */
  onVideoElementCreated(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.videoElementCreated), event);
  }
}

export default TokBoxPublisherEvents;
