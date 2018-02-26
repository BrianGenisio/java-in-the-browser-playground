//@flow
import React, { Component } from 'react';
import "./ide.css";

import {compile} from '../engine/compile-java.js';

import Editor from './editor.js';
import Executor from './executor.js';

type Props = {

};

type State = {
    code: string,
    compiled: string
};

class IDE extends Component<Props, State> {
    state = {
        code: "",
        compiled: ""
    }

    compile() {
        const {code} = this.state;

        this.setState({compiled: ""});

        compile(code)
            .then(compiled => {
                this.setState({compiled});
            })
            .catch(console.log);
    }

    render() {
        const {compiled} = this.state;

        return <div className="ide-container">
            <div className="ide-commands">
                <button
                    onClick={() => this.compile()}
                >
                    Compile
                </button>
            </div>
            <div className="ide-editor">
                <Editor onChange={code => this.setState({code})} />
            </div>

            <div className="ide-execution">
                <Executor code={compiled} />
            </div>

            <div className="ide-console">
                CONSOLE
            </div>
        </div>;
    }
}

export default IDE;
