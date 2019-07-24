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
