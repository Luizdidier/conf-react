# `<PublishControl>`

The `PublishControl` component, only rendered when the role of the user is
provider, allows the user to start and end a call.

## Properties

The only property that this component relies on is a reference to an
instance of a conference, `Conference` component. It specifically looks
for the `onStart`, `onEnd` events and the `role` and `isPublished` properties on
the config and state of the conference.

```
<PublishControl />
```

### conference {Conference}

This is the instance of the `Conference` component, automatically
injected by the ConferenceControls component.
