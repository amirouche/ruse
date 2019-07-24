function pk(x, y) {
    console.log("pk", x, y);
    return x;
}

function trampoline(thunk) {
    // console.log('trampoline start', thunk)
    while (thunk && typeof thunk === "function") {
        // console.log('boing', thunk);
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

function quote(x) { return x };

function voidf(k) { return k(undefined); };

let program =
