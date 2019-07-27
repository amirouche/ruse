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
(function( k ) {  return (function( k ) {  return k ( (function( k, cont_0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_1 ) {  return (function( k ) {  return k ( 42 ) ;}) ( k ) ;}) ) ;}) ( (function( v ) {  return (function( k ) {  return k ( 0 ) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( proc ) {  return proc ( k, (function( v ) {  return v ( (function( a, b, c ) {  return b ( k ) ;}) ) ;}) ) ;}) ) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
