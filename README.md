# ynn-middleware-hierarchical-param

A ynn middleware for getting params of requests hierarchically.

## Installation

```sh
$ npm install --save ynn-middleware-hierarchically-param
```

## Usage

```js
const Ynn = require( 'ynn' );
const param = require( 'ynn-middleware-hierarchical-param' );

const app = new Ynn( {
    root : __dirname,
    debugging : true
} );

/**
 * the middleware will try getting "param" from headers and cookie,
 * and add a property to ctx with name "prop"
 */
app.use( param( 'param', 'prop', [ 'header', 'cookie' ] ) );
```
