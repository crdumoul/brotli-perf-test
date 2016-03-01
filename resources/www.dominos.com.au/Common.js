/**
 * Fixes race conditions between jQuery and our custom scripts by waiting for document load and jQuery library
 * @param {} callback 
 * @param int timeout 
 * @param int interval 
 * @returns {} 
 */
function onDocumentReady(callback, timeout, interval) {
    if (typeof timeout == "undefined") timeout = 15000;
    if (typeof interval == "undefined") interval = 200;

    if (timeout > 0 && typeof $ == "undefined") {
        setTimeout(function () { onDocumentReady(callback, timeout - interval) }, interval);
        return;
    }
    else if (timeout==0 && typeof $ == "undefined") {
        console.log("jQuery not found after "+((15000-timeout)/1000)+"s");
    }
    else {
        console.log("Found jQuery after " + ((15000 - timeout) / 1000) + "s");
    }
    $(document).ready(callback());
}

function onDocumentLoad(callback, timeout, interval) {
    if (typeof timeout == "undefined") timeout = 15000;
    if (typeof interval == "undefined") interval = 200;

    if (timeout > 0 && typeof $ == "undefined") {
        setTimeout(function () { onDocumentReady(callback, timeout - interval) }, interval);
        return;
    }
    else if (timeout == 0 && typeof $ == "undefined") {
        console.log("jQuery not found after " + ((15000 - timeout) / 1000) + "s");
    }
    else {
        console.log("Found jQuery after " + ((15000 - timeout) / 1000) + "s");
    }
    $(document).load(callback());
}

/**
 *  IE <10 (and maybe others?) doesnt expose console unless the developer toolbar is active, which breaks other included js
 */
if (typeof (console) == "undefined") {
    console = {};
    console.log = function () { };
}

/**
 *  disable console on all environments except dev/qa/local
 */
var consoleHolder = console;
function debug(bool) {
    if (!bool) {
        consoleHolder = console;
        console = {};
        console.log = function () { };
    } else {
        console = consoleHolder;
    }
}

function isDevEnvironment() {
    if (document.location.hostname == "localhost") return true;
    if (document.location.hostname == "pwrdev.dominos.local") return true;
    if (document.location.hostname == "pwrqa.dominos.local") return true;
    return false;
}

debug(isDevEnvironment());