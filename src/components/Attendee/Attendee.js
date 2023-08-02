import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
  * React.Component representing an attendee.
  *
  * @class
  */
class Attendee extends Component {
  static get defaultProps() {
    return {
      onSubscribed: () => {},
      onDestroyed:  () => {},
      subscriberOptions:  {}
    }
  }

  /**
   * Set up for props and default options.
   *
   * @constructor
   */
  constructor(props) {
    super(props);

    const subscriberOptions = props ? props.subscriberOptions || {} : {};

    this.options = {
      insertMode: 'append',
      width:      '100%',
      height:     '100%',
      ...subscriberOptions
    };
  }

  /**
   * Initializes a subscriber when component is mounted.
   *
   * @public
   */
  componentDidMount() {
    const { stream, provider } = this.props;
    const targetElement = this._getElement();
    const { options } = this;

    this.subscriber = provider.createSubscriber(stream, targetElement, options, this.onSubscribed.bind(this));

    this.subscriber.on('subscribeSuccess', this.onSubscribed.bind(this));

    this.subscriber.on('destroyed', this.onDestroyed.bind(this));
  }

  /**
   * Calls the onSubscribed method passed in via props.
   *
   * @event
   */
  onSubscribed() {
    const { provider } = this.props;
    const statsFn = provider.statsFnBuilder(this.subscriber);
    this.props.onSubscribed(this.subscriber, statsFn);
  }

  /**
   * Calls the onDestroyed method passed in via props.
   *
   * @event~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  onDestroyed() {
    let { stream } = this.props;

    this.props.onDestroyed(stream, this.subscriber);
  }

  /**
   * Renders the target element for the attendee.
   *
   * @public
   */
  render() {
    const { userType } = this.props;
    return <div className={`cf-attendee ${userType}`}></div>
  }

  /**
   * Returns the element of the component.
   *
   * @returns {DOMElement}
   * @private
   */
  _getElement() {
    return ReactDOM.findDOMNode(this);
  }
}

export default Attendee;
