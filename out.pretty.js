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

let EMPTY_LIST = function() {
  return "EMPTY LIST";
};

let program = function(k) {
  return (function(k) {
    return k(function(k, example3_3, example2_2) {
      return (function(k) {
        return (function(k) {
          return k(function(k, t_8) {
            return (function(k) {
              return (function(k) {
                return k(function(k, t_9) {
                  return (function(k) {
                    return example3_3(function(v0) {
                      return k(pk(v0));
                    });
                  })(k);
                });
              })(function(v0) {
                return (function(k) {
                  return (function(k) {
                    return k(function(k, ignore_5) {
                      return (function(k) {
                        return (function(k) {
                          return k(function(k, t_7) {
                            return voidf(k);
                          });
                        })(function(v0) {
                          return (function(k) {
                            ignore_5 = function(k) {
                              example3_3 = function(k) {
                                return k(1337);
                              };
                              return k(voidf);
                            };
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
                    return voidf(function(v) {
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
              return k(function(k, ignore_4) {
                return (function(k) {
                  return (function(k) {
                    return k(function(k, t_6) {
                      return voidf(k);
                    });
                  })(function(v0) {
                    return (function(k) {
                      ignore_4 = function(k) {
                        example2_2 = function(k) {
                          return k(42);
                        };
                        return k(voidf);
                      };
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
              return voidf(function(v) {
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
    return voidf(function(t_10) {
      return voidf(function(v) {
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
