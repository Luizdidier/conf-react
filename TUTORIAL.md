# Tutorial

## Purpose

The goal here is to help you get started quickly.
To describe the relationship between conference-api and
conference-react.

## Architecture

### ConferenceAPI

This is a microservice that allows for the easy creation of a conference,
while also hooking into a video providers services. In this case it
creates a session id and token for a video conference with TokBox.

### ConferenceReact

The interface for hooking into ConferenceAPI. It is built in React and
comes with a provider service, this service in turn is an abstract
contract with the video provider.

TL;DR

> ConferenceAPI (Backend) -> [VideoProvider](src/providers/tokbox) ->
Conference (UI Component)

## How does it work?

The conference component is composable - allowing you to place where the
attendees, controls, etc.. can be placed in the UI. The one dependency
is a [config](/src/components/conference) object.

Essentially the ConferenceAPI will
[generate](https://github.com/Teladoc/conference-api/blob/master/web/models/auth_details_generator.ex#L24-L28)
a configuration object that should be normalized for the conference
component to use:

```
{
  apiKey: '',
  sessionId: '',
  token: '',
  provider: '',
  jwt: '',
  role: ''
}
```

As an example, check out this [line of
code](https://github.com/Teladoc/conference-api/blob/master/dummy/frontend/app/assets/javascripts/conference/members/Members.js#L60-L67).
Essentially we take the response, normalize it and then pass it as an
argument up to the [onConnect](https://github.com/Teladoc/conference-api/blob/33838da605ab1bb9e9c3b93bc004c87393ebf038/dummy/frontend/app/assets/javascripts/conference/App.js#L49-L52) method prop passed in.

From there the conference component will handle, looking up and creating
the right provider. The provider will initialize and then be passed down
automatically (via property transference) to all child components.

For an example of how this all works, check out the hook up [here](https://github.com/Teladoc/conference-api/blob/master/dummy/frontend/app/assets/javascripts/conference_window/App.js).


If you would like to see it on its own, check out the demo by running
`npm run start` in this repo.
