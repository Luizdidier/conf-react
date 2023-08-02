# Building and Deploying

## Building

The project is currently written in [ES6](https://babeljs.io/learn-es2015/)
and transpiled to ES5 using BabelJS. We do this in order to ensure that
the code is future proof and that we take advantage of the latest
features available to us while polyfilling those features for older browsers.
Also, it helps to do this since the React community has settled on the
[class](https://github.com/lukehoban/es6features#classes) system in ES6.

To build the files, we run the following command:

```
npm run dist
```

Behind the scenes, the `dist` command runs:

```
NODE_ENV=development gulp build
```

Which executes the build task defined in our [gulpfile.js](gulpfile.js).
This task essentially runs babel against all JavaScript files in the src
directory, except for files ending in `test.js`, and places the compiled
versions in the dist directory.

### FAQ

#### Why is the command dist?

The command `npm run build` is a default that comes with create react
app. That build is based on bundling with webpack. Thats not what we
want here.

#### Why not use webpack?

We really don't want to bundle everything together. Our use case is to
expose each component and allow the consuming app to import what they
need. Webpack is used to build everything together so you have one
JavaScript file to serve, very useful for single page apps but not for
component libraries.

## Deploying

Currently there is no deploy process. However we can choose to utilize
NPM private repositories at a later time. The benefits of doing this:

- No dist directory in the repository
  - Cleaner commit history
  - No gnarly pr diffs
- When installing the project, you can specify to only include the dist
folder - making the installation super fast.
