# `<ConferenceControls>`

This component is essentially a wrapper for all its nested children,
which should correlate to the controls for a conference. Internally its
render function clones its own children and passes them a reference of the
`Conference` instance.

## Properties

There is no need to pass it any props, the `Conference` component
clones the instance of `ConferenceControls` and passes itself
(`ConferenceComponent` instance) as a reference via the `conference`
property. Therefore you can instantiate it this way:

```
<ConferenceControls>
  // Put children here
</ConferenceControls>
```
### conference {Conference}

This is the instance of the `Conference` component, automatically
injected when the `Conference` component initializes `ConferenceControls`
