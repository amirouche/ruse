function voidf(k) { return k(undefined); };

function pk(x) {
    console.log(x);
}

function trampoline(thunk) {
    // console.log('trampoline start', thunk)
    while (thunk && typeof thunk === "function") {
        // console.log('boing');
        thunk = thunk();
    }
    return thunk
}

function add(a, b) {
    return a + b;
}

function times(a, b) {
    return a * b;
}

let program =
(function( kxx ) {  return (function(  ) {  return (function( k ) {  return k ( (function( kk, factorial_0 ) {  return (function(  ) {  return (function( kxx ) {  return (function(  ) {  return (function( k ) {  return k ( (function( kk, t_3 ) {  return (function(  ) {  return (function( kxx ) {  return (function(  ) {  return factorial_0 ( (function( v ) {  return (function(  ) {  return (function( k ) {  return k ( 100 ) ;}) ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( 1 ) ;}) ( (function( v1 ) {  return (function(  ) {  return v ( kxx, (function( kv ) {  return kv ( v0 ) ;}), (function( kv ) {  return kv ( v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( kk ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return (function( k ) {  return (function(  ) {  factorial_0 = (function( k ) {  return k ( (function( kk, n_1, total_2 ) {  return (function(  ) {  return (function( k ) {  return (function( kpr ) {  return (function(  ) {  return n_1 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( 0 ) ;}) ( (function( v1 ) {  return kpr ( v0 === v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( kif ) {  return /* if */ kif ? (function(  ) {  return total_2 ( k ) ;}) : (function(  ) {  return (function( kxx ) {  return (function(  ) {  return factorial_0 ( (function( v ) {  return (function(  ) {  return (function( kpr ) {  return (function(  ) {  return n_1 ( (function( v0 ) {  return (function(  ) {  return (function( k ) {  return k ( -1 ) ;}) ( (function( v1 ) {  return kpr ( add ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return (function( kpr ) {  return (function(  ) {  return n_1 ( (function( v0 ) {  return (function(  ) {  return total_2 ( (function( v1 ) {  return kpr ( times ( v0, v1 ) ) ;}) ) ;}) ;}) ) ;}) ;}) ( (function( v1 ) {  return (function(  ) {  return v ( kxx, (function( kv ) {  return kv ( v0 ) ;}), (function( kv ) {  return kv ( v1 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( k ) ;}) ;}) ) ;}) ( kk ) ;}) ;}) ) ;}); return k ( voidf ) ;}) ;}) ( (function( v0 ) {  return (function(  ) {  return v ( kxx, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;}) ( kk ) ;}) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return voidf ( (function( v0 ) {  return (function(  ) {  return v ( kxx, (function( kv ) {  return kv ( v0 ) ;}) ) ;}) ;}) ) ;}) ;}) ) ;}) ;})
;

function output(x) {
    pk(x);
    return function() {};
}


trampoline(function() {return program (output);});
