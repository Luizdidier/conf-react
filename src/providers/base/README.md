# BaseProvider

The base provider defines a common interface for all providers.
Currently not much is built into the base provider, but it may be under
heavy development as more providers are added to the registry.

## Methods

### supportsVideo()

Determines if video provider implementation supports video on current client.

### on(event, callback)

This is the method to be used when trying to hook into one of predefined
events.

**Arguments**

1. `event` (String): The name of the event.
2. `callback` (Function): The function to be called when this event
   triggers.

### trigger(event)

This is the method to be used when trying to trigger one of the
predefined events

**Arguments**

1. `event` (String): The event to be triggered.

## Properties

### session {Object} - public

The session is the instance of whichever third party library is used to
create a conference. For example, TokBox has a session it creates to
manange a call.

### hostElement {String} - public

The host element is the element the library should use for the large
screen video. This should be the id of the element.

#### attendeesElement {String} - public

The attendees element is the element the library should use for the
attendees list, those who are subscribed to a conference. This should be
the id of the element.

```
  // If this is your element
  <div id="my-attendees"></div>

  // Then attendeesElement should be
  attendeesElement: 'my-attendees'
```

#### _events {Object} - private

The events object is a hash with key/value pairs where the key is the
event and the value is a no-op. These are common events used when the
third party library supports the necessary hooks.

#### connectSuccess

This is the event triggered when a connection to the third party
provider is successful.

#### connectFailure

This is the event triggered when a connection to the third party
provider is unsuccessful.

#### subscribeSuccess

This is the event triggered when a connection to the third party
provider triggers an event where someone has joined the room.

#### subscribeFailure

This is the event triggered when a connection to the third party
provider triggers an event where someone tried to join the room but was
unsuccessful.

#### published

This is the event triggered when a connection to the third party
provider triggers an event when the person has successfully published
their video/audio.

#### unpublished

This is the event triggered when a connection to the third party
provider triggers an event when the person was unable to publish
their video/audio.
