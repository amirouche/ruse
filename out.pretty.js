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

function assume(v, message) {
  console.assert(v, message);
}

/* symbols */

let SYMBOLS = {};

function ruse_symbol_get_or_create(string) {
  let out = SYMBOLS[string];
  if (out === undefined) {
    out = { $type: "symbol", $value: string };
    SYMBOLS[string] = out;
  }
  return out;
}

/* define-record-type helpers */

function ruse_make_record_type(name) {
  let tags = shift(arguments);
  let fields = {};
  for (let k in tags) {
    fields[tags[k]] = k;
  }
  return { $type: "record", $subtype: name, fields: fields };
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

let program = function(k) {
  return (function(k) {
    return k(function(
      k,
      set_cdr__11,
      cdr_10,
      set_car__9,
      car_8,
      pair__7,
      make_cons_6,
      _cons__5,
      ruse_record_modifier_4,
      ruse_record_accessor_3,
      ruse_record_predicate_2,
      ruse_record_constructor_1,
      ruse_make_record_type_0
    ) {
      return (function(k) {
        return (function(k) {
          return k(function(k, t_12) {
            return (function(k) {
              return (function(k) {
                return k(function(k, t_13) {
                  return (function(k) {
                    return (function(k) {
                      return k(function(k, t_14) {
                        return (function(k) {
                          return (function(k) {
                            return k(function(k, t_15) {
                              return (function(k) {
                                return (function(k) {
                                  return k(function(k, t_16) {
                                    return (function(k) {
                                      return (function(k) {
                                        return k(function(k, t_17) {
                                          return (function(k) {
                                            return (function(k) {
                                              return k(function(k, t_18) {
                                                return (function(k) {
                                                  return (function(k) {
                                                    return k(function(k, t_19) {
                                                      return (function(k) {
                                                        return (function(k) {
                                                          return k(function(
                                                            k,
                                                            t_20
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
                                                                    t_21
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
                                                                            t_22
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
                                                                                    t_23
                                                                                  ) {
                                                                                    return _cons_(
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
                                                                                      return ruse_record_modifier(
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
                                                                                              t_24
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
                                                                                                          t_24
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
                                                                                        set_cdr__11 = function(
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
                                                                              return ruse_record_accessor(
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
                                                                                      t_25
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
                                                                                                  t_25
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
                                                                                cdr_10 = function(
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
                                                                    return ruse_record_modifier(
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
                                                                            t_26
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
                                                                                        t_26
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
                                                                  })(function(
                                                                    v
                                                                  ) {
                                                                    set_car__9 = function(
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
                                                              return ruse_record_accessor(
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
                                                                    t_27
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
                                                                      v
                                                                    ) {
                                                                      return function() {
                                                                        return v0(
                                                                          k,
                                                                          function(
                                                                            k
                                                                          ) {
                                                                            return k(
                                                                              t_27
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
                                                                }
                                                              );
                                                            })(function(v) {
                                                              car_8 = function(
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
                                                        return ruse_record_predicate(
                                                          function(v0) {
                                                            return (function(
                                                              k
                                                            ) {
                                                              return k(
                                                                ruse_symbol_get_or_create(
                                                                  "<cons>"
                                                                )
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
                                                          }
                                                        );
                                                      })(function(v) {
                                                        pair__7 = function(k) {
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
                                                  return ruse_record_constructor(
                                                    function(v0) {
                                                      return (function(k) {
                                                        return k(
                                                          ruse_symbol_get_or_create(
                                                            "<cons>"
                                                          )
                                                        );
                                                      })(function(t_28) {
                                                        return (function(k) {
                                                          return k(
                                                            ruse_symbol_get_or_create(
                                                              "car"
                                                            )
                                                          );
                                                        })(function(t_29) {
                                                          return (function(k) {
                                                            return k(
                                                              ruse_symbol_get_or_create(
                                                                "cdr"
                                                              )
                                                            );
                                                          })(function(v) {
                                                            return function() {
                                                              return v0(
                                                                k,
                                                                function(k) {
                                                                  return k(
                                                                    t_28
                                                                  );
                                                                },
                                                                function(k) {
                                                                  return k(
                                                                    t_29
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
                                                    }
                                                  );
                                                })(function(v) {
                                                  make_cons_6 = function(k) {
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
                                            return ruse_make_record_type(
                                              function(v0) {
                                                return (function(k) {
                                                  return k(
                                                    ruse_symbol_get_or_create(
                                                      "<cons>"
                                                    )
                                                  );
                                                })(function(t_30) {
                                                  return (function(k) {
                                                    return k(
                                                      ruse_symbol_get_or_create(
                                                        "car"
                                                      )
                                                    );
                                                  })(function(t_31) {
                                                    return (function(k) {
                                                      return k(
                                                        ruse_symbol_get_or_create(
                                                          "cdr"
                                                        )
                                                      );
                                                    })(function(v) {
                                                      return function() {
                                                        return v0(
                                                          k,
                                                          function(k) {
                                                            return k(t_30);
                                                          },
                                                          function(k) {
                                                            return k(t_31);
                                                          },
                                                          function(k) {
                                                            return k(v);
                                                          }
                                                        );
                                                      };
                                                    });
                                                  });
                                                });
                                              }
                                            );
                                          })(function(v) {
                                            _cons__5 = function(k) {
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
                                      return javascript_procedure(function(v0) {
                                        return ruse_record_accessor(function(
                                          v
                                        ) {
                                          return function() {
                                            return v0(k, function(k) {
                                              return k(v);
                                            });
                                          };
                                        });
                                      });
                                    })(function(v) {
                                      ruse_record_modifier_4 = function(k) {
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
                                return javascript_procedure(function(v0) {
                                  return ruse_record_accessor(function(v) {
                                    return function() {
                                      return v0(k, function(k) {
                                        return k(v);
                                      });
                                    };
                                  });
                                });
                              })(function(v) {
                                ruse_record_accessor_3 = function(k) {
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
                          return javascript_procedure(function(v0) {
                            return ruse_record_predicate(function(v) {
                              return function() {
                                return v0(k, function(k) {
                                  return k(v);
                                });
                              };
                            });
                          });
                        })(function(v) {
                          ruse_record_predicate_2 = function(k) {
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
                    return javascript_procedure(function(v0) {
                      return ruse_record_constructor(function(v) {
                        return function() {
                          return v0(k, function(k) {
                            return k(v);
                          });
                        };
                      });
                    });
                  })(function(v) {
                    ruse_record_constructor_1 = function(k) {
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
              return javascript_procedure(function(v0) {
                return ruse_make_record_type(function(v) {
                  return function() {
                    return v0(k, function(k) {
                      return k(v);
                    });
                  };
                });
              });
            })(function(v) {
              ruse_make_record_type_0 = function(k) {
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
    return voidf(function(t_32) {
      return voidf(function(t_33) {
        return voidf(function(t_34) {
          return voidf(function(t_35) {
            return voidf(function(t_36) {
              return voidf(function(t_37) {
                return voidf(function(t_38) {
                  return voidf(function(t_39) {
                    return voidf(function(t_40) {
                      return voidf(function(t_41) {
                        return voidf(function(t_42) {
                          return voidf(function(v) {
                            return function() {
                              return v0(
                                k,
                                function(k) {
                                  return k(t_32);
                                },
                                function(k) {
                                  return k(t_33);
                                },
                                function(k) {
                                  return k(t_34);
                                },
                                function(k) {
                                  return k(t_35);
                                },
                                function(k) {
                                  return k(t_36);
                                },
                                function(k) {
                                  return k(t_37);
                                },
                                function(k) {
                                  return k(t_38);
                                },
                                function(k) {
                                  return k(t_39);
                                },
                                function(k) {
                                  return k(t_40);
                                },
                                function(k) {
                                  return k(t_41);
                                },
                                function(k) {
                                  return k(t_42);
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
