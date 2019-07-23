function trampoline(obj) {
    console.log('start');
    while (obj && typeof obj === 'function') {
        console.log('boing');
        obj = obj();
    }
    return obj
}

function pk() {
    console.log(arguments);
}

function sum(n, total) {
    return n === 0 ? total : sum(n-1, total + 1);
}

function add(a, b) {
    return a + b
}

function sum(n, total, k) {
    return n === 0 ? function() { return k(total)} : function() { return sum(n-1, total + 1, k)};
}

trampoline(sum(10, 0, pk));
