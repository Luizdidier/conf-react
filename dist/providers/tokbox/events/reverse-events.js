"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (events) {
  for (var event in events) {
    if (events.hasOwnProperty(event)) {
      var name = events[event];

      events[name] = event;
    }
  }
};