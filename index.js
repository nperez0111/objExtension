'use strict';
const extend = require( 'objextender' ),
    merge = require( 'merge' ),
    isObj = require( 'is-object' ),
    addDiff = function ( that, obj ) {
        Object.keys( obj ).forEach( function ( cur ) {
            if ( isObj( obj[ cur ] ) ) {
                if ( !that.hasOwnProperty( cur ) || !isObj( that[ cur ] ) ) {
                    that[ cur ] = {};
                }
                addDiff( that[ cur ], obj[ cur ] );
            } else if ( !that.hasOwnProperty( cur ) ) {

                that[ cur ] = obj[ cur ];
            }
        } );
    },
    makeObj = function ( keys, values ) {
        let ret = {}

        if ( Array.isArray( keys ) && Array.isArray( values ) ) {

            keys.forEach( ( cur, i ) => {

                ret[ cur ] = values[ i ]

            } )

        } else {

            ret[ keys ] = values

        }

        return ret

    },
    allOptions = {
        pick: function ( get, prop ) {
            let obj = get()

            if ( Array.isArray( prop ) ) {

                let ret = {};
                prop.forEach( ( cur ) => {

                    ret[ cur ] = allOptions.pick( get, cur )

                } )

                return ret

            }
            if ( !obj.hasOwnProperty( prop ) ) {

                throw Error( `Object does not have property '${cur}'` )

            }
            return obj[ prop ];
        },
        keys: function ( get ) {
            return Object.keys( get() )
        },
        values: function ( get ) {
            return allOptions.keys( get ).map( key => get()[ key ] )
        },
        forEach: function ( get, doThat ) {

            let obj = get()

            return allOptions.keys( get ).forEach( function ( cur ) {

                doThat.call( obj, obj[ cur ], cur, obj )

            } )

        },
        map: function ( get, doThat ) {

            let obj = get(),
                keys = Object.keys( obj )

            return makeObj( keys, keys.map( function ( cur, i ) {

                return doThat.call( obj, obj[ cur ], cur, obj )

            } ) )

        },
        every: function ( get, check ) {
            return allOptions.values( get ).every( check )
        },
        none: function ( get, check ) {
            return !allOptions.every( get, check )
        },
        some: function ( get, check ) {
            return allOptions.values( get ).some( check )
        },
        filter: function ( get, check ) {
            let keys = allOptions.keys( get ),
                temp = [
                    [],
                    []
                ],
                vals = allOptions.values( get ),
                indexThatPassed = vals.forEach( function ( cur, i, arr ) {
                    if ( check.call( get(), cur, i, arr ) ) {

                        temp[ 0 ].push( keys[ i ] )
                        temp[ 1 ].push( cur )

                    }

                } );

            return makeObj( temp[ 0 ], temp[ 1 ] )

        },
        keyOf: function ( get, query ) {
            let index = allOptions.values( get ).indexOf( query )
            if ( index === -1 ) {
                return false
            }
            return allOptions.keys( get )[ index ]
        },
        includes: function ( get, query ) {
            return allOptions.keyOf( get, query ) === false ? false : true
        },
        has: function ( get, query ) {
            return allOptions.keys( get ).indexOf( query ) > -1
        },
        copy: function ( get ) {
            return makeObj( allOptions.keys( get ), allOptions.values( get ) )
        },
        remove: function ( get, key ) {
            if ( Array.isArray( key ) ) {
                return key.map( ( c ) => {
                    return allOptions.remove.call( this, get, c )
                } )
            }
            if ( this.hasOwnProperty( key ) ) {
                let val = this[ key ]
                delete this[ key ]
                return val;
            }
            return false;
        },
        extend: function ( get ) {
            return merge.recursive.apply( this, [ true ].concat( get() ).concat( Array.from( arguments ).slice( 1 ) ) );
        },
        assign: function ( get ) {
            addDiff.call( this, this, allOptions.extend.apply( this, arguments ) )
            return this;
        }
    }

module.exports = ( opts ) => {
    if ( opts === undefined ) {
        return extend( allOptions );
    }
    if ( opts.toExtend ) {
        return extend( allOptions, {
            toExtend: opts.toExtend
        } )
    }
};
