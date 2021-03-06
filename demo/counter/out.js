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
  console.assert(b !== undefined);
  let instance = { type: ruse_cons_record, fields: [a, b] };
  return instance;
}

function ruse_arguments_to_list(args) {
  args = Array.prototype.slice.call(args);
  let k = shift(args);
  args.reverse();
  let out = EMPTY_LIST;
  for (i in args) {
    let value = unwrap(args[i]);
    out = ruse_cons(value, out);
  }
  return wrap(out);
}

function ruse_cons_star() {
  let args = Array.prototype.slice.call(arguments);
  // args.shift();
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
    return k(function(k, ruse_cons__5, ruse_cons_4, ruse_list_3) {
      return (function(k) {
        return (function(k) {
          return k(function(
            k,
            pk_18,
            times_17,
            add_16,
            list_15,
            set_cdr__14,
            cdr_13,
            set_car__12,
            car_11,
            pair__10,
            cons_9,
            null__8,
            assume_7
          ) {
            return (function(k) {
              return (function(k) {
                return k(function(k, t_90) {
                  return (function(k) {
                    return (function(k) {
                      return k(function(k, t_91) {
                        return (function(k) {
                          return (function(k) {
                            return k(function(k, t_92) {
                              return (function(k) {
                                return (function(k) {
                                  return k(function(k, patch__38) {
                                    return (function(k) {
                                      return (function(k) {
                                        return k(function(
                                          k,
                                          _create_app_43,
                                          create_app_42,
                                          onClick_41,
                                          init_40,
                                          view_39
                                        ) {
                                          return (function(k) {
                                            return (function(k) {
                                              return k(function(k, t_85) {
                                                return (function(k) {
                                                  return (function(k) {
                                                    return k(function(k, t_86) {
                                                      return (function(k) {
                                                        return (function(k) {
                                                          return k(function(
                                                            k,
                                                            t_87
                                                          ) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return (function(
                                                                k
                                                              ) {
                                                                return k(
                                                                  function(
                                                                    k,
                                                                    t_88
                                                                  ) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return (function(
                                                                        k
                                                                      ) {
                                                                        return k(
                                                                          function(
                                                                            k,
                                                                            t_89
                                                                          ) {
                                                                            return (function(
                                                                              k
                                                                            ) {
                                                                              return create_app_42(
                                                                                function(
                                                                                  v0
                                                                                ) {
                                                                                  return init_40(
                                                                                    function(
                                                                                      t_93
                                                                                    ) {
                                                                                      return view_39(
                                                                                        function(
                                                                                          v
                                                                                        ) {
                                                                                          return function() {
                                                                                            return v0(
                                                                                              k,
                                                                                              function(
                                                                                                k
                                                                                              ) {
                                                                                                return k(
                                                                                                  t_93
                                                                                                );
                                                                                              },
                                                                                              function(
                                                                                                k
                                                                                              ) {
                                                                                                return k(
                                                                                                  v
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          };
                                                                                        }
                                                                                      );
                                                                                    }
                                                                                  );
                                                                                }
                                                                              );
                                                                            })(
                                                                              k
                                                                            );
                                                                          }
                                                                        );
                                                                      })(
                                                                        function(
                                                                          v0
                                                                        ) {
                                                                          return (function(
                                                                            k
                                                                          ) {
                                                                            return (function(
                                                                              k
                                                                            ) {
                                                                              return k(
                                                                                function(
                                                                                  k,
                                                                                  model_44,
                                                                                  mc_45
                                                                                ) {
                                                                                  return (function(
                                                                                    k
                                                                                  ) {
                                                                                    return ruse_list_3(
                                                                                      function(
                                                                                        v0
                                                                                      ) {
                                                                                        return (function(
                                                                                          k
                                                                                        ) {
                                                                                          return k(
                                                                                            ruse_symbol_get_or_create(
                                                                                              "div"
                                                                                            )
                                                                                          );
                                                                                        })(
                                                                                          function(
                                                                                            t_103
                                                                                          ) {
                                                                                            return (function(
                                                                                              k
                                                                                            ) {
                                                                                              return ruse_cons_4(
                                                                                                function(
                                                                                                  v0
                                                                                                ) {
                                                                                                  return (function(
                                                                                                    k
                                                                                                  ) {
                                                                                                    return k(
                                                                                                      ruse_symbol_get_or_create(
                                                                                                        "@"
                                                                                                      )
                                                                                                    );
                                                                                                  })(
                                                                                                    function(
                                                                                                      t_97
                                                                                                    ) {
                                                                                                      return (function(
                                                                                                        k
                                                                                                      ) {
                                                                                                        return ruse_cons_4(
                                                                                                          function(
                                                                                                            v0
                                                                                                          ) {
                                                                                                            return (function(
                                                                                                              k
                                                                                                            ) {
                                                                                                              return ruse_cons_4(
                                                                                                                function(
                                                                                                                  v0
                                                                                                                ) {
                                                                                                                  return (function(
                                                                                                                    k
                                                                                                                  ) {
                                                                                                                    return k(
                                                                                                                      "id"
                                                                                                                    );
                                                                                                                  })(
                                                                                                                    function(
                                                                                                                      t_95
                                                                                                                    ) {
                                                                                                                      return (function(
                                                                                                                        k
                                                                                                                      ) {
                                                                                                                        return ruse_cons_4(
                                                                                                                          function(
                                                                                                                            v0
                                                                                                                          ) {
                                                                                                                            return (function(
                                                                                                                              k
                                                                                                                            ) {
                                                                                                                              return k(
                                                                                                                                "box"
                                                                                                                              );
                                                                                                                            })(
                                                                                                                              function(
                                                                                                                                t_94
                                                                                                                              ) {
                                                                                                                                return RUSE_EMPTY_LIST(
                                                                                                                                  function(
                                                                                                                                    v
                                                                                                                                  ) {
                                                                                                                                    return function() {
                                                                                                                                      return v0(
                                                                                                                                        k,
                                                                                                                                        function(
                                                                                                                                          k
                                                                                                                                        ) {
                                                                                                                                          return k(
                                                                                                                                            t_94
                                                                                                                                          );
                                                                                                                                        },
                                                                                                                                        function(
                                                                                                                                          k
                                                                                                                                        ) {
                                                                                                                                          return k(
                                                                                                                                            v
                                                                                                                                          );
                                                                                                                                        }
                                                                                                                                      );
                                                                                                                                    };
                                                                                                                                  }
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                          }
                                                                                                                        );
                                                                                                                      })(
                                                                                                                        function(
                                                                                                                          v
                                                                                                                        ) {
                                                                                                                          return function() {
                                                                                                                            return v0(
                                                                                                                              k,
                                                                                                                              function(
                                                                                                                                k
                                                                                                                              ) {
                                                                                                                                return k(
                                                                                                                                  t_95
                                                                                                                                );
                                                                                                                              },
                                                                                                                              function(
                                                                                                                                k
                                                                                                                              ) {
                                                                                                                                return k(
                                                                                                                                  v
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                          };
                                                                                                                        }
                                                                                                                      );
                                                                                                                    }
                                                                                                                  );
                                                                                                                }
                                                                                                              );
                                                                                                            })(
                                                                                                              function(
                                                                                                                t_96
                                                                                                              ) {
                                                                                                                return RUSE_EMPTY_LIST(
                                                                                                                  function(
                                                                                                                    v
                                                                                                                  ) {
                                                                                                                    return function() {
                                                                                                                      return v0(
                                                                                                                        k,
                                                                                                                        function(
                                                                                                                          k
                                                                                                                        ) {
                                                                                                                          return k(
                                                                                                                            t_96
                                                                                                                          );
                                                                                                                        },
                                                                                                                        function(
                                                                                                                          k
                                                                                                                        ) {
                                                                                                                          return k(
                                                                                                                            v
                                                                                                                          );
                                                                                                                        }
                                                                                                                      );
                                                                                                                    };
                                                                                                                  }
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      })(
                                                                                                        function(
                                                                                                          v
                                                                                                        ) {
                                                                                                          return function() {
                                                                                                            return v0(
                                                                                                              k,
                                                                                                              function(
                                                                                                                k
                                                                                                              ) {
                                                                                                                return k(
                                                                                                                  t_97
                                                                                                                );
                                                                                                              },
                                                                                                              function(
                                                                                                                k
                                                                                                              ) {
                                                                                                                return k(
                                                                                                                  v
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          };
                                                                                                        }
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            })(
                                                                                              function(
                                                                                                t_104
                                                                                              ) {
                                                                                                return (function(
                                                                                                  k
                                                                                                ) {
                                                                                                  return k(
                                                                                                    "(= count "
                                                                                                  );
                                                                                                })(
                                                                                                  function(
                                                                                                    t_105
                                                                                                  ) {
                                                                                                    return model_44(
                                                                                                      function(
                                                                                                        t_106
                                                                                                      ) {
                                                                                                        return (function(
                                                                                                          k
                                                                                                        ) {
                                                                                                          return k(
                                                                                                            ") "
                                                                                                          );
                                                                                                        })(
                                                                                                          function(
                                                                                                            t_107
                                                                                                          ) {
                                                                                                            return (function(
                                                                                                              k
                                                                                                            ) {
                                                                                                              return ruse_cons__5(
                                                                                                                function(
                                                                                                                  v0
                                                                                                                ) {
                                                                                                                  return (function(
                                                                                                                    k
                                                                                                                  ) {
                                                                                                                    return k(
                                                                                                                      ruse_symbol_get_or_create(
                                                                                                                        "button"
                                                                                                                      )
                                                                                                                    );
                                                                                                                  })(
                                                                                                                    function(
                                                                                                                      t_101
                                                                                                                    ) {
                                                                                                                      return (function(
                                                                                                                        k
                                                                                                                      ) {
                                                                                                                        return ruse_list_3(
                                                                                                                          function(
                                                                                                                            v0
                                                                                                                          ) {
                                                                                                                            return (function(
                                                                                                                              k
                                                                                                                            ) {
                                                                                                                              return k(
                                                                                                                                ruse_symbol_get_or_create(
                                                                                                                                  "@"
                                                                                                                                )
                                                                                                                              );
                                                                                                                            })(
                                                                                                                              function(
                                                                                                                                t_99
                                                                                                                              ) {
                                                                                                                                return (function(
                                                                                                                                  k
                                                                                                                                ) {
                                                                                                                                  return ruse_list_3(
                                                                                                                                    function(
                                                                                                                                      v0
                                                                                                                                    ) {
                                                                                                                                      return (function(
                                                                                                                                        k
                                                                                                                                      ) {
                                                                                                                                        return k(
                                                                                                                                          "onClick"
                                                                                                                                        );
                                                                                                                                      })(
                                                                                                                                        function(
                                                                                                                                          t_98
                                                                                                                                        ) {
                                                                                                                                          return (function(
                                                                                                                                            k
                                                                                                                                          ) {
                                                                                                                                            return mc_45(
                                                                                                                                              function(
                                                                                                                                                v0
                                                                                                                                              ) {
                                                                                                                                                return onClick_41(
                                                                                                                                                  function(
                                                                                                                                                    v
                                                                                                                                                  ) {
                                                                                                                                                    return function() {
                                                                                                                                                      return v0(
                                                                                                                                                        k,
                                                                                                                                                        function(
                                                                                                                                                          k
                                                                                                                                                        ) {
                                                                                                                                                          return k(
                                                                                                                                                            v
                                                                                                                                                          );
                                                                                                                                                        }
                                                                                                                                                      );
                                                                                                                                                    };
                                                                                                                                                  }
                                                                                                                                                );
                                                                                                                                              }
                                                                                                                                            );
                                                                                                                                          })(
                                                                                                                                            function(
                                                                                                                                              v
                                                                                                                                            ) {
                                                                                                                                              return function() {
                                                                                                                                                return v0(
                                                                                                                                                  k,
                                                                                                                                                  function(
                                                                                                                                                    k
                                                                                                                                                  ) {
                                                                                                                                                    return k(
                                                                                                                                                      t_98
                                                                                                                                                    );
                                                                                                                                                  },
                                                                                                                                                  function(
                                                                                                                                                    k
                                                                                                                                                  ) {
                                                                                                                                                    return k(
                                                                                                                                                      v
                                                                                                                                                    );
                                                                                                                                                  }
                                                                                                                                                );
                                                                                                                                              };
                                                                                                                                            }
                                                                                                                                          );
                                                                                                                                        }
                                                                                                                                      );
                                                                                                                                    }
                                                                                                                                  );
                                                                                                                                })(
                                                                                                                                  function(
                                                                                                                                    v
                                                                                                                                  ) {
                                                                                                                                    return function() {
                                                                                                                                      return v0(
                                                                                                                                        k,
                                                                                                                                        function(
                                                                                                                                          k
                                                                                                                                        ) {
                                                                                                                                          return k(
                                                                                                                                            t_99
                                                                                                                                          );
                                                                                                                                        },
                                                                                                                                        function(
                                                                                                                                          k
                                                                                                                                        ) {
                                                                                                                                          return k(
                                                                                                                                            v
                                                                                                                                          );
                                                                                                                                        }
                                                                                                                                      );
                                                                                                                                    };
                                                                                                                                  }
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                          }
                                                                                                                        );
                                                                                                                      })(
                                                                                                                        function(
                                                                                                                          t_102
                                                                                                                        ) {
                                                                                                                          return (function(
                                                                                                                            k
                                                                                                                          ) {
                                                                                                                            return ruse_cons_4(
                                                                                                                              function(
                                                                                                                                v0
                                                                                                                              ) {
                                                                                                                                return (function(
                                                                                                                                  k
                                                                                                                                ) {
                                                                                                                                  return k(
                                                                                                                                    "increment"
                                                                                                                                  );
                                                                                                                                })(
                                                                                                                                  function(
                                                                                                                                    t_100
                                                                                                                                  ) {
                                                                                                                                    return RUSE_EMPTY_LIST(
                                                                                                                                      function(
                                                                                                                                        v
                                                                                                                                      ) {
                                                                                                                                        return function() {
                                                                                                                                          return v0(
                                                                                                                                            k,
                                                                                                                                            function(
                                                                                                                                              k
                                                                                                                                            ) {
                                                                                                                                              return k(
                                                                                                                                                t_100
                                                                                                                                              );
                                                                                                                                            },
                                                                                                                                            function(
                                                                                                                                              k
                                                                                                                                            ) {
                                                                                                                                              return k(
                                                                                                                                                v
                                                                                                                                              );
                                                                                                                                            }
                                                                                                                                          );
                                                                                                                                        };
                                                                                                                                      }
                                                                                                                                    );
                                                                                                                                  }
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                          })(
                                                                                                                            function(
                                                                                                                              v
                                                                                                                            ) {
                                                                                                                              return function() {
                                                                                                                                return v0(
                                                                                                                                  k,
                                                                                                                                  function(
                                                                                                                                    k
                                                                                                                                  ) {
                                                                                                                                    return k(
                                                                                                                                      t_101
                                                                                                                                    );
                                                                                                                                  },
                                                                                                                                  function(
                                                                                                                                    k
                                                                                                                                  ) {
                                                                                                                                    return k(
                                                                                                                                      t_102
                                                                                                                                    );
                                                                                                                                  },
                                                                                                                                  function(
                                                                                                                                    k
                                                                                                                                  ) {
                                                                                                                                    return k(
                                                                                                                                      v
                                                                                                                                    );
                                                                                                                                  }
                                                                                                                                );
                                                                                                                              };
                                                                                                                            }
                                                                                                                          );
                                                                                                                        }
                                                                                                                      );
                                                                                                                    }
                                                                                                                  );
                                                                                                                }
                                                                                                              );
                                                                                                            })(
                                                                                                              function(
                                                                                                                v
                                                                                                              ) {
                                                                                                                return function() {
                                                                                                                  return v0(
                                                                                                                    k,
                                                                                                                    function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        t_103
                                                                                                                      );
                                                                                                                    },
                                                                                                                    function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        t_104
                                                                                                                      );
                                                                                                                    },
                                                                                                                    function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        t_105
                                                                                                                      );
                                                                                                                    },
                                                                                                                    function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        t_106
                                                                                                                      );
                                                                                                                    },
                                                                                                                    function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        t_107
                                                                                                                      );
                                                                                                                    },
                                                                                                                    function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        v
                                                                                                                      );
                                                                                                                    }
                                                                                                                  );
                                                                                                                };
                                                                                                              }
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                  }
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  })(
                                                                                    k
                                                                                  );
                                                                                }
                                                                              );
                                                                            })(
                                                                              function(
                                                                                v
                                                                              ) {
                                                                                view_39 = function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    v
                                                                                  );
                                                                                };
                                                                                return k(
                                                                                  voidf
                                                                                );
                                                                              }
                                                                            );
                                                                          })(
                                                                            function(
                                                                              v
                                                                            ) {
                                                                              return function() {
                                                                                return v0(
                                                                                  k,
                                                                                  function(
                                                                                    k
                                                                                  ) {
                                                                                    return k(
                                                                                      v
                                                                                    );
                                                                                  }
                                                                                );
                                                                              };
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    })(k);
                                                                  }
                                                                );
                                                              })(function(v0) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return (function(
                                                                    k
                                                                  ) {
                                                                    return k(
                                                                      function(
                                                                        k
                                                                      ) {
                                                                        return (function(
                                                                          k
                                                                        ) {
                                                                          return k(
                                                                            0
                                                                          );
                                                                        })(k);
                                                                      }
                                                                    );
                                                                  })(function(
                                                                    v
                                                                  ) {
                                                                    init_40 = function(
                                                                      k
                                                                    ) {
                                                                      return k(
                                                                        v
                                                                      );
                                                                    };
                                                                    return k(
                                                                      voidf
                                                                    );
                                                                  });
                                                                })(function(v) {
                                                                  return function() {
                                                                    return v0(
                                                                      k,
                                                                      function(
                                                                        k
                                                                      ) {
                                                                        return k(
                                                                          v
                                                                        );
                                                                      }
                                                                    );
                                                                  };
                                                                });
                                                              });
                                                            })(k);
                                                          });
                                                        })(function(v0) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                model_46
                                                              ) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return k(
                                                                    function(
                                                                      k,
                                                                      event_47
                                                                    ) {
                                                                      return (function(
                                                                        k
                                                                      ) {
                                                                        return add_16(
                                                                          function(
                                                                            v0
                                                                          ) {
                                                                            return model_46(
                                                                              function(
                                                                                t_108
                                                                              ) {
                                                                                return (function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    1
                                                                                  );
                                                                                })(
                                                                                  function(
                                                                                    v
                                                                                  ) {
                                                                                    return function() {
                                                                                      return v0(
                                                                                        k,
                                                                                        function(
                                                                                          k
                                                                                        ) {
                                                                                          return k(
                                                                                            t_108
                                                                                          );
                                                                                        },
                                                                                        function(
                                                                                          k
                                                                                        ) {
                                                                                          return k(
                                                                                            v
                                                                                          );
                                                                                        }
                                                                                      );
                                                                                    };
                                                                                  }
                                                                                );
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      })(k);
                                                                    }
                                                                  );
                                                                })(k);
                                                              });
                                                            })(function(v) {
                                                              onClick_41 = function(
                                                                k
                                                              ) {
                                                                return k(v);
                                                              };
                                                              return k(voidf);
                                                            });
                                                          })(function(v) {
                                                            return function() {
                                                              return v0(
                                                                k,
                                                                function(k) {
                                                                  return k(v);
                                                                }
                                                              );
                                                            };
                                                          });
                                                        });
                                                      })(k);
                                                    });
                                                  })(function(v0) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          init_48,
                                                          view_49
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                change_50
                                                              ) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return (function(
                                                                    k
                                                                  ) {
                                                                    return k(
                                                                      function(
                                                                        k,
                                                                        t_84
                                                                      ) {
                                                                        return change_50(
                                                                          k
                                                                        );
                                                                      }
                                                                    );
                                                                  })(function(
                                                                    v0
                                                                  ) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return change_50(
                                                                        function(
                                                                          v0
                                                                        ) {
                                                                          return (function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              function(
                                                                                k,
                                                                                model_51
                                                                              ) {
                                                                                return model_51(
                                                                                  k
                                                                                );
                                                                              }
                                                                            );
                                                                          })(
                                                                            function(
                                                                              v
                                                                            ) {
                                                                              return function() {
                                                                                return v0(
                                                                                  k,
                                                                                  function(
                                                                                    k
                                                                                  ) {
                                                                                    return k(
                                                                                      v
                                                                                    );
                                                                                  }
                                                                                );
                                                                              };
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    })(function(
                                                                      v
                                                                    ) {
                                                                      return function() {
                                                                        return v0(
                                                                          k,
                                                                          function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              v
                                                                            );
                                                                          }
                                                                        );
                                                                      };
                                                                    });
                                                                  });
                                                                })(k);
                                                              });
                                                            })(function(v0) {
                                                              return (function(
                                                                k
                                                              ) {
                                                                return _create_app_43(
                                                                  function(v0) {
                                                                    return init_48(
                                                                      function(
                                                                        t_109
                                                                      ) {
                                                                        return view_49(
                                                                          function(
                                                                            v
                                                                          ) {
                                                                            return function() {
                                                                              return v0(
                                                                                k,
                                                                                function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    t_109
                                                                                  );
                                                                                },
                                                                                function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    v
                                                                                  );
                                                                                }
                                                                              );
                                                                            };
                                                                          }
                                                                        );
                                                                      }
                                                                    );
                                                                  }
                                                                );
                                                              })(function(v) {
                                                                return function() {
                                                                  return v0(
                                                                    k,
                                                                    function(
                                                                      k
                                                                    ) {
                                                                      return k(
                                                                        v
                                                                      );
                                                                    }
                                                                  );
                                                                };
                                                              });
                                                            });
                                                          })(k);
                                                        });
                                                      })(function(v) {
                                                        create_app_42 = function(
                                                          k
                                                        ) {
                                                          return k(v);
                                                        };
                                                        return k(voidf);
                                                      });
                                                    })(function(v) {
                                                      return function() {
                                                        return v0(k, function(
                                                          k
                                                        ) {
                                                          return k(v);
                                                        });
                                                      };
                                                    });
                                                  });
                                                })(k);
                                              });
                                            })(function(v0) {
                                              return (function(k) {
                                                return (function(k) {
                                                  return k(function(
                                                    k,
                                                    init_52,
                                                    view_53
                                                  ) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          model_54
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                make_controller_56,
                                                                render_55
                                                              ) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return (function(
                                                                    k
                                                                  ) {
                                                                    return k(
                                                                      function(
                                                                        k,
                                                                        t_82
                                                                      ) {
                                                                        return (function(
                                                                          k
                                                                        ) {
                                                                          return (function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              function(
                                                                                k,
                                                                                t_83
                                                                              ) {
                                                                                return (function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    function(
                                                                                      k,
                                                                                      proc_60
                                                                                    ) {
                                                                                      return (function(
                                                                                        k
                                                                                      ) {
                                                                                        return (function(
                                                                                          k
                                                                                        ) {
                                                                                          return k(
                                                                                            function(
                                                                                              k,
                                                                                              new_61
                                                                                            ) {
                                                                                              return (function(
                                                                                                k
                                                                                              ) {
                                                                                                return (function(
                                                                                                  k
                                                                                                ) {
                                                                                                  return k(
                                                                                                    function(
                                                                                                      k,
                                                                                                      t_81
                                                                                                    ) {
                                                                                                      return (function(
                                                                                                        k
                                                                                                      ) {
                                                                                                        return render_55(
                                                                                                          function(
                                                                                                            v
                                                                                                          ) {
                                                                                                            return function() {
                                                                                                              return v(
                                                                                                                k
                                                                                                              );
                                                                                                            };
                                                                                                          }
                                                                                                        );
                                                                                                      })(
                                                                                                        k
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                })(
                                                                                                  function(
                                                                                                    v0
                                                                                                  ) {
                                                                                                    return (function(
                                                                                                      k
                                                                                                    ) {
                                                                                                      return new_61(
                                                                                                        function(
                                                                                                          v
                                                                                                        ) {
                                                                                                          model_54 = function(
                                                                                                            k
                                                                                                          ) {
                                                                                                            return k(
                                                                                                              v
                                                                                                            );
                                                                                                          };
                                                                                                          return k(
                                                                                                            voidf
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    })(
                                                                                                      function(
                                                                                                        v
                                                                                                      ) {
                                                                                                        return function() {
                                                                                                          return v0(
                                                                                                            k,
                                                                                                            function(
                                                                                                              k
                                                                                                            ) {
                                                                                                              return k(
                                                                                                                v
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                        };
                                                                                                      }
                                                                                                    );
                                                                                                  }
                                                                                                );
                                                                                              })(
                                                                                                k
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        })(
                                                                                          function(
                                                                                            v0
                                                                                          ) {
                                                                                            return (function(
                                                                                              k
                                                                                            ) {
                                                                                              return proc_60(
                                                                                                function(
                                                                                                  v0
                                                                                                ) {
                                                                                                  return model_54(
                                                                                                    function(
                                                                                                      v
                                                                                                    ) {
                                                                                                      return function() {
                                                                                                        return v0(
                                                                                                          k,
                                                                                                          function(
                                                                                                            k
                                                                                                          ) {
                                                                                                            return k(
                                                                                                              v
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      };
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            })(
                                                                                              function(
                                                                                                v
                                                                                              ) {
                                                                                                return function() {
                                                                                                  return v0(
                                                                                                    k,
                                                                                                    function(
                                                                                                      k
                                                                                                    ) {
                                                                                                      return k(
                                                                                                        v
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                };
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      })(
                                                                                        k
                                                                                      );
                                                                                    }
                                                                                  );
                                                                                })(
                                                                                  k
                                                                                );
                                                                              }
                                                                            );
                                                                          })(
                                                                            function(
                                                                              v0
                                                                            ) {
                                                                              return (function(
                                                                                k
                                                                              ) {
                                                                                return (function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    function(
                                                                                      k
                                                                                    ) {
                                                                                      return (function(
                                                                                        k
                                                                                      ) {
                                                                                        return patch__38(
                                                                                          function(
                                                                                            v0
                                                                                          ) {
                                                                                            return (function(
                                                                                              k
                                                                                            ) {
                                                                                              return view_53(
                                                                                                function(
                                                                                                  v0
                                                                                                ) {
                                                                                                  return model_54(
                                                                                                    function(
                                                                                                      t_110
                                                                                                    ) {
                                                                                                      return make_controller_56(
                                                                                                        function(
                                                                                                          v
                                                                                                        ) {
                                                                                                          return function() {
                                                                                                            return v0(
                                                                                                              k,
                                                                                                              function(
                                                                                                                k
                                                                                                              ) {
                                                                                                                return k(
                                                                                                                  t_110
                                                                                                                );
                                                                                                              },
                                                                                                              function(
                                                                                                                k
                                                                                                              ) {
                                                                                                                return k(
                                                                                                                  v
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          };
                                                                                                        }
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            })(
                                                                                              function(
                                                                                                v
                                                                                              ) {
                                                                                                return function() {
                                                                                                  return v0(
                                                                                                    k,
                                                                                                    function(
                                                                                                      k
                                                                                                    ) {
                                                                                                      return k(
                                                                                                        v
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                };
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      })(
                                                                                        k
                                                                                      );
                                                                                    }
                                                                                  );
                                                                                })(
                                                                                  function(
                                                                                    v
                                                                                  ) {
                                                                                    render_55 = function(
                                                                                      k
                                                                                    ) {
                                                                                      return k(
                                                                                        v
                                                                                      );
                                                                                    };
                                                                                    return k(
                                                                                      voidf
                                                                                    );
                                                                                  }
                                                                                );
                                                                              })(
                                                                                function(
                                                                                  v
                                                                                ) {
                                                                                  return function() {
                                                                                    return v0(
                                                                                      k,
                                                                                      function(
                                                                                        k
                                                                                      ) {
                                                                                        return k(
                                                                                          v
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  };
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        })(k);
                                                                      }
                                                                    );
                                                                  })(function(
                                                                    v0
                                                                  ) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return (function(
                                                                        k
                                                                      ) {
                                                                        return k(
                                                                          function(
                                                                            k,
                                                                            proc_57
                                                                          ) {
                                                                            return (function(
                                                                              k
                                                                            ) {
                                                                              return k(
                                                                                function() {
                                                                                  let t_111 = Array.prototype.slice.call(
                                                                                    arguments
                                                                                  );
                                                                                  t_111 = t_111.map(
                                                                                    wrap
                                                                                  );
                                                                                  prepend(
                                                                                    returnk,
                                                                                    t_111
                                                                                  );
                                                                                  return trampoline(
                                                                                    apply(
                                                                                      (function(
                                                                                        k
                                                                                      ) {
                                                                                        return k(
                                                                                          function(
                                                                                            k,
                                                                                            event_58
                                                                                          ) {
                                                                                            return (function(
                                                                                              k
                                                                                            ) {
                                                                                              return (function(
                                                                                                k
                                                                                              ) {
                                                                                                return k(
                                                                                                  function(
                                                                                                    k,
                                                                                                    new_59
                                                                                                  ) {
                                                                                                    return (function(
                                                                                                      k
                                                                                                    ) {
                                                                                                      return (function(
                                                                                                        k
                                                                                                      ) {
                                                                                                        return k(
                                                                                                          function(
                                                                                                            k,
                                                                                                            t_80
                                                                                                          ) {
                                                                                                            return (function(
                                                                                                              k
                                                                                                            ) {
                                                                                                              return render_55(
                                                                                                                function(
                                                                                                                  v
                                                                                                                ) {
                                                                                                                  return function() {
                                                                                                                    return v(
                                                                                                                      k
                                                                                                                    );
                                                                                                                  };
                                                                                                                }
                                                                                                              );
                                                                                                            })(
                                                                                                              k
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      })(
                                                                                                        function(
                                                                                                          v0
                                                                                                        ) {
                                                                                                          return (function(
                                                                                                            k
                                                                                                          ) {
                                                                                                            return new_59(
                                                                                                              function(
                                                                                                                v
                                                                                                              ) {
                                                                                                                model_54 = function(
                                                                                                                  k
                                                                                                                ) {
                                                                                                                  return k(
                                                                                                                    v
                                                                                                                  );
                                                                                                                };
                                                                                                                return k(
                                                                                                                  voidf
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          })(
                                                                                                            function(
                                                                                                              v
                                                                                                            ) {
                                                                                                              return function() {
                                                                                                                return v0(
                                                                                                                  k,
                                                                                                                  function(
                                                                                                                    k
                                                                                                                  ) {
                                                                                                                    return k(
                                                                                                                      v
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                              };
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    })(
                                                                                                      k
                                                                                                    );
                                                                                                  }
                                                                                                );
                                                                                              })(
                                                                                                function(
                                                                                                  v0
                                                                                                ) {
                                                                                                  return (function(
                                                                                                    k
                                                                                                  ) {
                                                                                                    return (function(
                                                                                                      k
                                                                                                    ) {
                                                                                                      return proc_57(
                                                                                                        function(
                                                                                                          v0
                                                                                                        ) {
                                                                                                          return model_54(
                                                                                                            function(
                                                                                                              v
                                                                                                            ) {
                                                                                                              return function() {
                                                                                                                return v0(
                                                                                                                  k,
                                                                                                                  function(
                                                                                                                    k
                                                                                                                  ) {
                                                                                                                    return k(
                                                                                                                      v
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                              };
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    })(
                                                                                                      function(
                                                                                                        v0
                                                                                                      ) {
                                                                                                        return event_58(
                                                                                                          function(
                                                                                                            v
                                                                                                          ) {
                                                                                                            return function() {
                                                                                                              return v0(
                                                                                                                k,
                                                                                                                function(
                                                                                                                  k
                                                                                                                ) {
                                                                                                                  return k(
                                                                                                                    v
                                                                                                                  );
                                                                                                                }
                                                                                                              );
                                                                                                            };
                                                                                                          }
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                  })(
                                                                                                    function(
                                                                                                      v
                                                                                                    ) {
                                                                                                      return function() {
                                                                                                        return v0(
                                                                                                          k,
                                                                                                          function(
                                                                                                            k
                                                                                                          ) {
                                                                                                            return k(
                                                                                                              v
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      };
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            })(
                                                                                              k
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      })(
                                                                                        returnk
                                                                                      ),
                                                                                      t_111
                                                                                    )
                                                                                  );
                                                                                }
                                                                              );
                                                                            })(
                                                                              k
                                                                            );
                                                                          }
                                                                        );
                                                                      })(
                                                                        function(
                                                                          v
                                                                        ) {
                                                                          make_controller_56 = function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              v
                                                                            );
                                                                          };
                                                                          return k(
                                                                            voidf
                                                                          );
                                                                        }
                                                                      );
                                                                    })(function(
                                                                      v
                                                                    ) {
                                                                      return function() {
                                                                        return v0(
                                                                          k,
                                                                          function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              v
                                                                            );
                                                                          }
                                                                        );
                                                                      };
                                                                    });
                                                                  });
                                                                })(k);
                                                              });
                                                            })(function(v0) {
                                                              return voidf(
                                                                function(
                                                                  t_112
                                                                ) {
                                                                  return voidf(
                                                                    function(
                                                                      v
                                                                    ) {
                                                                      return function() {
                                                                        return v0(
                                                                          k,
                                                                          function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              t_112
                                                                            );
                                                                          },
                                                                          function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              v
                                                                            );
                                                                          }
                                                                        );
                                                                      };
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            });
                                                          })(k);
                                                        });
                                                      })(function(v0) {
                                                        return (function(k) {
                                                          return init_52(
                                                            function(v) {
                                                              return function() {
                                                                return v(k);
                                                              };
                                                            }
                                                          );
                                                        })(function(v) {
                                                          return function() {
                                                            return v0(
                                                              k,
                                                              function(k) {
                                                                return k(v);
                                                              }
                                                            );
                                                          };
                                                        });
                                                      });
                                                    })(k);
                                                  });
                                                })(function(v) {
                                                  _create_app_43 = function(k) {
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
                                        return voidf(function(t_113) {
                                          return voidf(function(t_114) {
                                            return voidf(function(t_115) {
                                              return voidf(function(t_116) {
                                                return voidf(function(v) {
                                                  return function() {
                                                    return v0(
                                                      k,
                                                      function(k) {
                                                        return k(t_113);
                                                      },
                                                      function(k) {
                                                        return k(t_114);
                                                      },
                                                      function(k) {
                                                        return k(t_115);
                                                      },
                                                      function(k) {
                                                        return k(t_116);
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
                                        });
                                      });
                                    })(k);
                                  });
                                })(function(v0) {
                                  return (function(k) {
                                    return k(function() {
                                      let t_117 = Array.prototype.slice.call(
                                        arguments
                                      );
                                      let k = shift(t_117);
                                      return k(apply2(patch, t_117));
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
                            return (function(k) {
                              return pk_18(function(v0) {
                                return (function(k) {
                                  return k("Ruse Scheme is running...");
                                })(function(v) {
                                  return function() {
                                    return v0(k, function(k) {
                                      return k(v);
                                    });
                                  };
                                });
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
                      return (function(k) {
                        return (function(k) {
                          return k(function(
                            k,
                            ignore_37,
                            ignore_36,
                            ignore_35
                          ) {
                            return (function(k) {
                              return (function(k) {
                                return k(function(k, t_77) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function(k, t_78) {
                                        return (function(k) {
                                          return (function(k) {
                                            return k(function(k, t_79) {
                                              return voidf(k);
                                            });
                                          })(function(v0) {
                                            return (function(k) {
                                              return (function(k) {
                                                return (function(k) {
                                                  return k(function() {
                                                    let t_118 = Array.prototype.slice.call(
                                                      arguments
                                                    );
                                                    let k = shift(t_118);
                                                    return k(apply2(pk, t_118));
                                                  });
                                                })(function(v) {
                                                  pk_18 = function(k) {
                                                    return k(v);
                                                  };
                                                  return k(voidf);
                                                });
                                              })(function(v) {
                                                ignore_35 = function(k) {
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
                                      return (function(k) {
                                        return (function(k) {
                                          return (function(k) {
                                            return k(function() {
                                              let t_119 = Array.prototype.slice.call(
                                                arguments
                                              );
                                              let k = shift(t_119);
                                              return k(apply2(times, t_119));
                                            });
                                          })(function(v) {
                                            times_17 = function(k) {
                                              return k(v);
                                            };
                                            return k(voidf);
                                          });
                                        })(function(v) {
                                          ignore_36 = function(k) {
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
                                return (function(k) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function() {
                                        let t_120 = Array.prototype.slice.call(
                                          arguments
                                        );
                                        let k = shift(t_120);
                                        return k(apply2(add, t_120));
                                      });
                                    })(function(v) {
                                      add_16 = function(k) {
                                        return k(v);
                                      };
                                      return k(voidf);
                                    });
                                  })(function(v) {
                                    ignore_37 = function(k) {
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
                          return voidf(function(t_121) {
                            return voidf(function(t_122) {
                              return voidf(function(v) {
                                return function() {
                                  return v0(
                                    k,
                                    function(k) {
                                      return k(t_121);
                                    },
                                    function(k) {
                                      return k(t_122);
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
                return (function(k) {
                  return (function(k) {
                    return k(function(
                      k,
                      ignore_33,
                      ignore_32,
                      ruse_make_record_type_31,
                      ruse_record_constructor_30,
                      ruse_record_predicate_29,
                      ruse_record_accessor_28,
                      ruse_record_modifier_27,
                      _cons__26,
                      ignore_25,
                      ignore_24,
                      ignore_23,
                      ignore_22,
                      ignore_21,
                      ignore_20,
                      ignore_19
                    ) {
                      return (function(k) {
                        return (function(k) {
                          return k(function(k, t_62) {
                            return (function(k) {
                              return (function(k) {
                                return k(function(k, t_63) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function(k, t_64) {
                                        return (function(k) {
                                          return (function(k) {
                                            return k(function(k, t_65) {
                                              return (function(k) {
                                                return (function(k) {
                                                  return k(function(k, t_66) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          t_67
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                t_68
                                                              ) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return (function(
                                                                    k
                                                                  ) {
                                                                    return k(
                                                                      function(
                                                                        k,
                                                                        t_69
                                                                      ) {
                                                                        return (function(
                                                                          k
                                                                        ) {
                                                                          return (function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              function(
                                                                                k,
                                                                                t_70
                                                                              ) {
                                                                                return (function(
                                                                                  k
                                                                                ) {
                                                                                  return (function(
                                                                                    k
                                                                                  ) {
                                                                                    return k(
                                                                                      function(
                                                                                        k,
                                                                                        t_71
                                                                                      ) {
                                                                                        return (function(
                                                                                          k
                                                                                        ) {
                                                                                          return (function(
                                                                                            k
                                                                                          ) {
                                                                                            return k(
                                                                                              function(
                                                                                                k,
                                                                                                t_72
                                                                                              ) {
                                                                                                return (function(
                                                                                                  k
                                                                                                ) {
                                                                                                  return (function(
                                                                                                    k
                                                                                                  ) {
                                                                                                    return k(
                                                                                                      function(
                                                                                                        k,
                                                                                                        t_73
                                                                                                      ) {
                                                                                                        return (function(
                                                                                                          k
                                                                                                        ) {
                                                                                                          return (function(
                                                                                                            k
                                                                                                          ) {
                                                                                                            return k(
                                                                                                              function(
                                                                                                                k,
                                                                                                                t_74
                                                                                                              ) {
                                                                                                                return (function(
                                                                                                                  k
                                                                                                                ) {
                                                                                                                  return (function(
                                                                                                                    k
                                                                                                                  ) {
                                                                                                                    return k(
                                                                                                                      function(
                                                                                                                        k,
                                                                                                                        t_75
                                                                                                                      ) {
                                                                                                                        return (function(
                                                                                                                          k
                                                                                                                        ) {
                                                                                                                          return (function(
                                                                                                                            k
                                                                                                                          ) {
                                                                                                                            return k(
                                                                                                                              function(
                                                                                                                                k,
                                                                                                                                t_76
                                                                                                                              ) {
                                                                                                                                return voidf(
                                                                                                                                  k
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                          })(
                                                                                                                            function(
                                                                                                                              v0
                                                                                                                            ) {
                                                                                                                              return (function(
                                                                                                                                k
                                                                                                                              ) {
                                                                                                                                return (function(
                                                                                                                                  k
                                                                                                                                ) {
                                                                                                                                  return (function(
                                                                                                                                    k
                                                                                                                                  ) {
                                                                                                                                    return k(
                                                                                                                                      function(
                                                                                                                                        k
                                                                                                                                      ) {
                                                                                                                                        args_34 = ruse_arguments_to_list(
                                                                                                                                          arguments
                                                                                                                                        );
                                                                                                                                        return args_34(
                                                                                                                                          k
                                                                                                                                        );
                                                                                                                                      }
                                                                                                                                    );
                                                                                                                                  })(
                                                                                                                                    function(
                                                                                                                                      v
                                                                                                                                    ) {
                                                                                                                                      list_15 = function(
                                                                                                                                        k
                                                                                                                                      ) {
                                                                                                                                        return k(
                                                                                                                                          v
                                                                                                                                        );
                                                                                                                                      };
                                                                                                                                      return k(
                                                                                                                                        voidf
                                                                                                                                      );
                                                                                                                                    }
                                                                                                                                  );
                                                                                                                                })(
                                                                                                                                  function(
                                                                                                                                    v
                                                                                                                                  ) {
                                                                                                                                    ignore_19 = function(
                                                                                                                                      k
                                                                                                                                    ) {
                                                                                                                                      return k(
                                                                                                                                        v
                                                                                                                                      );
                                                                                                                                    };
                                                                                                                                    return k(
                                                                                                                                      voidf
                                                                                                                                    );
                                                                                                                                  }
                                                                                                                                );
                                                                                                                              })(
                                                                                                                                function(
                                                                                                                                  v
                                                                                                                                ) {
                                                                                                                                  return function() {
                                                                                                                                    return v0(
                                                                                                                                      k,
                                                                                                                                      function(
                                                                                                                                        k
                                                                                                                                      ) {
                                                                                                                                        return k(
                                                                                                                                          v
                                                                                                                                        );
                                                                                                                                      }
                                                                                                                                    );
                                                                                                                                  };
                                                                                                                                }
                                                                                                                              );
                                                                                                                            }
                                                                                                                          );
                                                                                                                        })(
                                                                                                                          k
                                                                                                                        );
                                                                                                                      }
                                                                                                                    );
                                                                                                                  })(
                                                                                                                    function(
                                                                                                                      v0
                                                                                                                    ) {
                                                                                                                      return (function(
                                                                                                                        k
                                                                                                                      ) {
                                                                                                                        return (function(
                                                                                                                          k
                                                                                                                        ) {
                                                                                                                          return (function(
                                                                                                                            k
                                                                                                                          ) {
                                                                                                                            return ruse_record_modifier_27(
                                                                                                                              function(
                                                                                                                                v0
                                                                                                                              ) {
                                                                                                                                return _cons__26(
                                                                                                                                  function(
                                                                                                                                    t_124
                                                                                                                                  ) {
                                                                                                                                    return (function(
                                                                                                                                      k
                                                                                                                                    ) {
                                                                                                                                      return k(
                                                                                                                                        ruse_symbol_get_or_create(
                                                                                                                                          "cdr"
                                                                                                                                        )
                                                                                                                                      );
                                                                                                                                    })(
                                                                                                                                      function(
                                                                                                                                        v
                                                                                                                                      ) {
                                                                                                                                        return function() {
                                                                                                                                          return v0(
                                                                                                                                            k,
                                                                                                                                            function(
                                                                                                                                              k
                                                                                                                                            ) {
                                                                                                                                              return k(
                                                                                                                                                t_124
                                                                                                                                              );
                                                                                                                                            },
                                                                                                                                            function(
                                                                                                                                              k
                                                                                                                                            ) {
                                                                                                                                              return k(
                                                                                                                                                v
                                                                                                                                              );
                                                                                                                                            }
                                                                                                                                          );
                                                                                                                                        };
                                                                                                                                      }
                                                                                                                                    );
                                                                                                                                  }
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                          })(
                                                                                                                            function(
                                                                                                                              v
                                                                                                                            ) {
                                                                                                                              set_cdr__14 = function(
                                                                                                                                k
                                                                                                                              ) {
                                                                                                                                return k(
                                                                                                                                  v
                                                                                                                                );
                                                                                                                              };
                                                                                                                              return k(
                                                                                                                                voidf
                                                                                                                              );
                                                                                                                            }
                                                                                                                          );
                                                                                                                        })(
                                                                                                                          function(
                                                                                                                            v
                                                                                                                          ) {
                                                                                                                            ignore_20 = function(
                                                                                                                              k
                                                                                                                            ) {
                                                                                                                              return k(
                                                                                                                                v
                                                                                                                              );
                                                                                                                            };
                                                                                                                            return k(
                                                                                                                              voidf
                                                                                                                            );
                                                                                                                          }
                                                                                                                        );
                                                                                                                      })(
                                                                                                                        function(
                                                                                                                          v
                                                                                                                        ) {
                                                                                                                          return function() {
                                                                                                                            return v0(
                                                                                                                              k,
                                                                                                                              function(
                                                                                                                                k
                                                                                                                              ) {
                                                                                                                                return k(
                                                                                                                                  v
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                          };
                                                                                                                        }
                                                                                                                      );
                                                                                                                    }
                                                                                                                  );
                                                                                                                })(
                                                                                                                  k
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          })(
                                                                                                            function(
                                                                                                              v0
                                                                                                            ) {
                                                                                                              return (function(
                                                                                                                k
                                                                                                              ) {
                                                                                                                return (function(
                                                                                                                  k
                                                                                                                ) {
                                                                                                                  return (function(
                                                                                                                    k
                                                                                                                  ) {
                                                                                                                    return ruse_record_accessor_28(
                                                                                                                      function(
                                                                                                                        v0
                                                                                                                      ) {
                                                                                                                        return _cons__26(
                                                                                                                          function(
                                                                                                                            t_125
                                                                                                                          ) {
                                                                                                                            return (function(
                                                                                                                              k
                                                                                                                            ) {
                                                                                                                              return k(
                                                                                                                                ruse_symbol_get_or_create(
                                                                                                                                  "cdr"
                                                                                                                                )
                                                                                                                              );
                                                                                                                            })(
                                                                                                                              function(
                                                                                                                                v
                                                                                                                              ) {
                                                                                                                                return function() {
                                                                                                                                  return v0(
                                                                                                                                    k,
                                                                                                                                    function(
                                                                                                                                      k
                                                                                                                                    ) {
                                                                                                                                      return k(
                                                                                                                                        t_125
                                                                                                                                      );
                                                                                                                                    },
                                                                                                                                    function(
                                                                                                                                      k
                                                                                                                                    ) {
                                                                                                                                      return k(
                                                                                                                                        v
                                                                                                                                      );
                                                                                                                                    }
                                                                                                                                  );
                                                                                                                                };
                                                                                                                              }
                                                                                                                            );
                                                                                                                          }
                                                                                                                        );
                                                                                                                      }
                                                                                                                    );
                                                                                                                  })(
                                                                                                                    function(
                                                                                                                      v
                                                                                                                    ) {
                                                                                                                      cdr_13 = function(
                                                                                                                        k
                                                                                                                      ) {
                                                                                                                        return k(
                                                                                                                          v
                                                                                                                        );
                                                                                                                      };
                                                                                                                      return k(
                                                                                                                        voidf
                                                                                                                      );
                                                                                                                    }
                                                                                                                  );
                                                                                                                })(
                                                                                                                  function(
                                                                                                                    v
                                                                                                                  ) {
                                                                                                                    ignore_21 = function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        v
                                                                                                                      );
                                                                                                                    };
                                                                                                                    return k(
                                                                                                                      voidf
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                              })(
                                                                                                                function(
                                                                                                                  v
                                                                                                                ) {
                                                                                                                  return function() {
                                                                                                                    return v0(
                                                                                                                      k,
                                                                                                                      function(
                                                                                                                        k
                                                                                                                      ) {
                                                                                                                        return k(
                                                                                                                          v
                                                                                                                        );
                                                                                                                      }
                                                                                                                    );
                                                                                                                  };
                                                                                                                }
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                        })(
                                                                                                          k
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                  })(
                                                                                                    function(
                                                                                                      v0
                                                                                                    ) {
                                                                                                      return (function(
                                                                                                        k
                                                                                                      ) {
                                                                                                        return (function(
                                                                                                          k
                                                                                                        ) {
                                                                                                          return (function(
                                                                                                            k
                                                                                                          ) {
                                                                                                            return ruse_record_modifier_27(
                                                                                                              function(
                                                                                                                v0
                                                                                                              ) {
                                                                                                                return _cons__26(
                                                                                                                  function(
                                                                                                                    t_126
                                                                                                                  ) {
                                                                                                                    return (function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        ruse_symbol_get_or_create(
                                                                                                                          "car"
                                                                                                                        )
                                                                                                                      );
                                                                                                                    })(
                                                                                                                      function(
                                                                                                                        v
                                                                                                                      ) {
                                                                                                                        return function() {
                                                                                                                          return v0(
                                                                                                                            k,
                                                                                                                            function(
                                                                                                                              k
                                                                                                                            ) {
                                                                                                                              return k(
                                                                                                                                t_126
                                                                                                                              );
                                                                                                                            },
                                                                                                                            function(
                                                                                                                              k
                                                                                                                            ) {
                                                                                                                              return k(
                                                                                                                                v
                                                                                                                              );
                                                                                                                            }
                                                                                                                          );
                                                                                                                        };
                                                                                                                      }
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          })(
                                                                                                            function(
                                                                                                              v
                                                                                                            ) {
                                                                                                              set_car__12 = function(
                                                                                                                k
                                                                                                              ) {
                                                                                                                return k(
                                                                                                                  v
                                                                                                                );
                                                                                                              };
                                                                                                              return k(
                                                                                                                voidf
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                        })(
                                                                                                          function(
                                                                                                            v
                                                                                                          ) {
                                                                                                            ignore_22 = function(
                                                                                                              k
                                                                                                            ) {
                                                                                                              return k(
                                                                                                                v
                                                                                                              );
                                                                                                            };
                                                                                                            return k(
                                                                                                              voidf
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      })(
                                                                                                        function(
                                                                                                          v
                                                                                                        ) {
                                                                                                          return function() {
                                                                                                            return v0(
                                                                                                              k,
                                                                                                              function(
                                                                                                                k
                                                                                                              ) {
                                                                                                                return k(
                                                                                                                  v
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          };
                                                                                                        }
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                })(
                                                                                                  k
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          })(
                                                                                            function(
                                                                                              v0
                                                                                            ) {
                                                                                              return (function(
                                                                                                k
                                                                                              ) {
                                                                                                return (function(
                                                                                                  k
                                                                                                ) {
                                                                                                  return (function(
                                                                                                    k
                                                                                                  ) {
                                                                                                    return ruse_record_accessor_28(
                                                                                                      function(
                                                                                                        v0
                                                                                                      ) {
                                                                                                        return _cons__26(
                                                                                                          function(
                                                                                                            t_127
                                                                                                          ) {
                                                                                                            return (function(
                                                                                                              k
                                                                                                            ) {
                                                                                                              return k(
                                                                                                                ruse_symbol_get_or_create(
                                                                                                                  "car"
                                                                                                                )
                                                                                                              );
                                                                                                            })(
                                                                                                              function(
                                                                                                                v
                                                                                                              ) {
                                                                                                                return function() {
                                                                                                                  return v0(
                                                                                                                    k,
                                                                                                                    function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        t_127
                                                                                                                      );
                                                                                                                    },
                                                                                                                    function(
                                                                                                                      k
                                                                                                                    ) {
                                                                                                                      return k(
                                                                                                                        v
                                                                                                                      );
                                                                                                                    }
                                                                                                                  );
                                                                                                                };
                                                                                                              }
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                  })(
                                                                                                    function(
                                                                                                      v
                                                                                                    ) {
                                                                                                      car_11 = function(
                                                                                                        k
                                                                                                      ) {
                                                                                                        return k(
                                                                                                          v
                                                                                                        );
                                                                                                      };
                                                                                                      return k(
                                                                                                        voidf
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                })(
                                                                                                  function(
                                                                                                    v
                                                                                                  ) {
                                                                                                    ignore_23 = function(
                                                                                                      k
                                                                                                    ) {
                                                                                                      return k(
                                                                                                        v
                                                                                                      );
                                                                                                    };
                                                                                                    return k(
                                                                                                      voidf
                                                                                                    );
                                                                                                  }
                                                                                                );
                                                                                              })(
                                                                                                function(
                                                                                                  v
                                                                                                ) {
                                                                                                  return function() {
                                                                                                    return v0(
                                                                                                      k,
                                                                                                      function(
                                                                                                        k
                                                                                                      ) {
                                                                                                        return k(
                                                                                                          v
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                  };
                                                                                                }
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        })(
                                                                                          k
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  })(
                                                                                    function(
                                                                                      v0
                                                                                    ) {
                                                                                      return (function(
                                                                                        k
                                                                                      ) {
                                                                                        return (function(
                                                                                          k
                                                                                        ) {
                                                                                          return (function(
                                                                                            k
                                                                                          ) {
                                                                                            return ruse_record_predicate_29(
                                                                                              function(
                                                                                                v0
                                                                                              ) {
                                                                                                return _cons__26(
                                                                                                  function(
                                                                                                    v
                                                                                                  ) {
                                                                                                    return function() {
                                                                                                      return v0(
                                                                                                        k,
                                                                                                        function(
                                                                                                          k
                                                                                                        ) {
                                                                                                          return k(
                                                                                                            v
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    };
                                                                                                  }
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          })(
                                                                                            function(
                                                                                              v
                                                                                            ) {
                                                                                              pair__10 = function(
                                                                                                k
                                                                                              ) {
                                                                                                return k(
                                                                                                  v
                                                                                                );
                                                                                              };
                                                                                              return k(
                                                                                                voidf
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        })(
                                                                                          function(
                                                                                            v
                                                                                          ) {
                                                                                            ignore_24 = function(
                                                                                              k
                                                                                            ) {
                                                                                              return k(
                                                                                                v
                                                                                              );
                                                                                            };
                                                                                            return k(
                                                                                              voidf
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      })(
                                                                                        function(
                                                                                          v
                                                                                        ) {
                                                                                          return function() {
                                                                                            return v0(
                                                                                              k,
                                                                                              function(
                                                                                                k
                                                                                              ) {
                                                                                                return k(
                                                                                                  v
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          };
                                                                                        }
                                                                                      );
                                                                                    }
                                                                                  );
                                                                                })(
                                                                                  k
                                                                                );
                                                                              }
                                                                            );
                                                                          })(
                                                                            function(
                                                                              v0
                                                                            ) {
                                                                              return (function(
                                                                                k
                                                                              ) {
                                                                                return (function(
                                                                                  k
                                                                                ) {
                                                                                  return (function(
                                                                                    k
                                                                                  ) {
                                                                                    return ruse_record_constructor_30(
                                                                                      function(
                                                                                        v0
                                                                                      ) {
                                                                                        return _cons__26(
                                                                                          function(
                                                                                            v
                                                                                          ) {
                                                                                            return function() {
                                                                                              return v0(
                                                                                                k,
                                                                                                function(
                                                                                                  k
                                                                                                ) {
                                                                                                  return k(
                                                                                                    v
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            };
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  })(
                                                                                    function(
                                                                                      v
                                                                                    ) {
                                                                                      cons_9 = function(
                                                                                        k
                                                                                      ) {
                                                                                        return k(
                                                                                          v
                                                                                        );
                                                                                      };
                                                                                      return k(
                                                                                        voidf
                                                                                      );
                                                                                    }
                                                                                  );
                                                                                })(
                                                                                  function(
                                                                                    v
                                                                                  ) {
                                                                                    ignore_25 = function(
                                                                                      k
                                                                                    ) {
                                                                                      return k(
                                                                                        v
                                                                                      );
                                                                                    };
                                                                                    return k(
                                                                                      voidf
                                                                                    );
                                                                                  }
                                                                                );
                                                                              })(
                                                                                function(
                                                                                  v
                                                                                ) {
                                                                                  return function() {
                                                                                    return v0(
                                                                                      k,
                                                                                      function(
                                                                                        k
                                                                                      ) {
                                                                                        return k(
                                                                                          v
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  };
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        })(k);
                                                                      }
                                                                    );
                                                                  })(function(
                                                                    v0
                                                                  ) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return (function(
                                                                        k
                                                                      ) {
                                                                        return ruse_make_record_type_31(
                                                                          function(
                                                                            v0
                                                                          ) {
                                                                            return (function(
                                                                              k
                                                                            ) {
                                                                              return k(
                                                                                ruse_symbol_get_or_create(
                                                                                  "<cons>"
                                                                                )
                                                                              );
                                                                            })(
                                                                              function(
                                                                                t_128
                                                                              ) {
                                                                                return (function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    ruse_symbol_get_or_create(
                                                                                      "car"
                                                                                    )
                                                                                  );
                                                                                })(
                                                                                  function(
                                                                                    t_129
                                                                                  ) {
                                                                                    return (function(
                                                                                      k
                                                                                    ) {
                                                                                      return k(
                                                                                        ruse_symbol_get_or_create(
                                                                                          "cdr"
                                                                                        )
                                                                                      );
                                                                                    })(
                                                                                      function(
                                                                                        v
                                                                                      ) {
                                                                                        return function() {
                                                                                          return v0(
                                                                                            k,
                                                                                            function(
                                                                                              k
                                                                                            ) {
                                                                                              return k(
                                                                                                t_128
                                                                                              );
                                                                                            },
                                                                                            function(
                                                                                              k
                                                                                            ) {
                                                                                              return k(
                                                                                                t_129
                                                                                              );
                                                                                            },
                                                                                            function(
                                                                                              k
                                                                                            ) {
                                                                                              return k(
                                                                                                v
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        };
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      })(
                                                                        function(
                                                                          v
                                                                        ) {
                                                                          _cons__26 = function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              v
                                                                            );
                                                                          };
                                                                          return k(
                                                                            voidf
                                                                          );
                                                                        }
                                                                      );
                                                                    })(function(
                                                                      v
                                                                    ) {
                                                                      return function() {
                                                                        return v0(
                                                                          k,
                                                                          function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              v
                                                                            );
                                                                          }
                                                                        );
                                                                      };
                                                                    });
                                                                  });
                                                                })(k);
                                                              });
                                                            })(function(v0) {
                                                              return (function(
                                                                k
                                                              ) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return k(
                                                                    function() {
                                                                      let t_130 = Array.prototype.slice.call(
                                                                        arguments
                                                                      );
                                                                      let k = shift(
                                                                        t_130
                                                                      );
                                                                      return k(
                                                                        apply2(
                                                                          ruse_record_modifier,
                                                                          t_130
                                                                        )
                                                                      );
                                                                    }
                                                                  );
                                                                })(function(v) {
                                                                  ruse_record_modifier_27 = function(
                                                                    k
                                                                  ) {
                                                                    return k(v);
                                                                  };
                                                                  return k(
                                                                    voidf
                                                                  );
                                                                });
                                                              })(function(v) {
                                                                return function() {
                                                                  return v0(
                                                                    k,
                                                                    function(
                                                                      k
                                                                    ) {
                                                                      return k(
                                                                        v
                                                                      );
                                                                    }
                                                                  );
                                                                };
                                                              });
                                                            });
                                                          })(k);
                                                        });
                                                      })(function(v0) {
                                                        return (function(k) {
                                                          return (function(k) {
                                                            return k(
                                                              function() {
                                                                let t_131 = Array.prototype.slice.call(
                                                                  arguments
                                                                );
                                                                let k = shift(
                                                                  t_131
                                                                );
                                                                return k(
                                                                  apply2(
                                                                    ruse_record_accessor,
                                                                    t_131
                                                                  )
                                                                );
                                                              }
                                                            );
                                                          })(function(v) {
                                                            ruse_record_accessor_28 = function(
                                                              k
                                                            ) {
                                                              return k(v);
                                                            };
                                                            return k(voidf);
                                                          });
                                                        })(function(v) {
                                                          return function() {
                                                            return v0(
                                                              k,
                                                              function(k) {
                                                                return k(v);
                                                              }
                                                            );
                                                          };
                                                        });
                                                      });
                                                    })(k);
                                                  });
                                                })(function(v0) {
                                                  return (function(k) {
                                                    return (function(k) {
                                                      return k(function() {
                                                        let t_132 = Array.prototype.slice.call(
                                                          arguments
                                                        );
                                                        let k = shift(t_132);
                                                        return k(
                                                          apply2(
                                                            ruse_record_predicate,
                                                            t_132
                                                          )
                                                        );
                                                      });
                                                    })(function(v) {
                                                      ruse_record_predicate_29 = function(
                                                        k
                                                      ) {
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
                                            return (function(k) {
                                              return (function(k) {
                                                return k(function() {
                                                  let t_133 = Array.prototype.slice.call(
                                                    arguments
                                                  );
                                                  let k = shift(t_133);
                                                  return k(
                                                    apply2(
                                                      ruse_record_constructor,
                                                      t_133
                                                    )
                                                  );
                                                });
                                              })(function(v) {
                                                ruse_record_constructor_30 = function(
                                                  k
                                                ) {
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
                                      return (function(k) {
                                        return (function(k) {
                                          return k(function() {
                                            let t_134 = Array.prototype.slice.call(
                                              arguments
                                            );
                                            let k = shift(t_134);
                                            return k(
                                              apply2(
                                                ruse_make_record_type,
                                                t_134
                                              )
                                            );
                                          });
                                        })(function(v) {
                                          ruse_make_record_type_31 = function(
                                            k
                                          ) {
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
                                return (function(k) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function() {
                                        let t_135 = Array.prototype.slice.call(
                                          arguments
                                        );
                                        let k = shift(t_135);
                                        return k(apply2(nullp, t_135));
                                      });
                                    })(function(v) {
                                      null__8 = function(k) {
                                        return k(v);
                                      };
                                      return k(voidf);
                                    });
                                  })(function(v) {
                                    ignore_32 = function(k) {
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
                          return (function(k) {
                            return (function(k) {
                              return (function(k) {
                                return k(function() {
                                  let t_136 = Array.prototype.slice.call(
                                    arguments
                                  );
                                  let k = shift(t_136);
                                  return k(apply2(assume, t_136));
                                });
                              })(function(v) {
                                assume_7 = function(k) {
                                  return k(v);
                                };
                                return k(voidf);
                              });
                            })(function(v) {
                              ignore_33 = function(k) {
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
                    return voidf(function(t_137) {
                      return voidf(function(t_138) {
                        return voidf(function(t_139) {
                          return voidf(function(t_140) {
                            return voidf(function(t_141) {
                              return voidf(function(t_142) {
                                return voidf(function(t_143) {
                                  return voidf(function(t_144) {
                                    return voidf(function(t_145) {
                                      return voidf(function(t_146) {
                                        return voidf(function(t_147) {
                                          return voidf(function(t_148) {
                                            return voidf(function(t_149) {
                                              return voidf(function(t_150) {
                                                return voidf(function(v) {
                                                  return function() {
                                                    return v0(
                                                      k,
                                                      function(k) {
                                                        return k(t_137);
                                                      },
                                                      function(k) {
                                                        return k(t_138);
                                                      },
                                                      function(k) {
                                                        return k(t_139);
                                                      },
                                                      function(k) {
                                                        return k(t_140);
                                                      },
                                                      function(k) {
                                                        return k(t_141);
                                                      },
                                                      function(k) {
                                                        return k(t_142);
                                                      },
                                                      function(k) {
                                                        return k(t_143);
                                                      },
                                                      function(k) {
                                                        return k(t_144);
                                                      },
                                                      function(k) {
                                                        return k(t_145);
                                                      },
                                                      function(k) {
                                                        return k(t_146);
                                                      },
                                                      function(k) {
                                                        return k(t_147);
                                                      },
                                                      function(k) {
                                                        return k(t_148);
                                                      },
                                                      function(k) {
                                                        return k(t_149);
                                                      },
                                                      function(k) {
                                                        return k(t_150);
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
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
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
          return voidf(function(t_151) {
            return voidf(function(t_152) {
              return voidf(function(t_153) {
                return voidf(function(t_154) {
                  return voidf(function(t_155) {
                    return voidf(function(t_156) {
                      return voidf(function(t_157) {
                        return voidf(function(t_158) {
                          return voidf(function(t_159) {
                            return voidf(function(t_160) {
                              return voidf(function(t_161) {
                                return voidf(function(v) {
                                  return function() {
                                    return v0(
                                      k,
                                      function(k) {
                                        return k(t_151);
                                      },
                                      function(k) {
                                        return k(t_152);
                                      },
                                      function(k) {
                                        return k(t_153);
                                      },
                                      function(k) {
                                        return k(t_154);
                                      },
                                      function(k) {
                                        return k(t_155);
                                      },
                                      function(k) {
                                        return k(t_156);
                                      },
                                      function(k) {
                                        return k(t_157);
                                      },
                                      function(k) {
                                        return k(t_158);
                                      },
                                      function(k) {
                                        return k(t_159);
                                      },
                                      function(k) {
                                        return k(t_160);
                                      },
                                      function(k) {
                                        return k(t_161);
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
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      })(k);
    });
  })(function(v0) {
    return (function(k) {
      return k(function() {
        let t_162 = Array.prototype.slice.call(arguments);
        let k = shift(t_162);
        return k(apply2(ruse_cons_star, t_162));
      });
    })(function(t_165) {
      return (function(k) {
        return k(function() {
          let t_163 = Array.prototype.slice.call(arguments);
          let k = shift(t_163);
          return k(apply2(ruse_cons, t_163));
        });
      })(function(t_166) {
        return (function(k) {
          return k(function(k) {
            args_6 = ruse_arguments_to_list(arguments);
            return args_6(k);
          });
        })(function(v) {
          return function() {
            return v0(
              k,
              function(k) {
                return k(t_165);
              },
              function(k) {
                return k(t_166);
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
};
function output(x) {
  pk("output", x);
  return function() {};
}

trampoline(function() {
  return program(output);
});
