import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty, classNames } from '../../common/utils.js'
import './style.css'
const container = document.createElement('div')
document.body.appendChild(container);
export default class Message extends React.PureComponent {

    static defaultProps = {
        delay: 3000
    }

    static info(content, delay, type) {
        ReactDOM.render(<Message {...{ content, delay, type }} />, container);
    }
    static success(content, delay) {
        ReactDOM.render(<Message {...{ content, delay, type: "success" }} />, container);
    }

    static error(content, delay) {
        ReactDOM.render(<Message {...{ content, delay, type: "error" }} />, container);
    }

    constructor(props) {
        super(props)
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            ReactDOM.unmountComponentAtNode(container)
        }, this.props.delay)
    }

    componentWillUnmount() {
        this.timer = null;
    }


    render() {
        const { type, content } = this.props;

        return (
            <div className="Message" ref={element => this.instance = element} >
                {
                    isEmpty(type) ? null : <div className={`icon ${type}`}></div>
                }
                <div className="content">
                    {content}
                </div>
            </div>
        )
    }
}
