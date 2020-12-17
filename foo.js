function(t1) {
    return function(t2, t3) {
        return t1(t2, t3);
    }(22, function(t4) { return t1(t4, t4); }(10)); }
(function(a, b) { return a + b; })
