document.querySelector('#noscript').style.display = "none";
document.querySelector('#loading').style.display = "block";

let ReactDOM = helpers.default.ReactDOM;
let hyperscript = helpers.default.h;

let container = document.getElementById('container');

/*
 * // xhr helper
 *
 * function sleep(ms) {
 *   return new Promise(resolve => setTimeout(resolve, ms));
 * }
 *
 * let xhrInProgress = false;
 *
 * let xhr = function(request) {
 *     // initiate async GET or POST request
 *     if (request[0] === "GET") {
 *         let path = request[1]
 *         request = new Request(path);
 *     } else if (request[0] === "POST") {
 *         let path = request[1]
 *         let body = JSON.stringify(request[2]);
 *         request = new Request(path, {"method": "POST", "body": body});
 *     }
 *     xhrInProgress = true;
 *     document.querySelector('#xhr').style.display = "block";
 *     fetch(request)
 *         .then(function(response) {
 *             return response.json();
 *         })
 *         .then(function(json) {
 *             if (xhrInProgress === true) {
 *                 xhrInProgress = false;
 *                 document.querySelector('#xhr').style.display = "none";
 *                 // FIXME
 *                 /* TODO: add response status
 *                  * return the xhr response to Scheme
 *                  * document.scheme_inbox = JSON.stringify(["xhr", json]);
 *                  * document.resume(); */
*             }
*         });
* }
*  */

// reactjs integration

let patch = function(json) {
    /* patch the DOM using `JSON` representation of the new DOM */
    ReactDOM.render(
        translate(json),
        container,
    );
}

let makeCallback = function(callback) {
    return function(event) {
        event.preventDefault();
        // XXX: this will invalidate / cancel any in-progress xhr
        // call, hence any in-progress `update` already in progress
        // scheme side both the xhr and the update will be
        // abandonned. MAYBE it will leak something scheme side. It is
        // somekind of throttling.
        xhrInProgress = false;
        document.querySelector('#xhr').style.display = "none";

        /* send serialized DOM event as EVENT with IDENTIFIER to Scheme VM */
        var msg = {
            "event": {'target.value': event.target.value},
        };
        callback(msg);
        return false;
    };
}

let translate = function(json) {
    /* Translate json to `vnode` using `h` react helper */

    let tag = json[0];

    // Create event handlers / callbacks
    let options = json[1] || {};
    for (let key in options) {
        if(key.startsWith('on')) {
            options[key] = makeCallback(options[key]);
        }
    }

    // recurse to translate children
    let children = json[2] || [];
    children = Object.values(children);
    children = children.map(function(child) {  // TODO: optimize with a for-loop
        if (child instanceof Object) {
            return translate(child);
        } else { // it's a string or a number
            return child;
        }
    });

    return hyperscript(tag, options, children);
}
