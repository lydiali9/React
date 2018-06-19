import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './style.css'

export default class Modal extends React.PureComponent {

    static propTypes = {
        okText: PropTypes.string,
        cancelText: PropTypes.string,
        mask: PropTypes.bool,
        maskStyle: PropTypes.object,
        visible: PropTypes.bool,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        foot: PropTypes.element,
        title: PropTypes.string,
    }

    static defaultProps = {
        okText: "确定",
        cancelText: "取消",
        title: "提示",
        foot: null,
        mask: true,
        maskStyle: {},
        visible: false,
        onCancel: function () { },
        onOk: function () { }
    }

    static info = content => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(<Info visable={true}>{content}</Info>, container)
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ display: this.props.visible ? "block" : "none" }}>
                {
                    this.props.mask
                        ? <div className="modal_mask" style={this.props.maskStyle}></div>
                        : null
                }
                <div className="pie_modal_wrapper" >
                    <div className="pie_modal">
                        <div className="title">
                            {this.props.title}
                        </div>
                        <div className="content">
                            {this.props.children}
                        </div>
                        {
                            this.props.foot
                                ? this.props.foot
                                : <div className="foot">
                                    <span className="btn" onClick={this.props.onCancel}>{this.props.cancelText}</span>
                                    <span className="btn blue" onClick={this.props.onOK}>{this.props.okText}</span>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class Info extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visable: false
        }
    }

    componentDidMount() {
        this.setState({ visable: this.props.visable })
    }

    handleClick = () => this.setState({ visable: false })

    render() {
        return (
            <Modal
                visible={this.state.visable}
                foot={
                    <div className="foot" style={{ borderTop: "1px solid #e6e6e6" }}>
                        <span className="btn blue" style={{ width: "100%" }} onClick={this.handleClick}>确定</span>
                    </div>
                }
            >
                {
                    this.props.children
                }
            </Modal>
        )
    }
}