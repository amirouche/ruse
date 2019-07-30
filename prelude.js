function voidf(k) { return k(undefined); };

function pk() {
    console.log.apply(console, arguments);
    return arguments[arguments.length - 1];
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

function wrap(v) { return function(k) { return k(v); } ;};

function unwrap(k) { return k(returnk) };

function apply2(func, args) {
    // unwrap ARGS and apply FUNC
    args = args.map(unwrap);
    return func.apply(undefined, args);
}

/* primitives */

function add(a, b) {
    return a + b;
}

function times(a, b) {
    return a * b;
}

/* testing javascript-procedure and javascript-callable */

function frob(a, b, c) {
    return a + b + c;
}

function frob2(func) {
    out = func(42, 42);
    return out;
}

/* others */

let EMPTY_LIST = {type: 'empty list'};

function assume(v, message) {
    console.assert(v, message);
}

/* symbols */

let SYMBOLS = {};

function ruse_symbol_get_or_create(string) {

    let out = SYMBOLS[string];
    if (out === undefined) {
        out = {$type: "symbol", $value: string};
        SYMBOLS[string] = out;
    }
    return out;
}

/* define-record-type helpers */

function ruse_make_record_type(name) {
    let tags = shift(arguments);
    let fields = {};
    for(let k in tags){
        fields[tags[k]] = k;
    }
    return {$type: "record", $subtype: name, fields: fields};
}

function ruse_record_predicate(record, name) {
    return record.$subtype == name;
}


function ruse_record_set_field(record, name, value) {
    record[name] = value;
}

function ruse_record_ref_field(record, name) {
    return record[name];
}

/* program */

let program =
