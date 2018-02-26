window.parent.addEventListener("message", function (event) {
    var request = JSON.parse(event.data);

    if (request.command !== "code") {
        return;
    }

    appendFile(request.code + "\nmain();\n", function () {
        event.source.postMessage(JSON.stringify({ status: "loaded" }), "*");
    }, function (error) {
        event.source.postMessage(JSON.stringify({ status: "failed", errorMessage: error }), "*");
    });
});

function appendFile(file, callback, errorCallback) {
    var script = document.createElement("script");
    script.onload = function () {
        callback();
    };
    script.onerror = function () {
        errorCallback("failed to load script" + fileName);
    };
    script.text = file;
    document.body.appendChild(script);
}

function start() {
    window.parent.postMessage(JSON.stringify({ command: "ready" }), "*");
}

var $stdoutBuffer = "";
function $rt_putStdout(ch) {
    if (ch === 0xA) {
        window.parent.postMessage(JSON.stringify({ command: "stdout", line: $rt_stdoutBuffer }), "*");
        $rt_stdoutBuffer = "";
    } else {
        $rt_stdoutBuffer += String.fromCharCode(ch);
    }
}
