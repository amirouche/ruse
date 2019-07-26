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
(function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, square_0 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return square_0 ( (function( v ) {  return (function(  ) {  return (function( k ) {  return k ( 1337 ) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, value_1 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return value_1 ( (function( v0 ) {  return (function(  ) {  return value_1 ( (function( v1 ) {  return k ( times ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
