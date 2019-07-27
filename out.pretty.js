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
  return func.apply(undefined, args);
}

function add(a, b) {
  pk("adding....");
  return a + b;
}

function times(a, b) {
  return a * b;
}

let program = function(k) {
  return (function(k) {
    return k(function(k, add2_0) {
      return (function(k) {
        return add2_0(function(v0) {
          return (function(k) {
            return k(40);
          })(function(t_1) {
            return (function(k) {
              return k(2);
            })(function(v) {
              return function() {
                return v0(
                  k,
                  function(k) {
                    return k(t_1);
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
      return k(function() {
        let t_2 = Array.prototype.slice.call(arguments);
        let k = shift(t_2);
        return k(apply(add, t_2));
      });
    })(function(v) {
      return function() {
        return v0(k, function(k) {
          return k(v);
        });
      };
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
