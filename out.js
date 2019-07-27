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
(function( k ) {  return (function( k ) {  return k ( (function( k, abc_0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_1 ) {  return abc_0 ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  abc_0 = (function( k ) {  return k ( 42 ) ;}); return k ( voidf ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return voidf ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
