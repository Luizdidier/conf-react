# `<Conference>`

The conference component is responsible for handling video
communications between multiple individuals within a conference. It does
a lookup based on the `provider` value in the config object and utilizes
the appropriate adapter to connect with that provider.

## Properties

The conference component accepts one property, a `config` object:

`<Conference config={config} />`

The component itself destructures the config object, only retrieving the `provider`, `role`, `hostElement` and `attendeesElement`.

### config

#### `provider` {String}

The `provider` property should be a string that represents the adapter
to be used. For example, if using TokBox - the provider should be
"tokbox".

#### `role` {String}

The `role` property should be a string that represents the role of the
user in the system utilizing this component. Currently it supports
"member" and "provider".

## Integration

To utilize this component, you can initialize it as so:

```
render() {
  let config = {
    provider: 'tokbox',
    role: 'member'
  };

  return <Conference config={config} />
}
```
