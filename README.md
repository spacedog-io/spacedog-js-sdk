# Spacedog javascript sdk

JS SDK for SpaceDog Web Service API

Installation
---

`npm install spacedog-js-sdk --save`

**in browser**

`<script type="text/javascript" src="node_modules/spacedog-js-sdk/spacedog.min.js"></script>`

**ES6**

We also provide the possibility to use spacedog-js as a es6 module (simply because our `package.json` provides `jsnext:main` key). Then `import SpaceDog from 'SpaceDog'`


Usage
---

**Initialization**

This SDK provides a global object attached to window named `SpaceDog`. This object is the main entry point.

Before anything else, you need to tell SpaceDog the backend id, like so :

`SpaceDog.initialize("yourBackendId")`

[You can create a backend here](https://cockpit.spacedog.io/sign-up.html)

**SpaceDog Objects**

SpaceDog has a lot of features ! The following list is the top level objects. Each one contains a subset of feature, specefic to its namespace. For instance, all things related to search (get queries, elastic search queries, ...) are in the `SpaceDog.Search` namespace.

  - `SpaceDog.Data`
  - `SpaceDog.Search`
  ...

**Search**

    SpaceDog.Data.search({type:"tvshow"}, function(err, data){
        // data.results is an array of plain json object
    })

**Go deeper**

The tests in the `test/` folder are another way to get to know this library.


Examples
---

Get them in the `examples/` folder.

*Note:* every example uses the same backend :

  id : dummybackend

  user : dummybackend

  pass : hi dummybackend

**`examples/ionic1`**

Make sure to run `npm install` and then `ionic serve` to run in your browser.

Development env setup
---

Requirements

- `npm install -g watch-cli` (useful for `npm run dev`)


Commands / Build
---

- `npm run compile` => builds `src/` into `./spacedog.js`

- `npm run dev` => run tests when files in `src/` change

- `npm run test` => run tests

