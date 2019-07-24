;

function output(x, y, z, t) {
    pk('output', x, y, z, t);
    return function() {};
}


trampoline(function() {return program (output);});
