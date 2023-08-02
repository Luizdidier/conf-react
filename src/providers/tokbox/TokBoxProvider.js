import BaseProvider from '../base';
import {
  TokBoxSessionEvents,
  TokBoxPublisherEvents,
  TokBoxSubscriberEvents,
  SESSION_EVENTS,
  PUBLISHER_EVENTS,
  SUBSCRIBER_EVENTS
} from './events';
import { assert } from '../../utils';

/** Class representing the TokBox provider. */
class TokBoxProvider extends BaseProvider {

  /**
   * Creates a TokBoxProvider.
   */
  constructor({ props, component, OT=window.OT }) {
    super(...arguments);

    this.subscribers = [];

    this.OT = OT;
    this._extractProps(props);
    this._addEventHandlers();
    this.component = component || {};
    this.publisherEvents = [];
    this.subscriberEvents = [];
    this.isConnected = false;
  }

  /**
   * Creates an initializes a session.
   *
   * @public
   */
  connect() {
    if (this.isConnected) {
      return this.session;
    }

    super.connect(...arguments);

    this.session = this.OT.initSession(this.api_key, this.session_id);

    this.sessionEvents = new TokBoxSessionEvents(this.session);

    this.session.connect(this.token, this._onConnectComplete);
    this.session.on(SESSION_EVENTS.STREAM_CREATED, this._onStreamCreated);

    this.isConnected = true;

    return this.session;
  }

  /**
   * Creates and returns an instance of a publisher.
   *
   * @param targetElement {DOMElement}
   * @param options {Object}
   * @param eventHandler {Function}
   * @returns {Publisher}
   * @public
   */
  createPublisher(targetElement, options, eventHandler) {
    if (!this.session) {
      this.connect();
    }

    const publisher = this.OT.initPublisher(targetElement, options, eventHandler);
    const publisherEvents = new TokBoxPublisherEvents(publisher);

    this.publisherEvents.push(publisherEvents);

    return publisher;
  }

  /**
   * Creates and returns an isntance of a subscirber.
   *
   * @param stream {Stream}
   * @param targetElement {DOMElement}
   * @param options {Object}
   * @param eventHander {Function}
   * @returns {Subscriber}
   * @public
   */
  createSubscriber(stream, targetElement, options, eventHandler) {
    let subscriber = this.session.subscribe(stream, targetElement, options, eventHandler);
    let subscriberEvents = new TokBoxSubscriberEvents(subscriber);

    this.subscriberEvents.push(subscriberEvents);

    return subscriber;
  }

  //////////
  tmpPromisify(fn) {
    return function() {
      const args = Array.from(arguments);
      return new Promise((resolve, reject) => fn(...args, (error, content) => error ? reject(error) : resolve(content)));
    };
  }

  statsFnBuilder(subscriber) {
    const iPromisedYouStats = this.tmpPromisify(subscriber.getStats);

    return (completionHandler) => {
      iPromisedYouStats().then(results => {
        const completeStats = {
          ...results,
          width:  subscriber.videoWidth(),
          height: subscriber.videoHeight()
        };

        completionHandler(completeStats);
      })
    };
  }
  //////////

  /**
   * Uses TokBox default system check.
   *
   * TODO Integrate that undocumented plugin call somehow.
   */
  supportsVideo() {
    return !!this.OT.checkSystemRequirements();
  }

  /**
   * Attaches the properties onto the prototype instance.
   *
   * @param {Object} props - The configuration object.
   * @private
   */
  _extractProps(props) {
    let {
      apiKey: api_key,
      sessionId: session_id,
      token,
      hostElement,
      attendeesElement,
      role
    } = props;

    assert(api_key, 'Please define an api key');
    assert(session_id, 'Please define a session id');

    this.api_key          = api_key;
    this.session_id       = session_id;
    this.token            = token;
    this.hostElement      = hostElement;
    this.attendeesElement = attendeesElement;
    this.role             = role;
  }

  /**
   * Adds the event listeners available for TokBox.
   *
   * @private
   */
  _addEventHandlers() {
    this._onConnectComplete          = this._onConnectComplete.bind(this);
    this._onConnectError             = this._onConnectError.bind(this);
    this._onStreamCreated            = this._onStreamCreated.bind(this);
    this._onSessionSubscribed        = this._onSessionSubscribed.bind(this);
    this._onSessionSubscribedSuccess = this._onSessionSubscribedSuccess.bind(this);
    this._onSessionSubscribedFailure = this._onSessionSubscribedFailure.bind(this);
  }

  /**
   * Event handler when the connection to TokBox is complete.
   *
   * @event
   * @private
   */
  _onConnectComplete(error) {
    if (error) {
      return this._onConnectError();
    }

    this.trigger('sessionCreated');
  }

  /**
   * Event handler when the connection to TokBox encounters an error.
   *
   * @event
   * @private
   */
  _onConnectError() {
    this.trigger('connectFailure');
  }

  /**
   * Event handler when the connection to TokBox triggers a stream created.
   * This will trigger when someone joins a "room".
   *
   * @event
   * @private
   */
  _onStreamCreated({ stream }) {
    this.trigger('onStreamCreated', stream);
  }

  /**
   * Event handler when there is a session that has subscribed.
   * This triggers when a stream is created successfully.
   *
   * @event
   * @private
   */
  _onSessionSubscribed(error) {
    if (error) {
      return this._onSessionSubscribedFailure();
    }

    return this._onSessionSubscribedSuccess();
  }

  /**
   * Event handler for when a session has subscribed is successful.
   *
   * @event
   * @private
   */
  _onSessionSubscribedSuccess() {
    this.trigger('subscribeSuccess');
  }

  /**
   * Event handler for when a session has subscribed an encounters an error.
   *
   * @event
   * @private
   */
  _onSessionSubscribedFailure() {
    this.trigger('subscribeFailure');
  }
}

export default TokBoxProvider;
