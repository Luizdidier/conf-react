# Conferencing Component Library

A react based component library for video conferencing.

## Installation

### Contributing

To contribute to this project, check out our [contribution](CONTRIBUTING.md) documentation.

### Consuming App

To install the project into an app, please refer to our
[installation](INSTALLATION.md) documentation.

## Testing

To review how the library gets tested, please refer to [this](TESTING.md)
documentation.

## Build and Deploy

We do have a process for building an deploying our library, check out
our documentation [here](BUILD_AND_DEPLOY.md).

## Library

### Components

- [`<Attendee />`](src/components/attendee)
- [`<Attendees />`](src/components/attendees)
- [`<Chat />`](src/components/chat)
- [`<ConferenceControls/>`](src/components/conference-controls/)
- [`<ConferenceFooter/>`](src/components/conference-footer/)
- [`<Conference />`](src/components/conference)
- [`<PublishControl/>`](src/components/conference-controls/publish/)
- [`<Publisher />`](src/components/publisher)

### Video Providers

- [`BaseProvider`](src/providers/base)
- [`TokBoxProvider`](src/providers/tokbox)

### Loggers

- [`logger`](src/logger)

### Event Managers

#### Tokbox

- [`TokBoxPublisherEvents`](src/providers/tokbox/events/publisher)
- [`TokBoxSessionEvents`](src/providers/tokbox/events/session)
- [`TokBoxSubscriberEvents`](src/providers/tokbox/events/subscriber)
