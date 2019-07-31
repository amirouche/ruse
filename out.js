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
        out = {type: "symbol", value: string};
        SYMBOLS[string] = out;
    }
    return out;
}

/* define-record-type helpers */

function ruse_make_record_type(name) {
    let tags = Array.prototype.slice.call(arguments);
    shift(tags);
    let fields = {};
    for(let i in tags){
        fields[tags[i].value] = i;
    }
    return {type: "record", subtype: name.value, fields: fields};
}

function ruse_record_constructor(type) {
    return function (k) {
        let args = Array.prototype.slice.call(arguments);
        shift(args)
        // TODO: check correct number of args
        args = args.map(unwrap);
        let instance = {type: type, fields: args};
        return k(instance);
    }
}

function ruse_record_predicate(type) {
    return function(k, obj) {
        obj = unwrap(obj).type
        return k(obj === type);
    }
}

function ruse_record_modifier(type, name) {
    let index = type.fields[name.value];
    return function(k, instance, value) {
        instance = unwrap(instance);
        value = unwrap(value);
        instance.fields[index] = value;
        return k(voidf);
    }
}

function ruse_record_accessor(type, name) {
    let index = type.fields[name.value];
    return function(k, instance) {
        instance = unwrap(instance);
        let v = instance.fields[index];
        return k(v);
    }
}

/* program */

let program =
(function( k ) {  return (function( k ) {  return k ( (function( k, x_12, set_cdr__11, cdr_10, set_car__9, car_8, pair__7, cons_6, _cons__5, ruse_record_modifier_4, ruse_record_accessor_3, ruse_record_predicate_2, ruse_record_constructor_1, ruse_make_record_type_0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_13 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_14 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_15 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_16 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_17 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_18 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_19 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_20 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_21 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_22 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_23 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_24 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_25 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_26 ) {  return (function( k ) {  return car_8 ( (function( v0 ) {  return x_12 ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return set_car__9 ( (function( v0 ) {  return x_12 ( (function( t_27 ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_27 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return cons_6 ( (function( v0 ) {  return (function( k ) {  return k ( 1 ) ;}) ( (function( t_28 ) {  return (function( k ) {  return k ( 2 ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_28 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ( (function( v ) {  x_12 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return ruse_record_modifier_4 ( (function( v0 ) {  return _cons__5 ( (function( t_29 ) {  return (function( k ) {  return k ( ruse_symbol_get_or_create ( "cdr" ) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_29 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ( (function( v ) {  set_cdr__11 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return ruse_record_accessor_3 ( (function( v0 ) {  return _cons__5 ( (function( t_30 ) {  return (function( k ) {  return k ( ruse_symbol_get_or_create ( "cdr" ) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_30 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ( (function( v ) {  cdr_10 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return ruse_record_modifier_4 ( (function( v0 ) {  return _cons__5 ( (function( t_31 ) {  return (function( k ) {  return k ( ruse_symbol_get_or_create ( "car" ) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_31 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ( (function( v ) {  set_car__9 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return ruse_record_accessor_3 ( (function( v0 ) {  return _cons__5 ( (function( t_32 ) {  return (function( k ) {  return k ( ruse_symbol_get_or_create ( "car" ) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_32 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ( (function( v ) {  car_8 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return ruse_record_predicate_2 ( (function( v0 ) {  return _cons__5 ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( (function( v ) {  pair__7 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return ruse_record_constructor_1 ( (function( v0 ) {  return _cons__5 ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( (function( v ) {  cons_6 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return ruse_make_record_type_0 ( (function( v0 ) {  return (function( k ) {  return k ( ruse_symbol_get_or_create ( "<cons>" ) ) ;}) ( (function( t_33 ) {  return (function( k ) {  return k ( ruse_symbol_get_or_create ( "car" ) ) ;}) ( (function( t_34 ) {  return (function( k ) {  return k ( ruse_symbol_get_or_create ( "cdr" ) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_33 ) ;}), (function( k ) {  return k ( t_34 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ( (function( v ) {  _cons__5 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function() { let  t_35  = Array.prototype.slice.call(arguments); let k = shift ( t_35 ); return k ( apply2 ( ruse_record_modifier, t_35 ) ) ;}) ) ;}) ( (function( v ) {  ruse_record_modifier_4 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function() { let  t_36  = Array.prototype.slice.call(arguments); let k = shift ( t_36 ); return k ( apply2 ( ruse_record_accessor, t_36 ) ) ;}) ) ;}) ( (function( v ) {  ruse_record_accessor_3 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function() { let  t_37  = Array.prototype.slice.call(arguments); let k = shift ( t_37 ); return k ( apply2 ( ruse_record_predicate, t_37 ) ) ;}) ) ;}) ( (function( v ) {  ruse_record_predicate_2 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function() { let  t_38  = Array.prototype.slice.call(arguments); let k = shift ( t_38 ); return k ( apply2 ( ruse_record_constructor, t_38 ) ) ;}) ) ;}) ( (function( v ) {  ruse_record_constructor_1 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function() { let  t_39  = Array.prototype.slice.call(arguments); let k = shift ( t_39 ); return k ( apply2 ( ruse_make_record_type, t_39 ) ) ;}) ) ;}) ( (function( v ) {  ruse_make_record_type_0 = (function( k ) {  return k ( v ) ;}); return k ( voidf ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return voidf ( (function( t_40 ) {  return voidf ( (function( t_41 ) {  return voidf ( (function( t_42 ) {  return voidf ( (function( t_43 ) {  return voidf ( (function( t_44 ) {  return voidf ( (function( t_45 ) {  return voidf ( (function( t_46 ) {  return voidf ( (function( t_47 ) {  return voidf ( (function( t_48 ) {  return voidf ( (function( t_49 ) {  return voidf ( (function( t_50 ) {  return voidf ( (function( t_51 ) {  return voidf ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( t_40 ) ;}), (function( k ) {  return k ( t_41 ) ;}), (function( k ) {  return k ( t_42 ) ;}), (function( k ) {  return k ( t_43 ) ;}), (function( k ) {  return k ( t_44 ) ;}), (function( k ) {  return k ( t_45 ) ;}), (function( k ) {  return k ( t_46 ) ;}), (function( k ) {  return k ( t_47 ) ;}), (function( k ) {  return k ( t_48 ) ;}), (function( k ) {  return k ( t_49 ) ;}), (function( k ) {  return k ( t_50 ) ;}), (function( k ) {  return k ( t_51 ) ;}), (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;}) ) ;})
;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
