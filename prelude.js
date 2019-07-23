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
