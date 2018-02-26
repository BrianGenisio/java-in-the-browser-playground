//@flow
import React, { Component } from 'react';

const HELLO_WORLD_JAVA = `class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`;

type Props = {
    onChange: (value: string) => void
};

type State = {
    code: string
};

class Editor extends Component<Props, State> {
    state = {
        code: HELLO_WORLD_JAVA,
    }

    constructor(props: Props) {
        super();

        props.onChange(HELLO_WORLD_JAVA);
    }

    handleChange(code: string) {
        const {onChange} = this.props;

        this.setState({code});
        onChange(code);
    }

    render() {
        const {code} = this.state;

        return <textarea
            onChange={e => this.handleChange(e.target.value)}
            value={code}
        />;
    }
}

export default Editor;
