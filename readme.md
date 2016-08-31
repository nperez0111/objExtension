# objExtension [![Build Status](https://travis-ci.org/nperez0111/objExtension.svg?branch=master)](https://travis-ci.org/nperez0111/objExtension)

> The implementation of several methods the Object class that is missing for all objects
> This uses Symbols to add to the prototype of the Object class, if you are not comfortable with this there is an option to add this to any class you please.
> This adds most of the array methods to an Object allowing you to use your functional programming on objects as well.


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

##### keyOf( query , searchingArray )

###### query

Type: `Anything or Array of Anythings`
###### searchingArray

Type: `Boolean`<br>
Description: If you are searching for an array as the value set this to true otherwise it will search for each value in that array.
Default: false

Returns the key of the object where `query` is found. This is a pick method for the key of the object.
```js
x[ o.keyOf ](1)
//=> 'a'
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

##### map( callback )

###### callback

Type: `function`
Accepts: `(Current Value, Current Key, Object itself)`

Performs `callback` once for each value of each key of the object. Returns a new object  with the values transformed.

```js
x[ please.map ]( function ( currentValue, currentKey, obj ) {
        if( Number(currentValue)===currentValue ){
        	return currentValue+1;
        }
        if( Array.isArray( currentValue ) ){
        	return currentValue.map(function(cur,i,arr){
            	return cur+2;
            });
        }
        return currentValue;
    } )
//=> { a:2, b:{ c:4 }, d:[ 3, 4, 5 ] }
```

##### every( callback )

###### callback

Type: `function`
Accepts: `(Current Value, Current Key, Object itself)`

Performs `callback` once for each value of each key of the object. Returns true **if and only if** callback returns true for every value of the object.

```js
let does=please;
x[ does.every ]( function ( currentValue, currentKey, obj ) {
        if( Number(currentValue)===currentValue ){
        	return true;
        }
        return false
    } )
 //=> false
 ```
 
 ##### none( callback )

###### callback

Type: `function`
Accepts: `(Current Value, Current Key, Object itself)`

Performs `callback` once for each value of each key of the object. Returns true **if and only if** callback returns false for every value of the object.

```js
let does=please;
x[ does.none ]( function ( currentValue, currentKey, obj ) {
        if( Number(currentValue)===currentValue ){
        	return true;
        }
        return false
    } )
 //=> false
 ```


##### some( callback )

###### callback

Type: `function`
Accepts: `(Current Value, Current Key, Object itself)`

Performs `callback` once for each value of each key of the object. Returns true if `callback` returns true for **any** value of the object.

```js
let does=please;
x[ does.some ]( function ( currentValue, currentKey, obj ) {
        if( Number(currentValue)===currentValue ){
        	return true;
        }
        return false
    } )
 //=> true
 ```
 
 ##### filter( callback )

###### callback

Type: `function`
Accepts: `(Current Value, Current Key, Object itself)`

Performs `callback` once for each value of each key of the object. Returns a new object with the values **if and only if** callback returns true for the value of the object.

```js
let does=please;
x[ does.filter ]( function ( currentValue, currentKey, obj ) {
        if( Number(currentValue)===currentValue ){
        	return true;
        }
        return false
    } )
 //=> { a: 1 }
 ```


## License

MIT © [Nick The Sick](http://nickthesick.com)
