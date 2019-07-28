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
|(flatten-begin
   (begin
     (pk '42)
     (begin (pk '42) (begin '42 (pk '42)))
     (begin '42 (pk '42))
     (pk '42)))
|(begin
   (pk '42)
   (begin (pk '42) (begin '42 (pk '42)))
   (begin '42 (pk '42))
   (pk '42))
(function( k ) {  return (function( k ) {  return k ( (function( k, t_3 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_4 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_5 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_0 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_2 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_1 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
