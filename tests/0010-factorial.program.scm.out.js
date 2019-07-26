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
(function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, fact_0 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return (function( k ) {  return k ( (function( k, t_3 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return fact_0 ( (function( v ) {  return (function(  ) {  return (function( k ) {  return k ( 100 ) ;}) ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( 1 ) ;}) ( (function( v1 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}), (function( kv ) {  return kv ( v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  fact_0 = (function( k ) {  return k ( (function( k, n_1, total_2 ) {  return (function(  ) {  return (function( k ) {  return (function( k ) {  return (function(  ) {  return n_1 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( 0 ) ;}) ( (function( v1 ) {  return k ( v0 === v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( kif ) {  return /* if */ kif ? (function(  ) {  return total_2 ( k ) ;}) : (function(  ) {  return (function( k ) {  return (function(  ) {  return fact_0 ( (function( v ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return n_1 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( -1 ) ;}) ( (function( v1 ) {  return k ( add ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  return total_2 ( (function( v0 ) {  return (function(  ) {  return n_1 ( (function( v1 ) {  return k ( times ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( v1 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}), (function( kv ) {  return kv ( v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( k ) ;}) ;}) ) ;}); return k ( voidf ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return voidf ( (function( v0 ) {  return (function(  ) {  return v ( k, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
