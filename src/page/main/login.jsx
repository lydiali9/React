import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Message from '../../components/message/index.jsx'
import { classNames, isEmpty } from '../../common/utils.js'
import { STATUS } from '../../common/constant';
import history from '../../redux/history.js'
import * as Actions from './actions'
import './style.less'


class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            code: "",
            key: "获取验证码",
            isBtnClicked: false,
            isBtnDisabled: false,
            type: 2
        }
    }

    handleChangeNum = e => this.setState({ number: e.target.value }, this.validateForm);

    handleChangeCode = e => this.setState({ code: e.target.value }, this.validateForm);

    validateForm = () => {
        const { number, code } = this.state;

        if (isEmpty(number) || isEmpty(code)) {
            return false;
        }

        return this.setState({ isBtnClicked: true });
    }

    handleSubmit = () => {
        const { number, code } = this.state;
        const reg = /^\d+/g;
        if (isEmpty(number) || isEmpty(code) || !reg.test(num) || !reg.test(code)) {
            return false;
        }


        return this.props.actions.login({ number, code }).then(res => {
            if (res.data.code == STATUS.OK) {
                history.push('/');
            } else {
                Message.info(res.data.msg)
            }
        }).catch(e => console.log(e));
    }

    handleGetCode = () => {
        const { number, isBtnDisabled, type } = this.state;

        if (isEmpty(number)) {
            Message.info("请输入手机号");
            return;
        }

        if (isBtnDisabled) {
            return;
        }

        // send code
        this.getCode(number, type);
        this.timeWait(120);

        this.setState({ isBtnDisabled: true });
    }

    getCode = (number, type) => this.props.actions.getCode({ number, type });

    timeWait = (time) => {
        const { key, isBtnDisabled } = this.state;

        setTimeout(() => {
            if (time >= 0) {
                this.setState({ key: time + "S" });
                time--;
                this.timeWait(time);
            } else {
                this.setState({ isBtnDisabled: false, key: "重新发送" });
            }
        }, 1000)
    }

    render() {
        const { isBtnClicked } = this.state;

        return (
            <div className="container">
                <div className="logo_container">
                    <span className="logo"></span>
                </div>
                <div className="login_key">登录</div>
                <form className="register_container">
                    <div className="login_form">
                        <div className="input">
                            <input
                                type="number"
                                value={this.state.number}
                                placeholder="请输入手机号"
                                onChange={this.handleChangeNum}
                            />
                        </div>
                        <div className="input">
                            <input type="number" value={this.state.code} placeholder="请输入验证码"
                                onChange={this.handleChangeCode} />
                            <button className="code_btn" type="button" onClick={this.handleGetCode} >{this.state.key}</button>
                        </div>
                        <button onClick={this.handleSubmit} className={this.state.isBtnClicked ? "no_submit" : "submit"} type="button">登录</button>
                    </div>
                </form>

                {/* <ul className="third_login">
                    <li></li>
                    <li></li>
                </ul>

                <div className="protocol_container">
                    登录即代表你已阅读并同意《用户协议与隐私条款》
                </div> */}
            </div>
        )
    }
}

function mapState(state) {
    return {
        user: state.user
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapState, mapDispatch)(Login)
