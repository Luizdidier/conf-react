# `<ConferenceFooter>`

The conference footer component is a presentational component. It is
completely optional, but is recommended for laying out your conference.

## Properties

The attendee component accepts `conference` and `provider` properties:

```
<ConferenceFooter event={event} provider={provider}>
  <Attendees>
    <Attendee />
  </Attendees>
</ConferenceFooter>
```

### conference {Conference}

The instance of the Conference component.

### provider {Provider}

The instance of the Provider.

