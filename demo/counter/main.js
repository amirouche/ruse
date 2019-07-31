// TODO: rename or something
// TODO: document the webpack npm cli dance

document.querySelector('#noscript').style.display = "none";
document.querySelector('#loading').style.display = "block";

let ReactDOM = helpers.default.ReactDOM;
let hyperscript = helpers.default.h;

let container = document.getElementById('container');

function is_attributes(cons) {
    if (!(typeof cons === "object")) {
        return false;
    }
    if (!(typeof cons.fields[0] === "object")) {
        return false;
    }
    if (!(typeof cons.fields[0].fields[0] === "object")) {
        return false;
    }
    if (!(cons.fields[0].fields[0].value === "@")) {
        return false;
    }

    return true;
}

function scheme2object(scheme) {
    let out = {};
    while(scheme !== EMPTY_LIST) {
        let key = scheme.fields[0].fields[0];
        let value = scheme.fields[0].fields[1];

        if(key.startsWith('on')) {
            out[key] = makeCallback(value);
        } else {
            out[key] = value;
        }

        scheme = scheme.fields[1];
    }
    return out;
}

let makeCallback = function(callback) {
    return function(event) {
        event.preventDefault();

        /* send serialized DOM event as EVENT with IDENTIFIER to Scheme VM */
        var msg = {
            "event": {'target.value': event.target.value},
        };
        callback(msg);
        return false;
    };
}

let sxml2hyperscript = function(scheme) {
    let tag = scheme.fields[0].value;

    let cdr = scheme.fields[1];
    let child = undefined;
    let attrs = undefined;

    if (is_attributes(cdr) === true) {
        child = cdr.fields[1];
        attrs = scheme2object(cdr.fields[0].fields[1]);
    } else {
        attrs = {};
        child = cdr;
    }

    let children = [];

    if (child !== EMPTY_LIST) {

        while (true) {

            let car = child.fields[0];
            let cdr = child.fields[1];

            if (typeof car == "object") {
                children.push(sxml2hyperscript(car));
            } else if (typeof car === 'string' || typeof car === 'number') {
                children.push(car)
            } else {
                console.assert(false, "unknown car", typeof car, car);
                debug;
            }


            if (cdr === EMPTY_LIST) {
                break;
            } else {
                child = cdr;
            }
        };
    }

    return hyperscript(tag, attrs, children);
}

let patch = function(scheme) {
    let out = sxml2hyperscript(scheme);
    ReactDOM.render(
        out,
        container,
    );
    // TODO: return something?
}
