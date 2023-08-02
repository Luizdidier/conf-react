# Contributing

## Installation

### Prerequisites

#### Install Homebrew

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Install nvm

```
brew install nvm
```

#### Install Node.js and NPM

```
nvm install 7.2.0
```

### Project Installation

#### Clone Repo
```
git clone git@github.com:Teladoc/conference-react.git
```

#### Install Project Dependencies

```
npm install
```

You should now be able to run the project with:

```
npm start
```

This should launch the project at [http://localhost:3000](http://localhost:3000)

**Note**: If port 3000 is taken, the project will prompt you to see if you
would like to switch to a different port.

## React Setup

This project was created with [create-react-app](https://github.com/facebookincubator/create-react-app) and
then [ejected](https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup)
to expose the configuration files. Read more [here](REACT_SETUP.md) to
customize the development process.

