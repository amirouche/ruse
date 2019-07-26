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
(function( k ) {  return k ( 42 ) ;})
;

function output(x) {
    pk(x);
    return function() {};
}


trampoline(function() {return program (output);});
