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

function apply2(func, args) {
    // unwrap ARGS and apply FUNC
    args = args.map(function(v) { return v(returnk); });
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

let program =
