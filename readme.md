# objextension [![Build Status](https://travis-ci.org/nperez0111/objExtension.svg?branch=master)](https://travis-ci.org/nperez0111/objExtension)

> The implementation of several methods the Object class that is missing for all objects
> This uses Symbols to add to the prototype of the Object class, if you are not comfortable with this there is an option to add this to any class you please.


## Install

```
$ npm install --save objextension
```


## Usage

```js
const o = require('objextension')();
let x = {
	a:1,
    b:{
    	c:4
    },
    d:[1,2,3]
}
x[o.pick]('a')
//=> 1
```


## API

### objextension([options])

#### Options

Type: `object`

Currently the only option to specify is toExtend where you can provide a class you would like to extend such as:

```js
let single = function () {
    this.x = 34
}

let go = require('objextension')( {
    toExtend: single
} )

( new single() )[ go.pick ]( 'x' )
//=> 34
```

#### Methods that are now available to all objects

##### pick( query )

###### query

Type: `string or Array of strings`

Returns the value of an object the specified key.
```js
x[ o.pick ]('a')
//=> 1
```

##### keys( )

Returns the keys of an object as an `Array`.
```js
x[ o.keys ]()
//=> [ 'a', 'b', 'd' ]
```

##### values( )

Returns the values of an object as an `Array`.
```js
x[ o.values ]()
//=>[ 1, { c:4 }, [ 1, 2, 3 ] ]
```

##### forEach( callback )

###### callback

Type: `function`
Accepts: `(Current Value, Current Key, Object itself)`

Performs `callback` once for each value of each key of the object.
```js
x[ please.forEach ]( function ( currentValue, currentKey, obj ) {
        console.log(currentValue);
    } )
//=> 1
//=> { c:4 }
//=> [ 1, 2, 3 ]
```

## License

MIT © [Nick The Sick](http://nickthesick.com)
