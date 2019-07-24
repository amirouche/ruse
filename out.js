function pk(x, y, z, t) {
    console.log("pk", x, y, z, t);
}

function trampoline(thunk) {
    console.log('trampoline start', thunk)
    while (thunk && typeof thunk === "function") {
        console.log('boing', thunk);
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
(function( cc ) { return  (function(  ) { return  (function( k ) { return  k ( (function( kk, cont_0 ) { return  (function(  ) { return  (function( k ) { return  (function(  ) { return  cont_0 ( (function( returnx ) { return  returnx ;}) ) ( k, (function( k ) { return  k ( 42 ) ;}) ) ;}) ;}) ( kk ) ;}) ;}) ) ;}) ( (function( v ) { return  v ( cc, cc ) ;}) ) ;}) ;})
;

function output(x, y, z, t) {
    pk('output', x, y, z, t);
    return function() {};
}


trampoline(function() {return program (output);});
