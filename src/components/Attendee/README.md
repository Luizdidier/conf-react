# `<Attendee>`

The attendee component is responsible for displaying a subscriber.
It also handles events that are triggered by the subscriber.

## Properties

The attendee component accepts `event`, `provider`, and `subscriberOptions` properties:

`<Conference event={event} provider={provider} subscriberOptions={subscriberOptions}/>`

### event {Object}

The event object triggered by the `onStreamCreated` event from the provider.

#### stream {String}

The stream that triggered the `onStreamCreated` event.

### provider {Object}

The provider instance, e.g. instance of `TokBoxProvider`.

#### session {Session}

The session that was created.

### subscriberOptions {Object}

Additional options to pass to the video provider's subscriber implementation.

These are merged into the default options defined in the `<Attendee />` component.
