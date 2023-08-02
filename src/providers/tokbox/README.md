# TokBoxProvider

The TokBox provider extends baseprovider and is a wrapper for the third
party JavaScript libray provided by TokBox.

For API reference to TokBox, review the documentation
[here](https://tokbox.com/developer/sdks/js/).

## Methods

### supportsVideo()

Determines if current client supports video under OpenTok.

### connect(props, OT)

This method is used to connect with TokBox, it initializes a session.

**Arguments**

1. `props` (Object): Properties to be extracted and attached to the
   instance prototype.
2. `OT` (Object): The OpenTok global object. Defaults to window.OT.

### publish()

This method is used to create a publisher, essentially publishing the
users video/audio.

### unpublish()

This method is used to unpublish the publisher created by the `publish`
method.

## Properties

### api_key {String} - public

The api key provided by TokBox.

### session_id {String} - public

The session id created for a conference by Tokbox.

### token {String} - public

The token created for the session.
