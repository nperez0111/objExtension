import test from 'ava';
import fn from './';
let please = fn(),
    x = {
        a: {
            c: 1
        },
        b: 2,
        d: true
    }

test( 'Pick Method', t => {
    t.true( x[ please.pick ]( 'd' ) )
    t.deepEqual( x[ please.pick ]( [ 'd', 'b' ] ), {
        b: 2,
        d: true
    } )
    t.throws( function () {
        x[ please.pick ]( 'notExistent' )
    } )
} )

test( 'Keys Method', t => {
    t.deepEqual( x[ please.keys ](), [ 'a', 'b', 'd' ] )
} )

test( 'Values Method', t => {
    t.deepEqual( x[ please.values ](), [ {
        c: 1
    }, 2, true ] )
} )

test( 'ForEach Method', t => {
    var i = 0;
    x[ please.forEach ]( function () {
        i++
    } )
    t.deepEqual( i, 3 )
} )

test( 'Map Method', t => {
    t.deepEqual( x[ please.map ]( function ( cur, key ) {
        return key
    } ), {
        a: 'a',
        b: 'b',
        d: 'd'
    } )
} )

test( 'Every Method', t => {
    t.true( x[ please.every ]( function ( a ) {
        return a === a;
    } ) )
    t.false( x[ please.every ]( function ( a ) {
        return Number( a ) === a;
    } ) )
} )

test( 'Some Method', t => {
    t.true( x[ please.some ]( function ( a ) {
        return Number( a ) === a
    } ) )
} )

test( 'Filter Method', t => {
    t.deepEqual( x[ please.filter ]( function ( a ) {
        return Number( a ) === a
    } ), {
        b: 2
    } )
} )

test( 'Keyof Method', t => {
    t.deepEqual( x[ please.keyOf ]( true ), "d" )
} )

test( 'Includes Method', t => {
    t.true( x[ please.includes ]( true ) )
} )

test( 'Has Method', t => {
    t.true( x[ please.has ]( 'a' ) )
} )

test( 'Copy Method', t => {
    let y = {
        s: 3
    }
    t.deepEqual( y[ please.copy ](), {
        s: 3
    } )
} )

test( 'Remove Method', t => {
    let y = {
        d: 34,
        c: 35,
        f: 34,
        l: 25
    }
    t.is( y[ please.remove ]( "d" ), 34 )
    t.deepEqual( y, {
        c: 35,
        f: 34,
        l: 25
    } )
    t.deepEqual( y[ please.remove ]( [ "c", "f" ] ), [ 35, 34 ] )
} )

test( 'Extend Method', t => {
    let y = {
        d: 3
    }
    t.deepEqual( y[ please.extend ]( {
        x: 3
    } ), {
        d: 3,
        x: 3
    } )
    t.deepEqual( y, {
        d: 3
    } )
} )

test( 'Assign Method', t => {
    let y = {
        d: 3
    }
    t.deepEqual( y[ please.assign ]( {
        x: 3
    } ), {
        d: 3,
        x: 3
    } )
    t.deepEqual( y, {
        d: 3,
        x: 3
    } )
} )

test( 'Extend single Obj Option', t => {
    let single = function () {
        this.x = 34
    }

    let go = fn( {
        toExtend: single
    } )

    t.is( ( new single() )[ go.pick ]( 'x' ), 34 )

} )
