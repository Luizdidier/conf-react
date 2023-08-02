# `logger`

The logger is a singleton. It is a JavaScript object that can be
configured at any point and used to log out to the `baseURL` and `endpoint`
specified.

## Properties

### axios {Axios}

The axios property is a reference to an instance of
[Axios](https://github.com/mzabriskie/axios).

#### url {String}

This is a string, where its value is the URL that the request to log
should point to. e.g. `http://mydomain.com/api/v1/logs`.

## Methods

### config(options)

This is the method used to configure the logger.

**Arguments**

1. `options` (Object): The options to be used to configure the logger.
   Available options to be configured include:
  - `baseURL` (String) Usually the domain to be used. e.g.
    `//mydomain.com`
  - `endpoint` (String) The endpoint of the log API. e.g. `api/v1/logs`
  - `timeout` (Number) In milliseconds, the amount of time the request
    should timeout.
  - `jwt` (String) The jwt used to authenticate the session. This is
    used to give the `Authorization` header the jwt value.

### log(id, detail)

This is the method used to create a log.

**Arguments**

1. `id` (String): The identifier to be used. e.g. `CONNECTION`,
   `STREAM_CREATED`, etc... These are defined by you. There are no
    checks here to validate the identifier - it is passed through to the
    API.
2. `detail` (String): Defaults to an empty string. It is the detail you
   would like to include as part of the log.

