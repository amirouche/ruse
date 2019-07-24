;

function output(x) {
    pk('output', x);
    return function() {};
}


trampoline(function() {return program (output);});
