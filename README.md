# Spacedog javascript sdk

JS SDK for SpaceDog Web Service API

## Installation

`npm install spacedog-js-sdk --save`

### in browser

`<script type="text/javascript" src="node_modules/spacedog-js-sdk/spacedog.min.js"></script>`

### ES6

We also provide the possibility to use spacedog-js as a es6 module (simply because our `package.json` provides `jsnext:main` key). Then `import SpaceDog from 'SpaceDog'`



## Usage


### Initialization


This SDK provides a global object attached to window named `SpaceDog`. This object is the main entry point.

Before anything else, you need to tell `SpaceDog` which backend to use, with a backendId, like so :

`SpaceDog.initialize("yourBackendId")`

(`SpaceDog.forgetAll()` will reset everything spacedog wise on the client side)

[You can create a backend here](https://cockpit.spacedog.io/sign-up.html)


### SpaceDog Objects

SpaceDog has a lot of features ! The following list is the top level objects. Each one contains a subset of feature, specefic to its namespace. For instance, all things related to search (get queries, elastic search queries, ...) are in the `SpaceDog.Search` namespace.

  - `SpaceDog.Credentials`
  - `SpaceDog.Data`
  - `SpaceDog.Settings`
  - `SpaceDog.Schema`

...

#### Credentials

Here is a code example on how to login :

    SpaceDog.Credentials.login({
        "username":"dummyUsername",
        "password":"dummyPassword",
        "rememberMe":true
    }, function(err, res){

        expect(res).to.have.property("accessToken")
        expect(err).to.be.null;
        expect(res).to.be.instanceOf(Object)

        expect(SpaceDog.Credentials.canTryLogin()).to.be.true

    })

`rememberMe` is a boolean that will saves the session token (the SpaceDog one) to the localStorage for later use, when your final user comes back, and you needs to log him in automaticly for faster login experience!. In your controller, you can test if a token a present with the `SpaceDog.Credentials.canTryLogin()` function.

If a token is present, you would typically call, to auto login a user : 

    SpaceDog.Credentials.loginWithSavedCredentials(loginCallback)


#### Data

`Data` is the entry point to fetching, searching, updating, deleting and creating data. The `search` method take 3 arguments : 

  - `opts` : { type:string, payload:object }
  - `cb` : callback function (err, data) ..
  - `paginationSession` : optional paginationSession

Example :

    SpaceDog.Data.search({type:"tvshow"}, function(err, data){
        // data.results is an array of plain json object
    })

The third argument, `paginationSession`, is an object that you would typically handle like this :

    var session = new SpaceDog.Data.PaginationSession(0, 7)

    SpaceDog.Data.search( {
        "type":"dummyType"
    }, function (err, res){

        // session.isNextPageAvailable() => will say true is there is a next page available

        // session.pointNextPage() => will make the session point to the next page, making next calls to search method fetch the next page

    },
    session)

The constructor `new SpaceDog.Data.PaginationSession` takes 2 arguments :

  - `from` : integer
  - `size` : integer


####Settings

  **TODO**

####Schema

    SpaceDog.Schema.list(function(err, data){
      // data is an Object where keys are the schema
    })

**TODO**

####Go deeper####

The tests in the `test/` folder are another way to get to know this library.


## Examples


Get them in the `examples/` folder.

*Note:* every example uses the same backend :

  id : dummybackend

  user : dummybackend

  pass : hi dummybackend

### `examples/ionic1`

Make sure to run `npm install` and then `ionic serve` to run in your browser.


## Development env setup

### Requirements

  - `npm install -g watch-cli` (useful for `npm run dev`)


### Commands / Build

- `npm run compile` => builds `src/` into `./spacedog.js`

- `npm run dev` => run tests when files in `src/` change

- `npm run test` => run tests

