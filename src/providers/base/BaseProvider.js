/** Class representing a provider. */
export default class BaseProvider {

  /**
   * Create a Provider.
   */
  constructor() {
    this.attendeesElement = null;
    this.hostElement      = null;
    this.session          = null;

    this._events = {
      connectFailure:    () => {},
      onCreatePublisher: () => {},
      onStreamCreated:   () => {},
      published:         () => {},
      sessionCreated:    () => {},
      subscribeFailure:  () => {},
      subscribeSuccess:  () => {},
      unpublished:       () => {}
    }
  }

  /**
   * Connect to Provider.
   */
  connect() {
    // Base ctor does nothing.
  }

  /**
   * Perform video provider-specific capabilities check.
   *
   * Base provider does not support video since there's
   * no underlying implementation.
   *
   * @returns {boolean} True if video is supported
   */
  supportsVideo() {
    return false;
  }

  /**
   * Attaches an event.
   *
   * @param {string} event - The event name.
   * @param {function} callback - The callback function to be called when the event triggers.
   * @public
   */
  on(event, callback) {
    const evt = this._events[event];

    console.assert(evt, `Could not find event :: ${event}`);

    this._events[event] = callback;
  }

  /**
   * Triggers an event.
   *
   * @public
   * @param {string} event - The event name.
   */
  trigger() {
    const [ event, data ] = arguments;

    this._events[event](data);
  }
}
