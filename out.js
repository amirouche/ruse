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
(function( k ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return k ( (function( k ) {  return k ( 42 ) ;}), (function( k ) {  return k ( 1337 ) ;}) ) ;}) ;}) ( (function() { let  args  = Array.prototype.slice.call(arguments); return (function(  ) {  return (function( k ) {  return k ( (function( k, a_0, b_1 ) {  return (function(  ) {  return b_1 ( k ) ;}) ;}) ) ;}) ( (function( v1 ) {  return apply ( v1, prepend ( k, args ) ) ;}) ) ;}) ;}) ) ;}) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
