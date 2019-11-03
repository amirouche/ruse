;

function output(x) {
    pk('output', JSON.stringify(x));
    return function() {};
}


trampoline(function() {return program (output);});
