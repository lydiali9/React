import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import Loader from '../../components/loader/index.jsx'
import Modal from '../../components/modal/index.jsx'
import Message from '../../components/message/index.jsx'
import { classNames, isEmpty, formatDate, isNotEmpty, isSupportStorage } from '../../common/utils.js'
import { INV_UID, INV_X_ACCESS_TOKEN } from '../../common/constant.js'
import './style.less'

const SEX_TYPE = [
    {
        value: "1",
        name: "男"
    },
    {
        value: "2",
        name: "女"
    }
]
class Setting extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            headphoto: "",
            nickname: "user",
            id: "",
            sex: "待填写",
            age: "待填写",
            number: "未绑定",
            loading: false,
            isSexSelectShow: false,
            isNickNameModalVisable: false,
            isAgeModalVisable: false
        }
    }

    componentDidMount = () => {
        this.props.actions.getUserInfo()
            .then(this.successHandler)
            .catch(error => {
                console.log("Failed to get user info");
            });
    }

    handleLogout = () => {
        if (isSupportStorage) {
            localStorage.removeItem(INV_UID);
            localStorage.removeItem(INV_X_ACCESS_TOKEN)
        }
    }

    updateUserInfo = (otherParams = {}) => {
        this.props.actions.updateUserInfo({
            headphoto: this.state.headphoto,
            nickname: this.state.nickname,
            sex: this.state.sex,
            age: this.state.age,
            ...otherParams
        }).then(this.successHandler).catch(e => console.log(e))
    }

    successHandler = res => {
        if (res.data.code == 200) {
            let result = res.data.content;
            this.setState({
                headphoto: result.headphoto,
                nickname: result.nickname,
                id: result._id,
                sex: result.sex,
                age: result.age,
                number: result.number,
                loading: false
            })
        }
    }

    handleAvatarUpload = () => {

    }

    handleEditName = () => {
        this.setState({ isNickNameModalVisable: true }, () => this.nickNameInput.focus());
        this.nickNameInput.value = this.state.nickname;
    }

    handleEditSex = () => this.setState({ isSexSelectShow: true })

    handleEditAge = () => {
        this.setState({ isAgeModalVisable: true }, () => this.ageInput.focus())
        this.ageInput.value = this.state.age;
    }

    handleNickNameOk = () => {
        let { value } = this.nickNameInput;
        if (isEmpty(value)) {
            Message.info("昵称不允许为空")
            return;
        }
        if (value.length > 15) {
            Message.info("昵称长度超过15个字")
            return;
        }

        this.setState({ isNickNameModalVisable: false, nickname: value }, this.updateUserInfo)
    }

    handleAgeOk = () => {
        const { value } = this.ageInput;
        if (!/^\d+$/.test(value)) {
            Message.info("请输入整数");
            return;
        }
        if (value < 13 || value > 80) {
            Message.info("输入范围13-80");
            return;
        }

        this.setState({ isAgeModalVisable: false, age: value }, this.updateUserInfo)
    }

    handleSexOk = sex => this.setState({ sex, isSexSelectShow: false }, this.updateUserInfo)

    renderSexList = () => {
        const { sex } = this.state;
        return SEX_TYPE.map(item => {
            let activeClass = "", checkClass = "";
            if (item.value == sex) {
                activeClass = "active";
                checkClass = "check"
            }
            return (
                <li
                    key={item.value}
                    className={activeClass}
                    onClick={() => this.handleSexOk(item.value)}
                >
                    {item.name}<span className={checkClass}></span>
                </li>
            )
        })
    }

    render() {
        let { headphoto, nickname, id, sex, age = "待填写", number = "未绑定", loading, isSexSelectShow, isNickNameModalVisable, isAgeModalVisable } = this.state;
        const avatarStyle = headphoto ? { background: `url(${headphoto})`, backgroundSize: 'contain' } : {}
        const noBorder = { border: "none" };
        const findSex = SEX_TYPE.find(item => item.value == sex)
        sex = findSex && findSex.name || "待填写";

        return (
            <div className="setting_container">
                <div className="mask" style={{ display: isSexSelectShow ? "block" : "none" }} onClick={() => this.setState({ isSexSelectShow: false })} />
                <div className="setting_space"></div>
                <form className="setting_form">
                    <div className="setting">
                        <ul>
                            <li>头像</li>
                            <li>
                                <div className="avatar" style={avatarStyle} onClick={e => this.avatarFileInput.click()}></div>
                                <input type="file" accept="image/*" className="avatar_input" onChange={this.handleAvatarUpload} ref={element => this.avatarFileInput = element} />
                            </li>
                        </ul>
                        <ul>
                            <li>昵称</li>
                            <li>
                                <span>{nickname}</span>
                                <span onClick={this.handleEditName}>></span>
                            </li>
                        </ul>
                        <ul>
                            <li>用户ID</li>
                            <li>{id.substr(-8)}</li>
                        </ul>
                        <ul>
                            <li>性别</li>
                            <li>
                                <span>{sex}</span>
                                <span onClick={this.handleEditSex}>></span>
                            </li>
                        </ul>
                        <ul>
                            <li style={noBorder}>年龄</li>
                            <li style={noBorder}>
                                <span>{age}</span>
                                <span onClick={this.handleEditAge}>></span>
                            </li>
                        </ul>
                        <ul className="info-item" onClick={() => location.href = "http://h5.inveno.com/pro.html"}>
                            <li style={noBorder}>关于我们</li>
                            <li style={noBorder}>></li>
                        </ul>
                    </div>
                </form>
                <div className="exit">
                    <button className="button danger" onClick={this.handleLogout}>退出登录</button>
                </div>
                <Loader done={!loading} />
                <div className={classNames({ "fixed_box": true, hidden: !isSexSelectShow })} >
                    <div className={classNames({ ranage_select: true })} style={{ color: "#9fa3a8" }} >
                        <span className="selected">性别选择</span>
                    </div>
                    <div className="selector_container">
                        <ul className="area_ul">
                            {
                                this.renderSexList()
                            }
                        </ul>
                    </div>
                </div>
                <Modal
                    key="nickname"
                    visible={isNickNameModalVisable}
                    title="修改昵称"
                    onCancel={() => this.setState({ isNickNameModalVisable: false })}
                    onOK={this.handleNickNameOk}

                >
                    <div style={{ position: "relative" }}>
                        <input ref={element => this.nickNameInput = element} className="nickname_input" placeholder="支持中文和英文" maxLength="15" />
                        <span className="inline_block close" onClick={() => this.nickNameInput.value = ""}></span>
                    </div>
                </Modal>
                <Modal
                    key="age"
                    visible={isAgeModalVisable}
                    title="修改年龄"
                    onCancel={() => this.setState({ isAgeModalVisable: false })}
                    onOK={this.handleAgeOk}

                >
                    <div style={{ position: "relative" }}>
                        <input ref={element => this.ageInput = element} className="nickname_input" placeholder="请输入年龄" maxLength="2" type="number" />
                        <span className="inline_block close" onClick={() => this.ageInput.value = ""}></span>
                    </div>
                </Modal>
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

export default connect(mapState, mapDispatch)(Setting)
