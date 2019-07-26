;

function output(x) {
    pk(x);
    return function() {};
}


trampoline(function() {return program (output);});
