import React from 'react'
import history from '../../redux/history.js'
import './style.css'
export default class Offline extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        window.addEventListener('online', this.handleOnlineStatus);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleOnlineStatus);
    }

    handleOnlineStatus = e => history.go(-1)

    render() {
        return (
            <div style={{ minHeight: "100%", position: "releative" }}>
                <div className="network_error_box">
                    <div className="network_error_img"></div>
                </div>
                <div className="tips_box">
                    <div className="big_tips">网络异常</div>
                    <div className="small_tips">请检查您的网络，刷新页面重试</div>
                </div>
            </div>
        )
    }
}