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

ruse_cons = ruse_record_constructor(ruse_cons_record);

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
    return k(function(
      k,
      pk_14,
      times_13,
      add_12,
      list_11,
      set_cdr__10,
      cdr_9,
      set_car__8,
      car_7,
      pair__6,
      cons_5,
      null__4,
      assume_3
    ) {
      return (function(k) {
        return (function(k) {
          return k(function(k, t_86) {
            return (function(k) {
              return (function(k) {
                return k(function(k, t_87) {
                  return (function(k) {
                    return (function(k) {
                      return k(function(k, t_88) {
                        return (function(k) {
                          return (function(k) {
                            return k(function(k, patch__34) {
                              return (function(k) {
                                return (function(k) {
                                  return k(function(
                                    k,
                                    _create_app_39,
                                    create_app_38,
                                    onClick_37,
                                    init_36,
                                    view_35
                                  ) {
                                    return (function(k) {
                                      return (function(k) {
                                        return k(function(k, t_81) {
                                          return (function(k) {
                                            return (function(k) {
                                              return k(function(k, t_82) {
                                                return (function(k) {
                                                  return (function(k) {
                                                    return k(function(k, t_83) {
                                                      return (function(k) {
                                                        return (function(k) {
                                                          return k(function(
                                                            k,
                                                            t_84
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
                                                                    t_85
                                                                  ) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return create_app_38(
                                                                        function(
                                                                          v0
                                                                        ) {
                                                                          return init_36(
                                                                            function(
                                                                              t_89
                                                                            ) {
                                                                              return view_35(
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
                                                                        model_40,
                                                                        mc_41
                                                                      ) {
                                                                        return (function(
                                                                          k
                                                                        ) {
                                                                          return list_11(
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
                                                                                  t_96
                                                                                ) {
                                                                                  return (function(
                                                                                    k
                                                                                  ) {
                                                                                    return list_11(
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
                                                                                            t_91
                                                                                          ) {
                                                                                            return (function(
                                                                                              k
                                                                                            ) {
                                                                                              return cons_5(
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
                                                                                                      t_90
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
                                                                                      t_97
                                                                                    ) {
                                                                                      return (function(
                                                                                        k
                                                                                      ) {
                                                                                        return k(
                                                                                          "(= count "
                                                                                        );
                                                                                      })(
                                                                                        function(
                                                                                          t_98
                                                                                        ) {
                                                                                          return model_40(
                                                                                            function(
                                                                                              t_99
                                                                                            ) {
                                                                                              return (function(
                                                                                                k
                                                                                              ) {
                                                                                                return k(
                                                                                                  ") "
                                                                                                );
                                                                                              })(
                                                                                                function(
                                                                                                  t_100
                                                                                                ) {
                                                                                                  return (function(
                                                                                                    k
                                                                                                  ) {
                                                                                                    return list_11(
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
                                                                                                            t_94
                                                                                                          ) {
                                                                                                            return (function(
                                                                                                              k
                                                                                                            ) {
                                                                                                              return list_11(
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
                                                                                                                      t_93
                                                                                                                    ) {
                                                                                                                      return (function(
                                                                                                                        k
                                                                                                                      ) {
                                                                                                                        return cons_5(
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
                                                                                                                                t_92
                                                                                                                              ) {
                                                                                                                                return (function(
                                                                                                                                  k
                                                                                                                                ) {
                                                                                                                                  return mc_41(
                                                                                                                                    function(
                                                                                                                                      v0
                                                                                                                                    ) {
                                                                                                                                      return onClick_37(
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
                                                                                                                t_95
                                                                                                              ) {
                                                                                                                return (function(
                                                                                                                  k
                                                                                                                ) {
                                                                                                                  return k(
                                                                                                                    "increment"
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
                                                                                                              t_97
                                                                                                            );
                                                                                                          },
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
                                                                                                              t_99
                                                                                                            );
                                                                                                          },
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
                                                                                        }
                                                                                      );
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
                                                                    view_35 = function(
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
                                                              init_36 = function(
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
                                                          model_42
                                                        ) {
                                                          return (function(k) {
                                                            return k(function(
                                                              k,
                                                              event_43
                                                            ) {
                                                              return (function(
                                                                k
                                                              ) {
                                                                return add_12(
                                                                  function(v0) {
                                                                    return model_42(
                                                                      function(
                                                                        t_101
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
                                                                                    t_101
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
                                                        onClick_37 = function(
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
                                                    init_44,
                                                    view_45
                                                  ) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          change_46
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                t_80
                                                              ) {
                                                                return change_46(
                                                                  k
                                                                );
                                                              });
                                                            })(function(v0) {
                                                              return (function(
                                                                k
                                                              ) {
                                                                return change_46(
                                                                  function(v0) {
                                                                    return (function(
                                                                      k
                                                                    ) {
                                                                      return k(
                                                                        function(
                                                                          k,
                                                                          model_47
                                                                        ) {
                                                                          return model_47(
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
                                                          return _create_app_39(
                                                            function(v0) {
                                                              return init_44(
                                                                function(
                                                                  t_102
                                                                ) {
                                                                  return view_45(
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
                                                  create_app_38 = function(k) {
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
                                              init_48,
                                              view_49
                                            ) {
                                              return (function(k) {
                                                return (function(k) {
                                                  return k(function(
                                                    k,
                                                    model_50
                                                  ) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          make_controller_52,
                                                          render_51
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                t_78
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
                                                                        t_79
                                                                      ) {
                                                                        return (function(
                                                                          k
                                                                        ) {
                                                                          return k(
                                                                            function(
                                                                              k,
                                                                              proc_56
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
                                                                                      new_57
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
                                                                                              t_77
                                                                                            ) {
                                                                                              return (function(
                                                                                                k
                                                                                              ) {
                                                                                                return render_51(
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
                                                                                              return new_57(
                                                                                                function(
                                                                                                  v
                                                                                                ) {
                                                                                                  model_50 = function(
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
                                                                                      return proc_56(
                                                                                        function(
                                                                                          v0
                                                                                        ) {
                                                                                          return model_50(
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
                                                                              return patch__34(
                                                                                function(
                                                                                  v0
                                                                                ) {
                                                                                  return (function(
                                                                                    k
                                                                                  ) {
                                                                                    return view_49(
                                                                                      function(
                                                                                        v0
                                                                                      ) {
                                                                                        return model_50(
                                                                                          function(
                                                                                            t_103
                                                                                          ) {
                                                                                            return make_controller_52(
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
                                                                          render_51 = function(
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
                                                                      proc_53
                                                                    ) {
                                                                      return (function(
                                                                        k
                                                                      ) {
                                                                        return k(
                                                                          function() {
                                                                            let t_104 = Array.prototype.slice.call(
                                                                              arguments
                                                                            );
                                                                            t_104 = t_104.map(
                                                                              wrap
                                                                            );
                                                                            prepend(
                                                                              returnk,
                                                                              t_104
                                                                            );
                                                                            return trampoline(
                                                                              apply(
                                                                                (function(
                                                                                  k
                                                                                ) {
                                                                                  return k(
                                                                                    function(
                                                                                      k,
                                                                                      event_54
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
                                                                                              new_55
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
                                                                                                      return (function(
                                                                                                        k
                                                                                                      ) {
                                                                                                        return render_51(
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
                                                                                                      return new_55(
                                                                                                        function(
                                                                                                          v
                                                                                                        ) {
                                                                                                          model_50 = function(
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
                                                                                                return proc_53(
                                                                                                  function(
                                                                                                    v0
                                                                                                  ) {
                                                                                                    return model_50(
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
                                                                                                  return event_54(
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
                                                                                t_104
                                                                              )
                                                                            );
                                                                          }
                                                                        );
                                                                      })(k);
                                                                    }
                                                                  );
                                                                })(function(v) {
                                                                  make_controller_52 = function(
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
                                                          t_105
                                                        ) {
                                                          return voidf(function(
                                                            v
                                                          ) {
                                                            return function() {
                                                              return v0(
                                                                k,
                                                                function(k) {
                                                                  return k(
                                                                    t_105
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
                                                    return init_48(function(v) {
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
                                            _create_app_39 = function(k) {
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
                                  return voidf(function(t_106) {
                                    return voidf(function(t_107) {
                                      return voidf(function(t_108) {
                                        return voidf(function(t_109) {
                                          return voidf(function(v) {
                                            return function() {
                                              return v0(
                                                k,
                                                function(k) {
                                                  return k(t_106);
                                                },
                                                function(k) {
                                                  return k(t_107);
                                                },
                                                function(k) {
                                                  return k(t_108);
                                                },
                                                function(k) {
                                                  return k(t_109);
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
                                let t_110 = Array.prototype.slice.call(
                                  arguments
                                );
                                let k = shift(t_110);
                                return k(apply2(patch, t_110));
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
                        return pk_14(function(v0) {
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
                    return k(function(k, ignore_33, ignore_32, ignore_31) {
                      return (function(k) {
                        return (function(k) {
                          return k(function(k, t_73) {
                            return (function(k) {
                              return (function(k) {
                                return k(function(k, t_74) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function(k, t_75) {
                                        return voidf(k);
                                      });
                                    })(function(v0) {
                                      return (function(k) {
                                        return (function(k) {
                                          return (function(k) {
                                            return k(function() {
                                              let t_111 = Array.prototype.slice.call(
                                                arguments
                                              );
                                              let k = shift(t_111);
                                              return k(apply2(pk, t_111));
                                            });
                                          })(function(v) {
                                            pk_14 = function(k) {
                                              return k(v);
                                            };
                                            return k(voidf);
                                          });
                                        })(function(v) {
                                          ignore_31 = function(k) {
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
                                        let t_112 = Array.prototype.slice.call(
                                          arguments
                                        );
                                        let k = shift(t_112);
                                        return k(apply2(times, t_112));
                                      });
                                    })(function(v) {
                                      times_13 = function(k) {
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
                                  let t_113 = Array.prototype.slice.call(
                                    arguments
                                  );
                                  let k = shift(t_113);
                                  return k(apply2(add, t_113));
                                });
                              })(function(v) {
                                add_12 = function(k) {
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
                    return voidf(function(t_114) {
                      return voidf(function(t_115) {
                        return voidf(function(v) {
                          return function() {
                            return v0(
                              k,
                              function(k) {
                                return k(t_114);
                              },
                              function(k) {
                                return k(t_115);
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
                ignore_29,
                ignore_28,
                ruse_make_record_type_27,
                ruse_record_constructor_26,
                ruse_record_predicate_25,
                ruse_record_accessor_24,
                ruse_record_modifier_23,
                _cons__22,
                ignore_21,
                ignore_20,
                ignore_19,
                ignore_18,
                ignore_17,
                ignore_16,
                ignore_15
              ) {
                return (function(k) {
                  return (function(k) {
                    return k(function(k, t_58) {
                      return (function(k) {
                        return (function(k) {
                          return k(function(k, t_59) {
                            return (function(k) {
                              return (function(k) {
                                return k(function(k, t_60) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function(k, t_61) {
                                        return (function(k) {
                                          return (function(k) {
                                            return k(function(k, t_62) {
                                              return (function(k) {
                                                return (function(k) {
                                                  return k(function(k, t_63) {
                                                    return (function(k) {
                                                      return (function(k) {
                                                        return k(function(
                                                          k,
                                                          t_64
                                                        ) {
                                                          return (function(k) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(function(
                                                                k,
                                                                t_65
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
                                                                        t_66
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
                                                                                t_67
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
                                                                                                                                args_30 = ruse_arguments_to_list(
                                                                                                                                  arguments
                                                                                                                                );
                                                                                                                                return args_30(
                                                                                                                                  k
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                          })(
                                                                                                                            function(
                                                                                                                              v
                                                                                                                            ) {
                                                                                                                              list_11 = function(
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
                                                                                                                    return ruse_record_modifier_23(
                                                                                                                      function(
                                                                                                                        v0
                                                                                                                      ) {
                                                                                                                        return _cons__22(
                                                                                                                          function(
                                                                                                                            t_117
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
                                                                                                                                        t_117
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
                                                                                                                      set_cdr__10 = function(
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
                                                                                                            return ruse_record_accessor_24(
                                                                                                              function(
                                                                                                                v0
                                                                                                              ) {
                                                                                                                return _cons__22(
                                                                                                                  function(
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
                                                                                                              cdr_9 = function(
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
                                                                                                    return ruse_record_modifier_23(
                                                                                                      function(
                                                                                                        v0
                                                                                                      ) {
                                                                                                        return _cons__22(
                                                                                                          function(
                                                                                                            t_119
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
                                                                                                                        t_119
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
                                                                                                      set_car__8 = function(
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
                                                                                                    ignore_18 = function(
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
                                                                                            return ruse_record_accessor_24(
                                                                                              function(
                                                                                                v0
                                                                                              ) {
                                                                                                return _cons__22(
                                                                                                  function(
                                                                                                    t_120
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
                                                                                                                t_120
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
                                                                                              car_7 = function(
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
                                                                                    return ruse_record_predicate_25(
                                                                                      function(
                                                                                        v0
                                                                                      ) {
                                                                                        return _cons__22(
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
                                                                                      pair__6 = function(
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
                                                                          return ruse_record_constructor_26(
                                                                            function(
                                                                              v0
                                                                            ) {
                                                                              return _cons__22(
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
                                                                            cons_5 = function(
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
                                                                  return ruse_make_record_type_27(
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
                                                                          t_121
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
                                                                              t_122
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
                                                                                          t_121
                                                                                        );
                                                                                      },
                                                                                      function(
                                                                                        k
                                                                                      ) {
                                                                                        return k(
                                                                                          t_122
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
                                                                })(function(v) {
                                                                  _cons__22 = function(
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
                                                                let t_123 = Array.prototype.slice.call(
                                                                  arguments
                                                                );
                                                                let k = shift(
                                                                  t_123
                                                                );
                                                                return k(
                                                                  apply2(
                                                                    ruse_record_modifier,
                                                                    t_123
                                                                  )
                                                                );
                                                              }
                                                            );
                                                          })(function(v) {
                                                            ruse_record_modifier_23 = function(
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
                                                        let t_124 = Array.prototype.slice.call(
                                                          arguments
                                                        );
                                                        let k = shift(t_124);
                                                        return k(
                                                          apply2(
                                                            ruse_record_accessor,
                                                            t_124
                                                          )
                                                        );
                                                      });
                                                    })(function(v) {
                                                      ruse_record_accessor_24 = function(
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
                                                  let t_125 = Array.prototype.slice.call(
                                                    arguments
                                                  );
                                                  let k = shift(t_125);
                                                  return k(
                                                    apply2(
                                                      ruse_record_predicate,
                                                      t_125
                                                    )
                                                  );
                                                });
                                              })(function(v) {
                                                ruse_record_predicate_25 = function(
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
                                            let t_126 = Array.prototype.slice.call(
                                              arguments
                                            );
                                            let k = shift(t_126);
                                            return k(
                                              apply2(
                                                ruse_record_constructor,
                                                t_126
                                              )
                                            );
                                          });
                                        })(function(v) {
                                          ruse_record_constructor_26 = function(
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
                                      let t_127 = Array.prototype.slice.call(
                                        arguments
                                      );
                                      let k = shift(t_127);
                                      return k(
                                        apply2(ruse_make_record_type, t_127)
                                      );
                                    });
                                  })(function(v) {
                                    ruse_make_record_type_27 = function(k) {
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
                                  let t_128 = Array.prototype.slice.call(
                                    arguments
                                  );
                                  let k = shift(t_128);
                                  return k(apply2(nullp, t_128));
                                });
                              })(function(v) {
                                null__4 = function(k) {
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
                    return (function(k) {
                      return (function(k) {
                        return (function(k) {
                          return k(function() {
                            let t_129 = Array.prototype.slice.call(arguments);
                            let k = shift(t_129);
                            return k(apply2(assume, t_129));
                          });
                        })(function(v) {
                          assume_3 = function(k) {
                            return k(v);
                          };
                          return k(voidf);
                        });
                      })(function(v) {
                        ignore_29 = function(k) {
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
              return voidf(function(t_130) {
                return voidf(function(t_131) {
                  return voidf(function(t_132) {
                    return voidf(function(t_133) {
                      return voidf(function(t_134) {
                        return voidf(function(t_135) {
                          return voidf(function(t_136) {
                            return voidf(function(t_137) {
                              return voidf(function(t_138) {
                                return voidf(function(t_139) {
                                  return voidf(function(t_140) {
                                    return voidf(function(t_141) {
                                      return voidf(function(t_142) {
                                        return voidf(function(t_143) {
                                          return voidf(function(v) {
                                            return function() {
                                              return v0(
                                                k,
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
    return voidf(function(t_144) {
      return voidf(function(t_145) {
        return voidf(function(t_146) {
          return voidf(function(t_147) {
            return voidf(function(t_148) {
              return voidf(function(t_149) {
                return voidf(function(t_150) {
                  return voidf(function(t_151) {
                    return voidf(function(t_152) {
                      return voidf(function(t_153) {
                        return voidf(function(t_154) {
                          return voidf(function(v) {
                            return function() {
                              return v0(
                                k,
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
};
function output(x) {
  pk("output", x);
  return function() {};
}

trampoline(function() {
  return program(output);
});
