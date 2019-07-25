let fact = function(n) {
    return n === 0 ? 1: n * fact(n-1);
}

console.log(fact(1000000, 1))
