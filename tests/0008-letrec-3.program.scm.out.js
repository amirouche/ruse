function voidf(k) { return k(undefined); };

function pk() {
    console.log.apply(console, arguments);
}

function trampoline(thunk) {
    // console.log('trampoline start', thunk)
    while (thunk && typeof thunk === "function") {
        // console.log('boing');
        thunk = thunk();
    }
    return thunk
}

function prepend(v, a) {
    // a.slice().unshift(0); // avoid mutation with copy
    a.unshift(v);
    return a;
}

function apply(func, args) {
    return func.apply(this, args);
}

function add(a, b) {
    return a + b;
}

function times(a, b) {
    return a * b;
}

let program =
(function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, input_0 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, odd__2, even__1 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, t_5 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, t_6 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return odd__2 ( (function( v ) {  return (function(  ) {  return input_0 ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  even__1 = (function( k ) {  return k ( (function( k, x_3 ) {  return (function(  ) {  return (function( k ) {  return (function( k ) {  return (function(  ) {  return x_3 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( 0 ) ;}) ( (function( v1 ) {  return k ( v0 === v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( kif ) {  return /* if */ kif ? (function(  ) {  return (function( k ) {  return k ( 1 ) ;}) ( k ) ;}) : (function(  ) {  return (function( k ) {  return (function(  ) {  return odd__2 ( (function( v ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return x_3 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( -1 ) ;}) ( (function( v1 ) {  return k ( add ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( k ) ;}) ;}) ) ;}); return k ( voidf ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  odd__2 = (function( k ) {  return k ( (function( k, x_4 ) {  return (function(  ) {  return (function( k ) {  return (function( k ) {  return (function(  ) {  return x_4 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( 0 ) ;}) ( (function( v1 ) {  return k ( v0 === v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( kif ) {  return /* if */ kif ? (function(  ) {  return (function( k ) {  return k ( 0 ) ;}) ( k ) ;}) : (function(  ) {  return (function( k ) {  return (function(  ) {  return even__1 ( (function( v ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return x_4 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( -1 ) ;}) ( (function( v1 ) {  return k ( add ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( k ) ;}) ;}) ) ;}); return k ( voidf ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return voidf ( (function( v0 ) {  return (function(  ) {  return voidf ( (function( v1 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}), (function( kv ) {  return kv ( v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
