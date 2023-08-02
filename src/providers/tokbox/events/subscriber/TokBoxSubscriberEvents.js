import { logger } from '../../../../utils';
import reverseEvents from '../reverse-events';

/** Constant representing events for subscribers. */
export const EVENTS = {
  connected:                 'CONNECTED',
  destroyed:                 'DESTROYED',
  disconnected:              'DISCONNECTED',
  videoDimensionsChanged:    'VIDEO_DIMENSIONS_CHANGED',
  videoDisabled:             'VIDEO_DISABLED',
  videoDisableWarning:       'VIDEO_DISABLE_WARNING',
  videoDisableWarningLifted: 'VIDEO_DISABLE_WARNING_LIFTED',
  videoElementCreated:       'VIDEO_ELEMENT_CREATED',
  videoEnabled:              'VIDEO_ENABLED'
};

reverseEvents(EVENTS);

EVENTS.withPrefix = function(str) {
  return `SUBSCRIBER_${str}`;
}

/** Class managing event logging for TokBox subscriber. */
class TokBoxSubscriberEvents {
  /**
   * Creates a TokBoxSusbscriberEvents instance.
   */
  constructor(publisher) {
    this.publisher = publisher;

    publisher.on({
      connected:                 this.onConnected,
      destroyed:                 this.onDestroyed,
      disconnected:              this.onDisconnected,
      videoDimensionsChanged:    this.onVideoDimensionsChanged,
      videoDisabled:             this.onVideoDisabled,
      videoDisableWarning:       this.onVideoDisableWarning,
      videoDisableWarningLifted: this.onVideoDisableWarningLifted,
      videoElementCreated:       this.onVideoElementCreated,
      videoEnabled:              this.onVideoEnabled
    });
  }

  /**
   *
   * @event
   */
  onConnected(event) {
    logger.log(EVENTS.withPrefix(EVENTS.connected), event);
  }

  /**
   *
   * @event
   */
  onDestroyed(event) {
    logger.log(EVENTS.withPrefix(EVENTS.destroyed), event);
  }

  /**
   *
   * @event
   */
  onDisconnected(event) {
    logger.log(EVENTS.withPrefix(EVENTS.disconnected), event);
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
  onVideoDisabled(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.videoDisabled), event);
  }

  /**
   *
   * @event
   */
  onVideoDisableWarning(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.videoDisableWarning), event);
  }

  /**
   *
   * @event
   */
  onVideoDisableWarningLifted(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.videoDisableWarningLifted), event);
  }

  /**
   *
   * @event
   */
  onVideoElementCreated(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.videoElementCreated), event);
  }

  /**
   *
   * @event
   */
  onVideoEnabled(event) {
    // logger.log(EVENTS.withPrefix(EVENTS.videoEnabled), event);
  }
}

export default TokBoxSubscriberEvents;
