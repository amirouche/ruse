function voidf(k) { return k(undefined); };

function pk() {
    console.log.apply(console, arguments);
    return arguments[arguments.length - 1];
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

function wrap(v) { return function(k) { return k(v); } ;};

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

function frob2(func) {
    out = func(42, 42);
    return out;
}


let EMPTY_LIST = function() { return "EMPTY LIST"; };

let program =
(function( k ) {  return (function( k ) {  return k ( (function( k, factorial_0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_3 ) {  return (function( k ) {  return factorial_0 ( (function( v0 ) {  return (function( k ) {  return k ( 1000000 ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  factorial_0 = (function( k ) {  return k ( (function( k, n_1, total_2 ) {  return (function( k ) {  return (function( k ) {  return n_1 ( (function( v0 ) {  return (function( k ) {  return k ( 0 ) ;}) ( (function( v1 ) {  return k ( v0 === v1 ) ;}) ) ;}) ) ;}) ( (function( kif ) {  return /* if */ kif ? total_2 ( k ) : (function( k ) {  return factorial_0 ( (function( v0 ) {  return (function( k ) {  return n_1 ( (function( v0 ) {  return (function( k ) {  return k ( -1 ) ;}) ( (function( v1 ) {  return k ( add ( v0, v1 ) ) ;}) ) ;}) ) ;}) ( (function( t_4 ) {  return (function( k ) {  return n_1 ( (function( v0 ) {  return total_2 ( (function( v1 ) {  return k ( times ( v0, v1 ) ) ;}) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_4 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( k ) ;}) ) ;}); return k ( voidf ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return voidf ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
