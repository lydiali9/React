import React from 'react'
import { classNames, isEmpty } from '../../common/utils.js'
import './style.less'

export default class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            password: "",
            code: "",
            isBtnClicked: false
        }
    }

    handleChangeNum = e => {
        this.setState({ number: e.target.value });
        this.validateForm();
    }

    handleChangeCode = e => {
        this.setState({ code: e.target.value });
        this.validateForm();
    }

    handleChangePwd = e => {
        this.setState({ password: e.target.value });
        this.validateForm();
    }

    validateForm = () => {
        const { number, code, password } = this.state;

        if(isEmpty(number) || isEmpty(code) || isEmpty(password)) {
            return false;
        }

        return this.setState({ isBtnClicked: true });
    }

    render() {
        const { isBtnClicked } = this.state;

        return (
            <div>
                <form className="register_container">
                    <div className="login_form">
                        <div className="input">
                            <input type="text" value={this.state.number} placeholder="请输入手机号" 
                                onChange={this.handleChangeNum}/>
                        </div>
                        <div className="input">
                            <input type="text" value={this.state.code} placeholder="请输入验证码" 
                                onChange={this.handleChangeCode}/>
                            <button className="code_btn" type="button">获取验证码</button>
                        </div>
                        <div className="input">
                            <input type="text" value={this.state.password} placeholder="请设置登录密码" 
                                onChange={this.handleChangePwd}/>
                        </div>
                        <button onClick={this.handleSubmit} className={ this.state.isBtnClicked ? "no_submit" : "submit" } type="button">登录</button>
                    </div>
                </form>
            </div>
        )
    }
}