'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProviderPicker = require('./ProviderPicker');

var _ProviderPicker2 = _interopRequireDefault(_ProviderPicker);

var _Conference = require('./components/Conference');

var _Conference2 = _interopRequireDefault(_Conference);

var _ConferenceControls = require('./components/ConferenceControls');

var _ConferenceControls2 = _interopRequireDefault(_ConferenceControls);

var _publish = require('./components/ConferenceControls/publish');

var _publish2 = _interopRequireDefault(_publish);

var _conferenceFooter = require('./components/conferenceFooter');

var _conferenceFooter2 = _interopRequireDefault(_conferenceFooter);

var _Attendees = require('./components/Attendees');

var _Attendees2 = _interopRequireDefault(_Attendees);

var _Attendee = require('./components/Attendee');

var _Attendee2 = _interopRequireDefault(_Attendee);

var _Publisher = require('./components/Publisher');

var _Publisher2 = _interopRequireDefault(_Publisher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      show: false,
      config: null,
      renderPublisher: null,
      isPublished: false,
      attendees: []
    };

    _this.onCreateConference = _this.onCreateConference.bind(_this);
    _this.onCreatePublisher = _this.onCreatePublisher.bind(_this);
    _this.onCreateAttendee = _this.onCreateAttendee.bind(_this);
    _this.onDestroyAttendee = _this.onDestroyAttendee.bind(_this);
    _this.onPublished = _this.onPublished.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'onCreateConference',
    value: function onCreateConference(config) {
      var state = Object.assign(this.state, { show: true, config: config });

      this.setState(state);
    }
  }, {
    key: 'onCreatePublisher',
    value: function onCreatePublisher() {
      var renderPublisher = this.state.renderPublisher;


      renderPublisher = true;

      var state = Object.assign(this.state, { renderPublisher: renderPublisher });

      this.setState(state);
    }
  }, {
    key: 'onCreateAttendee',
    value: function onCreateAttendee(stream) {
      var attendees = this.state.attendees;


      attendees.push({ stream: stream });

      var state = Object.assign(this.state, { attendees: attendees });

      this.setState(state);
    }
  }, {
    key: 'onDestroyAttendee',
    value: function onDestroyAttendee(stream) {
      var attendees = this.state.attendees;


      attendees = attendees.filter(function (attendee) {
        return attendee.stream !== stream;
      });

      var state = Object.assign(this.state, { attendees: attendees });

      this.setState(state);
    }
  }, {
    key: 'onPublished',
    value: function onPublished() {
      var isPublished = true;

      var state = Object.assign(this.state, { isPublished: isPublished });

      this.setState(state);
    }
  }, {
    key: 'renderAttendee',
    value: function renderAttendee(attendee, index) {
      if (!attendee) return null;

      var stream = attendee.stream;

      var key = stream.streamId + '_' + index;

      return _react2.default.createElement(_Attendee2.default, { key: key, stream: stream, onDestroyed: this.onDestroyAttendee });
    }
  }, {
    key: 'renderConference',
    value: function renderConference() {
      if (!this.state.show) return null;

      var _state = this.state,
          attendees = _state.attendees,
          config = _state.config,
          isPublished = _state.isPublished,
          renderPublisher = _state.renderPublisher;


      var mainAttendee = attendees[0];
      attendees = attendees.slice(1, attendees.length);
      var conference = _react2.default.createElement(
        'div',
        { className: 'conference conference--' + config.layout },
        _react2.default.createElement(
          _Conference2.default,
          { config: config,
            onCreatePublisher: this.onCreatePublisher,
            onStreamCreated: this.onCreateAttendee },
          [mainAttendee].map(this.renderAttendee.bind(this)),
          _react2.default.createElement(
            _conferenceFooter2.default,
            null,
            _react2.default.createElement(
              _ConferenceControls2.default,
              null,
              _react2.default.createElement(_publish2.default, { isPublished: isPublished })
            ),
            _react2.default.createElement(
              _Attendees2.default,
              null,
              renderPublisher ? _react2.default.createElement(_Publisher2.default, { onPublished: this.onPublished }) : '',
              attendees.map(this.renderAttendee.bind(this))
            )
          )
        )
      );

      return conference;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderConference(),
        _react2.default.createElement(_ProviderPicker2.default, { onCreateConference: this.onCreateConference })
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;