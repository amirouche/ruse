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
(function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, abc_1, def_0 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, x_2 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return x_2 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( -1 ) ;}) ( (function( v1 ) {  return k ( add ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return abc_1 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return def_0 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( 100 ) ;}) ( (function( v1 ) {  return k ( times ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( v1 ) {  return k ( add ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( 101 ) ;}) ( (function( v1 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}), (function( kv ) {  return kv ( v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
