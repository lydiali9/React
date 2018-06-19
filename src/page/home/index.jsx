import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../main/actions.js'
import * as Actions from './actions.js'
import history from '../../redux/history.js'
import { isEmpty, isLogin } from '../../common/utils.js';
import { STATUS, SERVICE_TYPE } from '../../common/constant.js'
import './style.css'


class Home extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getUserInfo();
    this.props.actions.getBehavior();
  }

  handleRedirect = () => history.push(isLogin() ? '/setting' : '/login')

  renderMessage = messageList => {
    if (isEmpty(messageList)) {
      return null;
    }

    return (
      <div>
        <div className="title underline"><span className="vertical_line green"></span>最新消息</div>
        <div className="message">
          {
            messageList.map((item, index) => {
              let { name, service_id, keyword } = item;
              keyword = JSON.parse(keyword)
              switch (service_id) {

                case SERVICE_TYPE.ACTITITY: {
                  return (
                    <div className="item" key={index}>
                      <span className="round pink"></span>
                      <Link to={`/activity/${keyword.province}/${keyword.city}/${keyword.startDate}/${keyword.endDate}/${keyword.pageIndex}/${keyword.pageSize}`}>
                        <span className="right inline_block btn">查看详情</span>
                      </Link>
                    </div>
                  )
                };

                case SERVICE_TYPE.EXPRESS: {
                  return (
                    <div className="item" key={index}>
                      <span className="round yellow"></span>
                      <span className="msg">{name}</span>
                      <Link to={`/express/${keyword.num}`}>
                        <span className="right inline_block btn">查看详情</span>
                      </Link>
                    </div>
                  )
                };

                case SERVICE_TYPE.VIOLATION: {
                  <div className="item" key={index}>
                    <span className="round blue">{name}</span>
                    <Link to={`/violation/records/${keyword.plate_no}/${keyword.engine_no}/${keyword.VIN}/${keyword.vehicle_type}`}>
                      <span className="right inline_block btn">查看详情</span>
                    </Link>
                  </div>
                }

                default:
                  return null;
              }
            })
          }
        </div>
      </div>
    )
  }

  render() {
    const { headphoto = ``, nickname = '', _id = '' } = this.props.user;
    const _isLogin = isLogin()
    return (
      <div className="user_container">
        <div className="header" onClick={this.handleRedirect}>
          <div className={_isLogin ? "avatar" : "logout_avatar"} style={headphoto && _isLogin ? { background: `url(${headphoto})`, backgroundSize: 'contain' } : {}}></div>
          <div className="profile">
            {
              _isLogin ?
                <div>
                  <div className="name">{nickname}</div>
                  <div className="id">ID:{_id.substr(-8)}</div>
                </div>
                : <div className="name">未登录</div>
            }
          </div>
          <div className="right">
            <span className="expand"></span>
          </div>
        </div>

        {
          this.renderMessage(this.props.home.messageList)
        }
        <div className="title underline "><span className="vertical_line orange"></span>热门服务</div>
        <div className="service">
          <div className="box">
            <Link to="/express">
              <div className="icon express"></div>
              <div>查快递</div>
            </Link>
          </div>
          <div className="box">
            <Link to="/violation">
              <div className="icon vio"></div>
              <div>查违章</div>
            </Link>
          </div>
          <div className="box">
            <Link to="/activity">
              <div className="icon activity"></div>
              <div>查活动</div>
            </Link>
          </div>
          <div className="box">
            <a>
              <div className="icon await"></div>
              <div>敬请期待</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}


function mapState(state) {
  return {
    user: state.user,
    home: state.home
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators({
      ...Actions,
      ...userActions
    }, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Home)
