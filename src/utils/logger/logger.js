/** @module logger */
import axios from 'axios';
import { warn } from '../';

let logger = {
  /** The instance of an ajax request library to use. */
  request: null,

  /** The url to be used to log. */
  url: '',

  isConfigured: false,

  /** The configuration object used to make a request. */
  _config: {
    baseURL: '',
    endpoint: '',
    timeout: 1000,
    headers: {},
    jwt: ''
  },

  /**
   * Configures the logger module.
   *
   * @param options
   * @returns {logger}
   */
  config: function(options) {
    const {
      jwt,
      timeout,
      baseURL='//fundur.ngrok.io',
      endpoint='api/v1/logs'
    } = options;

    Object.assign(this._config, { baseURL, endpoint, timeout, jwt });

    this.url = `${baseURL}/${endpoint}`;

    this.request = axios.create({
      timeout,
      baseURL,
    });

    this.request.defaults.headers.common['Authorization'] = `Bearer: ${jwt}`;

    this.isConfigured = true;

    return this;
  },
  /**
   * Makes a request to log the id and message.
   *
   * @param id {String}
   * @param event {Event} - The event type related to the dispatched event. (Example: Event, SessionConnectEvent, StreamEvent, etc…)
   * @param message {String}
   * @returns {Promise}
   */
    log: function(id, event, detail='') {
      if (!this.isConfigured) {
        warn('Logger not configured', `ID: ${id}`, event, `DETAIL: ${detail}`);
        return false;
      }

      var cache = [];
      event = JSON.stringify(event, function(key, value) {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
          }
          // Store value in our collection
          cache.push(value);
        }
        return value;
      });
      cache = null; // Enable garbage collection

      const log = { log_status_cd: id, detail, event };
      this.request.post(this.url, { log });

      return false;
  }
};

/** The logger module. */
export default logger;
