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

function shift(a) {
    return a.shift();
}

function apply(func, args) {
    // apply FUNC to ARGS
    return func.apply(undefined, args);
}

function returnk(k) { return k; };

function unwrap(k) { return k(returnk) };

function apply2(func, args) {
    // unwrap ARGS and apply FUNC
    args = args.map(unwrap);
    return func.apply(undefined, args);
}


function add(a, b) {
    return a + b;
}

function times(a, b) {
    return a * b;
}

function frob(a, b, c) {
    return a + b + c;
}

let program =
(function( k ) {  return (function( k ) {  return k ( (function( k, frob_0 ) {  return (function( k ) {  return frob_0 ( (function( v0 ) {  return (function( k ) {  return k ( "hello" ) ;}) ( (function( t_1 ) {  return (function( k ) {  return k ( " " ) ;}) ( (function( t_2 ) {  return (function( k ) {  return k ( "world" ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_1 ) ;}), (function( k ) {  return k ( t_2 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return k ( (function() { let  t_3  = Array.prototype.slice.call(arguments); let k = shift ( t_3 ); return k ( apply2 ( frob, t_3 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
