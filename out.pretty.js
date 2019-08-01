function voidf(k) {
  return k(undefined);
}

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
  return thunk;
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

function returnk(k) {
  return k;
}

function wrap(v) {
  return function(k) {
    return k(v);
  };
}

function unwrap(k) {
  return k(returnk);
}

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

let EMPTY_LIST = { type: "empty list" };

let RUSE_EMPTY_LIST = function(k) {
  return k(EMPTY_LIST);
};

function assume(v, message) {
  console.assert(v, message);
}

/* symbols */

let SYMBOLS = {};

function ruse_symbol_get_or_create(string) {
  let out = SYMBOLS[string];
  if (out === undefined) {
    out = { type: "symbol", value: string };
    SYMBOLS[string] = out;
  }
  return out;
}

/* list */

ruse_cons_record = {
  type: "record",
  subtype: "<cons>",
  fields: { car: 0, cdr: 1 }
};

function ruse_cons(a, b) {
  let instance = { type: ruse_cons, fields: [a, b] };
  return instance;
}

function ruse_arguments_to_list(args) {
  args = Array.prototype.slice.call(args);
  args.shift();
  args.reverse();
  let out = EMPTY_LIST;
  for (k in args) {
    out = wrap(out);
    out = ruse_cons(returnk, args[k], out);
  }

  return wrap(out);
}

function ruse_cons_star() {
  let args = Array.prototype.slice.call(arguments);
  args.reverse();
  let out = args.shift();
  for (k in args) {
    out = ruse_cons(args[k], out);
  }

  return out;
}

/* define-record-type helpers */

function ruse_make_record_type(name) {
  if (name.value == "<cons>") {
    return ruse_cons_record;
  }

  let tags = Array.prototype.slice.call(arguments);
  shift(tags);
  let fields = {};
  for (let i in tags) {
    fields[tags[i].value] = i;
  }
  return { type: "record", subtype: name.value, fields: fields };
}

function ruse_record_constructor(type) {
  return function(k) {
    let args = Array.prototype.slice.call(arguments);
    shift(args);
    // TODO: check correct number of args
    args = args.map(unwrap);
    let instance = { type: type, fields: args };
    return k(instance);
  };
}

function ruse_record_predicate(type) {
  return function(k, obj) {
    obj = unwrap(obj).type;
    return k(obj === type);
  };
}

function ruse_record_modifier(type, name) {
  let index = type.fields[name.value];
  return function(k, instance, value) {
    instance = unwrap(instance);
    value = unwrap(value);
    instance.fields[index] = value;
    return k(voidf);
  };
}

function ruse_record_accessor(type, name) {
  let index = type.fields[name.value];
  return function(k, instance) {
    instance = unwrap(instance);
    let v = instance.fields[index];
    return k(v);
  };
}

/* program */

let program = function(k) {
  return (function(k) {
    return k(function(k, ruse_cons__1, ruse_cons_0) {
      return (function(k) {
        return (function(k) {
          return k(function(k, list_2) {
            return (function(k) {
              return (function(k) {
                return k(function(k, t_4) {
                  return (function(k) {
                    return list_2(function(v0) {
                      return (function(k) {
                        return k(1);
                      })(function(t_5) {
                        return (function(k) {
                          return k(2);
                        })(function(t_6) {
                          return (function(k) {
                            return k(3);
                          })(function(v) {
                            return function() {
                              return v0(
                                k,
                                function(k) {
                                  return k(t_5);
                                },
                                function(k) {
                                  return k(t_6);
                                },
                                function(k) {
                                  return k(v);
                                }
                              );
                            };
                          });
                        });
                      });
                    });
                  })(k);
                });
              })(function(v0) {
                return (function(k) {
                  return (function(k) {
                    return k(function(k) {
                      foobar_3 = ruse_arguments_to_list(arguments);
                      return foobar_3(k);
                    });
                  })(function(v) {
                    list_2 = function(k) {
                      return k(v);
                    };
                    return k(voidf);
                  });
                })(function(v) {
                  return function() {
                    return v0(k, function(k) {
                      return k(v);
                    });
                  };
                });
              });
            })(k);
          });
        })(function(v0) {
          return voidf(function(v) {
            return function() {
              return v0(k, function(k) {
                return k(v);
              });
            };
          });
        });
      })(k);
    });
  })(function(v0) {
    return (function(k) {
      return k(function() {
        let t_8 = Array.prototype.slice.call(arguments);
        let k = shift(t_8);
        return k(apply2(ruse_cons_star, t_8));
      });
    })(function(t_10) {
      return (function(k) {
        return k(function() {
          let t_9 = Array.prototype.slice.call(arguments);
          let k = shift(t_9);
          return k(apply2(ruse_cons, t_9));
        });
      })(function(v) {
        return function() {
          return v0(
            k,
            function(k) {
              return k(t_10);
            },
            function(k) {
              return k(v);
            }
          );
        };
      });
    });
  });
};
function output(x) {
  pk("output", x);
  return function() {};
}

trampoline(function() {
  return program(output);
});
