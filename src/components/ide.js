//@flow
import React, { Component } from 'react';
import "./ide.css";
import Editor from './editor.js';
import {compile} from '../engine/compile-java.js';

type Props = {

};

type State = {
    code: string
};

class IDE extends Component<Props, State> {
    state = {
        code: ""
    }

    compile() {
        const {code} = this.state;

        compile(code).then(alert);
    }

    render() {
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
                EXECUTE
            </div>

            <div className="ide-console">
                CONSOLE
            </div>
        </div>;
    }
}

export default IDE;
