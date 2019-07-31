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

/* define-record-type helpers */

function ruse_make_record_type(name) {
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
    return k(function(
      k,
      pk_12,
      times_11,
      add_10,
      set_cdr__9,
      cdr_8,
      set_car__7,
      car_6,
      pair__5,
      cons_4,
      assume_3
    ) {
      return (function(k) {
        return (function(k) {
          return k(function(k, t_79) {
            return (function(k) {
              return (function(k) {
                return k(function(k, t_80) {
                  return (function(k) {
                    return (function(k) {
                      return k(function(k, t_81) {
                        return (function(k) {
                          return (function(k) {
                            return k(function(k, patch__29) {
                              return (function(k) {
                                return (function(k) {
                                  return k(function(
                                    k,
                                    _create_app_34,
                                    create_app_33,
                                    onClick_32,
                                    init_31,
                                    view_30
                                  ) {
                                    return (function(k) {
                                      return (function(k) {
                                        return k(function(k, t_74) {
                                          return (function(k) {
                                            return (function(k) {
                                              return k(function(k, t_75) {
                                                return (function(k) {
                                                  return (function(k) {
                                                    return k(function(k, t_76) {
                                                      return (function(k) {
                                                        return (function(k) {
                                                          return k(function(
                                                            k,
                                                            t_77
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
                                                                    t_78
                                                                  ) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return create_app_33(
                                                                        function(
                                                                          v0
                                                                        ) {
                                                                          return init_31(
                                                                            function(
                                                                              t_82
                                                                            ) {
                                                                              return view_30(
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
                                                                                          t_82
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
                                                              })(function(v0) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return (function(
                                                                    k
                                                                  ) {
                                                                    return k(
                                                                      function(
                                                                        k,
                                                                        model_35,
                                                                        mc_36
                                                                      ) {
                                                                        return (function(
                                                                          k
                                                                        ) {
                                                                          return cons_4(
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
                                                                                  t_97
                                                                                ) {
                                                                                  return (function(
                                                                                    k
                                                                                  ) {
                                                                                    return cons_4(
                                                                                      function(
                                                                                        v0
                                                                                      ) {
                                                                                        return (function(
                                                                                          k
                                                                                        ) {
                                                                                          return cons_4(
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
                                                                                                  t_85
                                                                                                ) {
                                                                                                  return (function(
                                                                                                    k
                                                                                                  ) {
                                                                                                    return cons_4(
                                                                                                      function(
                                                                                                        v0
                                                                                                      ) {
                                                                                                        return (function(
                                                                                                          k
                                                                                                        ) {
                                                                                                          return cons_4(
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
                                                                                                                  t_83
                                                                                                                ) {
                                                                                                                  return (function(
                                                                                                                    k
                                                                                                                  ) {
                                                                                                                    return k(
                                                                                                                      "box"
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
                                                                                                                              t_83
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
                                                                                                            t_84
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
                                                                                                                        t_84
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
                                                                                                              t_85
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
                                                                                            return (function(
                                                                                              k
                                                                                            ) {
                                                                                              return cons_4(
                                                                                                function(
                                                                                                  v0
                                                                                                ) {
                                                                                                  return (function(
                                                                                                    k
                                                                                                  ) {
                                                                                                    return k(
                                                                                                      "count === "
                                                                                                    );
                                                                                                  })(
                                                                                                    function(
                                                                                                      t_95
                                                                                                    ) {
                                                                                                      return (function(
                                                                                                        k
                                                                                                      ) {
                                                                                                        return cons_4(
                                                                                                          function(
                                                                                                            v0
                                                                                                          ) {
                                                                                                            return model_35(
                                                                                                              function(
                                                                                                                t_94
                                                                                                              ) {
                                                                                                                return (function(
                                                                                                                  k
                                                                                                                ) {
                                                                                                                  return cons_4(
                                                                                                                    function(
                                                                                                                      v0
                                                                                                                    ) {
                                                                                                                      return (function(
                                                                                                                        k
                                                                                                                      ) {
                                                                                                                        return k(
                                                                                                                          " "
                                                                                                                        );
                                                                                                                      })(
                                                                                                                        function(
                                                                                                                          t_93
                                                                                                                        ) {
                                                                                                                          return (function(
                                                                                                                            k
                                                                                                                          ) {
                                                                                                                            return cons_4(
                                                                                                                              function(
                                                                                                                                v0
                                                                                                                              ) {
                                                                                                                                return (function(
                                                                                                                                  k
                                                                                                                                ) {
                                                                                                                                  return cons_4(
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
                                                                                                                                          t_91
                                                                                                                                        ) {
                                                                                                                                          return (function(
                                                                                                                                            k
                                                                                                                                          ) {
                                                                                                                                            return cons_4(
                                                                                                                                              function(
                                                                                                                                                v0
                                                                                                                                              ) {
                                                                                                                                                return (function(
                                                                                                                                                  k
                                                                                                                                                ) {
                                                                                                                                                  return cons_4(
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
                                                                                                                                                          t_88
                                                                                                                                                        ) {
                                                                                                                                                          return (function(
                                                                                                                                                            k
                                                                                                                                                          ) {
                                                                                                                                                            return cons_4(
                                                                                                                                                              function(
                                                                                                                                                                v0
                                                                                                                                                              ) {
                                                                                                                                                                return (function(
                                                                                                                                                                  k
                                                                                                                                                                ) {
                                                                                                                                                                  return cons_4(
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
                                                                                                                                                                          t_86
                                                                                                                                                                        ) {
                                                                                                                                                                          return (function(
                                                                                                                                                                            k
                                                                                                                                                                          ) {
                                                                                                                                                                            return mc_36(
                                                                                                                                                                              function(
                                                                                                                                                                                v0
                                                                                                                                                                              ) {
                                                                                                                                                                                return onClick_32(
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
                                                                                                                                                                                      t_86
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
                                                                                                                                                                    t_87
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
                                                                                                                                                                                t_87
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
                                                                                                                                                                      t_88
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
                                                                                                                                                    t_90
                                                                                                                                                  ) {
                                                                                                                                                    return (function(
                                                                                                                                                      k
                                                                                                                                                    ) {
                                                                                                                                                      return cons_4(
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
                                                                                                                                                              t_89
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
                                                                                                                                                                          t_89
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
                                                                                                                                                                t_90
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
                                                                                                                                                      t_91
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
                                                                                                                                    t_92
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
                                                                                                                                                t_92
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
                                                                        })(k);
                                                                      }
                                                                    );
                                                                  })(function(
                                                                    v
                                                                  ) {
                                                                    view_30 = function(
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
                                                                k
                                                              ) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return k(0);
                                                                })(k);
                                                              });
                                                            })(function(v) {
                                                              init_31 = function(
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
                                                          model_37
                                                        ) {
                                                          return (function(k) {
                                                            return k(function(
                                                              k,
                                                              event_38
                                                            ) {
                                                              return (function(
                                                                k
                                                              ) {
                                                                return add_10(
                                                                  function(v0) {
                                                                    return model_37(
                                                                      function(
                                                                        t_98
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
                                                              })(k);
                                                            });
                                                          })(k);
                                                        });
                                                      })(function(v) {
                                                        onClick_32 = function(
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
                                                    init_39,
                                                    view_40
                                                  ) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          change_41
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                t_73
                                                              ) {
                                                                return change_41(
                                                                  k
                                                                );
                                                              });
                                                            })(function(v0) {
                                                              return (function(
                                                                k
                                                              ) {
                                                                return change_41(
                                                                  function(v0) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return k(
                                                                        function(
                                                                          k,
                                                                          model_42
                                                                        ) {
                                                                          return model_42(
                                                                            k
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
                                                      })(function(v0) {
                                                        return (function(k) {
                                                          return _create_app_34(
                                                            function(v0) {
                                                              return init_39(
                                                                function(t_99) {
                                                                  return view_40(
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
                                                  create_app_33 = function(k) {
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
                                            return k(function(
                                              k,
                                              init_43,
                                              view_44
                                            ) {
                                              return (function(k) {
                                                return (function(k) {
                                                  return k(function(
                                                    k,
                                                    model_45
                                                  ) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          make_controller_47,
                                                          render_46
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
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
                                                                          return k(
                                                                            function(
                                                                              k,
                                                                              proc_51
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
                                                                                      new_52
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
                                                                                                return render_46(
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
                                                                                              return new_52(
                                                                                                function(
                                                                                                  v
                                                                                                ) {
                                                                                                  model_45 = function(
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
                                                                                      return proc_51(
                                                                                        function(
                                                                                          v0
                                                                                        ) {
                                                                                          return model_45(
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
                                                                            k
                                                                          ) {
                                                                            return (function(
                                                                              k
                                                                            ) {
                                                                              return patch__29(
                                                                                function(
                                                                                  v0
                                                                                ) {
                                                                                  return (function(
                                                                                    k
                                                                                  ) {
                                                                                    return view_44(
                                                                                      function(
                                                                                        v0
                                                                                      ) {
                                                                                        return model_45(
                                                                                          function(
                                                                                            t_100
                                                                                          ) {
                                                                                            return make_controller_47(
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
                                                                          render_46 = function(
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
                                                                    function(
                                                                      k,
                                                                      proc_48
                                                                    ) {
                                                                      return (function(
                                                                        k
                                                                      ) {
                                                                        return k(
                                                                          function() {
                                                                            let t_101 = Array.prototype.slice.call(
                                                                              arguments
                                                                            );
                                                                            t_101 = t_101.map(
                                                                              wrap
                                                                            );
                                                                            prepend(
                                                                              returnk,
                                                                              t_101
                                                                            );
                                                                            return trampoline(
                                                                              apply(
                                                                                (function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    function(
                                                                                      k,
                                                                                      event_49
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
                                                                                              new_50
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
                                                                                                        return render_46(
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
                                                                                                      return new_50(
                                                                                                        function(
                                                                                                          v
                                                                                                        ) {
                                                                                                          model_45 = function(
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
                                                                                                return proc_48(
                                                                                                  function(
                                                                                                    v0
                                                                                                  ) {
                                                                                                    return model_45(
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
                                                                                                  return event_49(
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
                                                                                t_101
                                                                              )
                                                                            );
                                                                          }
                                                                        );
                                                                      })(k);
                                                                    }
                                                                  );
                                                                })(function(v) {
                                                                  make_controller_47 = function(
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
                                                        return voidf(function(
                                                          t_102
                                                        ) {
                                                          return voidf(function(
                                                            v
                                                          ) {
                                                            return function() {
                                                              return v0(
                                                                k,
                                                                function(k) {
                                                                  return k(
                                                                    t_102
                                                                  );
                                                                },
                                                                function(k) {
                                                                  return k(v);
                                                                }
                                                              );
                                                            };
                                                          });
                                                        });
                                                      });
                                                    })(k);
                                                  });
                                                })(function(v0) {
                                                  return (function(k) {
                                                    return init_43(function(v) {
                                                      return function() {
                                                        return v(k);
                                                      };
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
                                          })(function(v) {
                                            _create_app_34 = function(k) {
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
                                  return voidf(function(t_103) {
                                    return voidf(function(t_104) {
                                      return voidf(function(t_105) {
                                        return voidf(function(t_106) {
                                          return voidf(function(v) {
                                            return function() {
                                              return v0(
                                                k,
                                                function(k) {
                                                  return k(t_103);
                                                },
                                                function(k) {
                                                  return k(t_104);
                                                },
                                                function(k) {
                                                  return k(t_105);
                                                },
                                                function(k) {
                                                  return k(t_106);
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
                                let t_107 = Array.prototype.slice.call(
                                  arguments
                                );
                                let k = shift(t_107);
                                return k(apply2(patch, t_107));
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
                        return pk_12(function(v0) {
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
                    return k(function(k, ignore_28, ignore_27, ignore_26) {
                      return (function(k) {
                        return (function(k) {
                          return k(function(k, t_66) {
                            return (function(k) {
                              return (function(k) {
                                return k(function(k, t_67) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function(k, t_68) {
                                        return voidf(k);
                                      });
                                    })(function(v0) {
                                      return (function(k) {
                                        return (function(k) {
                                          return (function(k) {
                                            return k(function() {
                                              let t_108 = Array.prototype.slice.call(
                                                arguments
                                              );
                                              let k = shift(t_108);
                                              return k(apply2(pk, t_108));
                                            });
                                          })(function(v) {
                                            pk_12 = function(k) {
                                              return k(v);
                                            };
                                            return k(voidf);
                                          });
                                        })(function(v) {
                                          ignore_26 = function(k) {
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
                                        let t_109 = Array.prototype.slice.call(
                                          arguments
                                        );
                                        let k = shift(t_109);
                                        return k(apply2(times, t_109));
                                      });
                                    })(function(v) {
                                      times_11 = function(k) {
                                        return k(v);
                                      };
                                      return k(voidf);
                                    });
                                  })(function(v) {
                                    ignore_27 = function(k) {
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
                                  let t_110 = Array.prototype.slice.call(
                                    arguments
                                  );
                                  let k = shift(t_110);
                                  return k(apply2(add, t_110));
                                });
                              })(function(v) {
                                add_10 = function(k) {
                                  return k(v);
                                };
                                return k(voidf);
                              });
                            })(function(v) {
                              ignore_28 = function(k) {
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
                    return voidf(function(t_111) {
                      return voidf(function(t_112) {
                        return voidf(function(v) {
                          return function() {
                            return v0(
                              k,
                              function(k) {
                                return k(t_111);
                              },
                              function(k) {
                                return k(t_112);
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
                ignore_25,
                ruse_make_record_type_24,
                ruse_record_constructor_23,
                ruse_record_predicate_22,
                ruse_record_accessor_21,
                ruse_record_modifier_20,
                _cons__19,
                ignore_18,
                ignore_17,
                ignore_16,
                ignore_15,
                ignore_14,
                ignore_13
              ) {
                return (function(k) {
                  return (function(k) {
                    return k(function(k, t_53) {
                      return (function(k) {
                        return (function(k) {
                          return k(function(k, t_54) {
                            return (function(k) {
                              return (function(k) {
                                return k(function(k, t_55) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function(k, t_56) {
                                        return (function(k) {
                                          return (function(k) {
                                            return k(function(k, t_57) {
                                              return (function(k) {
                                                return (function(k) {
                                                  return k(function(k, t_58) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          t_59
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                t_60
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
                                                                        t_61
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
                                                                                t_62
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
                                                                                        t_63
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
                                                                                                t_64
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
                                                                                                        t_65
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
                                                                                                            return ruse_record_modifier_20(
                                                                                                              function(
                                                                                                                v0
                                                                                                              ) {
                                                                                                                return _cons__19(
                                                                                                                  function(
                                                                                                                    t_113
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
                                                                                                                                t_113
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
                                                                                                              set_cdr__9 = function(
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
                                                                                                            ignore_13 = function(
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
                                                                                                    return ruse_record_accessor_21(
                                                                                                      function(
                                                                                                        v0
                                                                                                      ) {
                                                                                                        return _cons__19(
                                                                                                          function(
                                                                                                            t_114
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
                                                                                                                        t_114
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
                                                                                                      cdr_8 = function(
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
                                                                                                    ignore_14 = function(
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
                                                                                            return ruse_record_modifier_20(
                                                                                              function(
                                                                                                v0
                                                                                              ) {
                                                                                                return _cons__19(
                                                                                                  function(
                                                                                                    t_115
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
                                                                                                                t_115
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
                                                                                              set_car__7 = function(
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
                                                                                            ignore_15 = function(
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
                                                                                    return ruse_record_accessor_21(
                                                                                      function(
                                                                                        v0
                                                                                      ) {
                                                                                        return _cons__19(
                                                                                          function(
                                                                                            t_116
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
                                                                                                        t_116
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
                                                                                      car_6 = function(
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
                                                                                    ignore_16 = function(
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
                                                                        return (function(
                                                                          k
                                                                        ) {
                                                                          return ruse_record_predicate_22(
                                                                            function(
                                                                              v0
                                                                            ) {
                                                                              return _cons__19(
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
                                                                            pair__5 = function(
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
                                                                          ignore_17 = function(
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
                                                                  return (function(
                                                                    k
                                                                  ) {
                                                                    return ruse_record_constructor_23(
                                                                      function(
                                                                        v0
                                                                      ) {
                                                                        return _cons__19(
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
                                                                    cons_4 = function(
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
                                                                  ignore_18 = function(
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
                                                            return ruse_make_record_type_24(
                                                              function(v0) {
                                                                return (function(
                                                                  k
                                                                ) {
                                                                  return k(
                                                                    ruse_symbol_get_or_create(
                                                                      "<cons>"
                                                                    )
                                                                  );
                                                                })(function(
                                                                  t_117
                                                                ) {
                                                                  return (function(
                                                                    k
                                                                  ) {
                                                                    return k(
                                                                      ruse_symbol_get_or_create(
                                                                        "car"
                                                                      )
                                                                    );
                                                                  })(function(
                                                                    t_118
                                                                  ) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return k(
                                                                        ruse_symbol_get_or_create(
                                                                          "cdr"
                                                                        )
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
                                                                              t_117
                                                                            );
                                                                          },
                                                                          function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              t_118
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
                                                                    });
                                                                  });
                                                                });
                                                              }
                                                            );
                                                          })(function(v) {
                                                            _cons__19 = function(
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
                                                        let t_119 = Array.prototype.slice.call(
                                                          arguments
                                                        );
                                                        let k = shift(t_119);
                                                        return k(
                                                          apply2(
                                                            ruse_record_modifier,
                                                            t_119
                                                          )
                                                        );
                                                      });
                                                    })(function(v) {
                                                      ruse_record_modifier_20 = function(
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
                                                  let t_120 = Array.prototype.slice.call(
                                                    arguments
                                                  );
                                                  let k = shift(t_120);
                                                  return k(
                                                    apply2(
                                                      ruse_record_accessor,
                                                      t_120
                                                    )
                                                  );
                                                });
                                              })(function(v) {
                                                ruse_record_accessor_21 = function(
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
                                            let t_121 = Array.prototype.slice.call(
                                              arguments
                                            );
                                            let k = shift(t_121);
                                            return k(
                                              apply2(
                                                ruse_record_predicate,
                                                t_121
                                              )
                                            );
                                          });
                                        })(function(v) {
                                          ruse_record_predicate_22 = function(
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
                                      let t_122 = Array.prototype.slice.call(
                                        arguments
                                      );
                                      let k = shift(t_122);
                                      return k(
                                        apply2(ruse_record_constructor, t_122)
                                      );
                                    });
                                  })(function(v) {
                                    ruse_record_constructor_23 = function(k) {
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
                                let t_123 = Array.prototype.slice.call(
                                  arguments
                                );
                                let k = shift(t_123);
                                return k(apply2(ruse_make_record_type, t_123));
                              });
                            })(function(v) {
                              ruse_make_record_type_24 = function(k) {
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
                            let t_124 = Array.prototype.slice.call(arguments);
                            let k = shift(t_124);
                            return k(apply2(assume, t_124));
                          });
                        })(function(v) {
                          assume_3 = function(k) {
                            return k(v);
                          };
                          return k(voidf);
                        });
                      })(function(v) {
                        ignore_25 = function(k) {
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
              return voidf(function(t_125) {
                return voidf(function(t_126) {
                  return voidf(function(t_127) {
                    return voidf(function(t_128) {
                      return voidf(function(t_129) {
                        return voidf(function(t_130) {
                          return voidf(function(t_131) {
                            return voidf(function(t_132) {
                              return voidf(function(t_133) {
                                return voidf(function(t_134) {
                                  return voidf(function(t_135) {
                                    return voidf(function(t_136) {
                                      return voidf(function(v) {
                                        return function() {
                                          return v0(
                                            k,
                                            function(k) {
                                              return k(t_125);
                                            },
                                            function(k) {
                                              return k(t_126);
                                            },
                                            function(k) {
                                              return k(t_127);
                                            },
                                            function(k) {
                                              return k(t_128);
                                            },
                                            function(k) {
                                              return k(t_129);
                                            },
                                            function(k) {
                                              return k(t_130);
                                            },
                                            function(k) {
                                              return k(t_131);
                                            },
                                            function(k) {
                                              return k(t_132);
                                            },
                                            function(k) {
                                              return k(t_133);
                                            },
                                            function(k) {
                                              return k(t_134);
                                            },
                                            function(k) {
                                              return k(t_135);
                                            },
                                            function(k) {
                                              return k(t_136);
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
};
function output(x) {
  pk("output", x);
  return function() {};
}

trampoline(function() {
  return program(output);
});
