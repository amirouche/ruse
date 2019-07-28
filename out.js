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
(function( k ) {  return (function( k ) {  return k ( (function( k, t_0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_1 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_2 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_3 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_4 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_5 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_6 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_7 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_8 ) {  return (function( k ) {  return (function( k ) {  return k ( 9 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 8 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 7 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 6 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 5 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 4 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 3 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 2 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 1 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 0 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
