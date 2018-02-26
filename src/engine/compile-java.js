
// @flow

type Message = {
    id: string,
    command: string
};

let pendingResponses: Array<{
    message: Message,
    resolve: (data: any) => void,
    reject: (data: any) => void
}> = [];

let incrementalId = 1;

function createMessage(command: string, props: any): Message {
    return {
        id: (incrementalId++).toString(),
        command,
        ...props,
    };
}

function postMessage(worker: any, command: string, props: any): Message {
    const message = createMessage(command, props);
    worker.postMessage(message);
    return message;
}

function waitForResponse(message: Message): Promise<any> {
    const result = new Promise((resolve, reject) => {
        pendingResponses.push({
            message,
            resolve,
            reject,
        });
    });

    return result;
}

function isMessage(data: any) {
    return 'id' in data && typeof data.id === 'string';
}

function receiveMessageFromWorker(event: any) {
    if (!isMessage(event.data)) {
        return;
    }

    const message = event.data;

    const pending = pendingResponses.find(
        response => response.message.id === message.id);

    if (pending) {
        pending.resolve(message);

        pendingResponses = pendingResponses.filter(
            response => response.message.id !== message.id);
    }
}

export function init() {
    const worker = new Worker("worker.js");

    worker.addEventListener("message", receiveMessageFromWorker);

    const message = postMessage(worker, "load-classlib", {
        url: "classlib.txt",
    });

    waitForResponse(message)
        .then(result => {
            console.log("RESULT!!!");
            console.log(result);
        });
}

export function compile(code) {
    return Promise.resolve(code.toUpperCase());
}
