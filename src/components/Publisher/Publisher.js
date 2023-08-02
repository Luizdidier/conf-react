import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { EVENTS as SESSION_EVENTS } from '../../providers/tokbox/events/session';

/**
 * React.Component representing a publisher. This is the user who is attending the conference.
 *
 * @class
 */
class Publisher extends Component {
  static get defaultProps() {
    return {
      autoPublish: true,
      onPublished: () => {}
    };
  }

  /**
   * Set up props and defines default properties.
   *
   * @constructor
   */
  constructor(props) {
    super(props);

    this.defaultProperties = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
  }

  /**
   * Initializes a publisher for the current session.
   *
   * @public
   */
  componentDidMount() {
    const { autoPublish } = this.props;

    if (autoPublish) {
      this.createPublisher();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.publishAudio !== prevProps.publishAudio) {
      if (this.publisher) {
        const { publishAudio } = this.props;
        this.publisher.publishAudio(publishAudio);
      }
    }
  }

  createPublisher() {
    const {
      defaultProperties,
      props: { provider }
    } = this;

    let { properties = {} } = this.props;
    properties = { ...defaultProperties, ...properties };
    const targetElement = this._getElement();

    this.publisher = provider.createPublisher(targetElement, properties, this.onPublished.bind(this));

    this.publisher.on('streamCreated', this.onPublisherStreamCreated.bind(this));
    this.publisher.on('subscribeSuccess', this.onSubscribeSuccess.bind(this));
    // Support for autopublishing
    // if is connected (manual publishing) then publish immediately
    // otherwise (auto publishing) listen for the sessionConnected event and then publish
    if (provider.session.currentState === 'connected') {
      provider.session.publish(this.publisher);
    } else {
      provider.session.on(SESSION_EVENTS.SESSION_CONNECTED, this.onSessionConnected.bind(this));
    }
  }

  destroyPublisher() {
    this.publisher.destroy();
  }

  disconnectSession(subscribers) {
    const { session } = this.publisher;
    subscribers.forEach(subscriber => session.unsubscribe(subscriber));
    session.disconnect();
    this.destroyPublisher();
  }
  /**
   * Renders the DOM element for the component.
   *
   * @public
   */
  render() {
    return <div aria-label="Members Video Panel" tabIndex="1" id="cf-video-container--host" />;
  }

  /**
   * Fired when the publisher's stream is created.
   *
   * Developed to avoid race conditions during initialization
   * for the video test.
   */
  onPublisherStreamCreated(event) {
    if (!this.props.onPublisherStreamCreated) {
      return;
    }

    this.props.onPublisherStreamCreated(event.stream, this.publisher);
  }

  onSubscribeSuccess(event) {
    if (!this.props.onSubscriberStreamCreated) {
      return;
    }

    this.props.onSubscriberStreamCreated(event, this.publisher);
  }
  /**
   * Event handler for when the publisher is published.
   *
   * @event
   * @public
   */
  onPublished() {
    this.props.onPublished(this);
  }

  /**
   * Event handler for when the session is connected.
   *
   * @event
   * @public
   */
  onSessionConnected() {
    let {
      props: { provider }
    } = this;
    provider.session.publish(this.publisher);
  }

  /**
   * Returns the DOMElement for the component.
   *
   * @returns {DOMElement}
   * @private
   */
  _getElement() {
    return ReactDOM.findDOMNode(this);
  }
}

export default Publisher;
