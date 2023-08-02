'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @module logger */


var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = {
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
  config: function config(options) {
    var jwt = options.jwt,
        timeout = options.timeout,
        _options$baseURL = options.baseURL,
        baseURL = _options$baseURL === undefined ? '//fundur.ngrok.io' : _options$baseURL,
        _options$endpoint = options.endpoint,
        endpoint = _options$endpoint === undefined ? 'api/v1/logs' : _options$endpoint;


    Object.assign(this._config, { baseURL: baseURL, endpoint: endpoint, timeout: timeout, jwt: jwt });

    this.url = baseURL + '/' + endpoint;

    this.request = _axios2.default.create({
      timeout: timeout,
      baseURL: baseURL
    });

    this.request.defaults.headers.common['Authorization'] = 'Bearer: ' + jwt;

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
  log: function log(id, event) {
    var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (!this.isConfigured) {
      (0, _.warn)('Logger not configured', 'ID: ' + id, event, 'DETAIL: ' + detail);
      return false;
    }

    var cache = [];
    event = JSON.stringify(event, function (key, value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
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

    var log = { log_status_cd: id, detail: detail, event: event };
    this.request.post(this.url, { log: log });

    return false;
  }
};

/** The logger module. */
exports.default = logger;