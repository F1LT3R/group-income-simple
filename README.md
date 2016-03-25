# Group Income (Simple Edition)

[![Join the chat at https://gitter.im/okTurtles/group-income](https://badges.gitter.im/okTurtles/group-income.svg)](https://gitter.im/okTurtles/group-income?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Group Income allows groups to guarantee its members a minimum income.

Its accounting system can be implemented using a simple Excel spreadsheet, or on blockchains like Ethereum (which is where we're headed). This centralized "Simple Edition" is our way to rapidly prototype, develop, and research the concept with real groups.

## Installation

```
npm install -g grunt-cli
npm install
```

Although it pains us to give up 4-spaced tabs, we're trying out [`standard`](https://github.com/feross/standard) for the code style to see how it goes. See also: [linting in editors on "save"](https://github.com/feross/standard#text-editor-plugins).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Development

Build the app:

```
grunt dist
```

Run all servers + watch files for changes:

```
grunt dev
```

- After running `grunt dev`, visit the website: [http://localhost:8000](http://localhost:8000)

Clean up files in `dist/` and the `sqlite.db` file (which will be better handled in the future):

```
grunt clean
```

Run the tests:

```
# In one terminal window
grunt dev
# In another terminal window
grunt test
```

- In the future you'll be able to just run `grunt test` by itself.
