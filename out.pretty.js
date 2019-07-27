function voidf(k) {
  return k(undefined);
}

function pk() {
  console.log.apply(console, arguments);
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
    return v;
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

function add(a, b) {
  return a + b;
}

function times(a, b) {
  return a * b;
}

function frob(a, b, c) {
  return a + b + c;
}

function frob2(func) {
  out = func(42, 42);
  return out;
}

let program = function(k) {
  return (function(k) {
    return k(function(k, frob2_1, v_0) {
      return (function(k) {
        return (function(k) {
          return k(function(k, t_6) {
            return v_0(k);
          });
        })(function(v0) {
          return (function(k) {
            return (function(k) {
              return frob2_1(function(v0) {
                return (function(k) {
                  return k(function() {
                    let t_7 = Array.prototype.slice.call(arguments);
                    t_7 = t_7.map(wrap);
                    prepend(returnk, t_7);
                    return trampoline(
                      apply(
                        (function(k) {
                          return k(function(k, a_2, b_3) {
                            return (function(k) {
                              return (function(k) {
                                return k(function(k, t_4) {
                                  return (function(k) {
                                    return (function(k) {
                                      return k(function(k, t_5) {
                                        return (function(k) {
                                          return k(1337);
                                        })(k);
                                      });
                                    })(function(v0) {
                                      return (function(k) {
                                        v_0 = b_3;
                                        return k(voidf);
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
                                  return a_2(function(v0) {
                                    return k(pk(v0));
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
                        })(returnk),
                        t_7
                      )
                    );
                  });
                })(function(v) {
                  return function() {
                    return v0(k, function(k) {
                      return k(v);
                    });
                  };
                });
              });
            })(function(v0) {
              return k(pk(v0));
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
      return k(function() {
        let t_8 = Array.prototype.slice.call(arguments);
        let k = shift(t_8);
        return k(apply2(frob2, t_8));
      });
    })(function(t_9) {
      return (function(k) {
        return k(1);
      })(function(v) {
        return function() {
          return v0(
            k,
            function(k) {
              return k(t_9);
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
