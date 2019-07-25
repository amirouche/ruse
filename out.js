function pk(x, y) {
    console.log("pk", x, y);
    return voidf;
}

function trampoline(thunk) {
    // console.log('trampoline start', thunk)
    while (thunk && typeof thunk === "function") {
        // console.log('boing');
        thunk = thunk();
    }
    return thunk
}

var cc = false;

function add(a, b) {
    return a + b;
}

function times(a, b) {
    return a * b;
}

function quote(x) { return x };

function voidf(k) { return k(undefined); };

let program =
(function( k ) {  return (function( k ) {  return k ( (function( kk, k_0 ) {  return (function(  ) {  return (function( kxx ) {  return (function(  ) {  return k_0 ( (function( v ) {  return (function(  ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( kxx, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( kk ) ;}) ;}) ) ;}) ( (function( proc ) {  return proc ( k, (function( v ) {  return v ( (function( a, b, c ) {  return b ( k ) ;}) ) ;}) ) ;}) ) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
