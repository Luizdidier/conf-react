# `<Chat>`

The chat component is responsible for handling text chat between
multiple individuals inside a conference room.

## Properties

The chat component accepts one property, a` config` object:


`<Chat config={config} />`

The component itself destructures the config object, only retrieving the
`jwt` and and `sessionId`.

### config

#### `jwt`

The `jwt` property on the config object represents the JSON Web Token
used to authenticate the chat service.


#### `sessionId`

The `sessionId` is the property on the config object that gets used to
determine the conference room name.

#### `chatServiceURL`

The `chatServiceURL` is the property on config object that gets used to
connect with the microservice responsible for handling chat.


## Integration

To utilize this component, you can initialize it as so:

```
render() {
  let config = {
    jwt: 'abc123',
    sessionId: 'xyz098',
    chatServiceURL: 'wss://fundur.ngrok.io/socket'
  };

  return <Chat config={config} />
}
```
