export default function(events) {
  for (let event in events) {
    if (events.hasOwnProperty(event)) {
      const name = events[event];

      events[name] = event;
    }
  }
}
