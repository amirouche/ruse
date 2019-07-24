function pk(x, y) {
    console.log("pk", x, y);
    return voidf;
}

function trampoline(thunk) {
    // console.log('trampoline start', thunk)
    while (thunk && typeof thunk === "function") {
        // console.log('boing');
        thunk = thunk();
    }
    return thunk
}

var cc = false;

function add(a, b) {
    return a + b;
}

function times(a, b) {
    return a * b;
}

function quote(x) { return x };

function voidf(k) { return k(undefined); };

let program =
