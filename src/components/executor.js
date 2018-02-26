//@flow
import React, { Component } from 'react';

import './executor.css';

type Props = {
    code: string
};

type State = {
};

class Editor extends Component<Props, State> {
    componentDidMount() {
        this.mesageListener = window.addEventListener("message", e => this.receivedMessage(e));
    }

    componentWillUnmount() {
        // TODO(briang): Stop listening
    }

    receivedMessage(event: Event) {
        const {code} = this.props;
        if (!code ||
            !event ||
            !event.data ||
            (typeof event.data) !== "string"
        ) {
            return;
        }

        const command = JSON.parse(event.data);

        if (command.command === "ready") {
            const codeCommand = {
                command: "code",
                code
            };

            window.postMessage(JSON.stringify(codeCommand), "*");
        }
    }

    render() {
        const {code} = this.props;

        return <div className="compiled-code">
            {code && <iframe src="execution-frame.html" title="executor" />}
            <pre>
                {code}
            </pre>
        </div>;
    }
}

export default Editor;
