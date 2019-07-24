function trampoline(thunk) {
    while (thunk && typeof thunk === "function") {
//        console.log('boing');
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
(function( k ) { return  (function(  ) { return  (function( k ) { return  k ( 1 ) ;}) ( (function( v1 ) { return  (function(  ) { return  (function( k ) { return  k ( 2 ) ;}) ( (function( v2 ) { return  k ( add ( v1, v2 ) ) ;}) ) ;}) ;}) ) ;}) ;})
;


trampoline(function() {return program (console.log);});
