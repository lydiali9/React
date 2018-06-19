import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom';
import * as Actions from './actions'
import Loader from '../../components/loader/index.jsx'
import { EXPRESS_HISTORY } from '../../common/constant'
import { classNames, isEmpty, formatDate, isSupportStorage, isNotEmpty } from '../../common/utils'
import './style.css'

class Express extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            num: "",
            isShowHistory: false,
            isBtnClicked: false
        }
    }

    componentDidMount() {
        const { num } = this.props.match.params;
        if (isNotEmpty(num)) {
            this.setState({ num });
            this.queryExpress(num)
        }
        this.searchInput.addEventListener("keydown", this.handleEnter, false);
    }


    componentWillUnmount() {
        this.searchInput.removeEventListener("keydown", this.handleEnter, false);
    }

    handleEnter = e => {
        if (e.keyCode === 13 && isNotEmpty(this.state.num)) {
            this.queryExpress(this.state.num)
            this.handleClose();
        }
    }
    handleChange = e => this.setState({ num: e.target.value })

    handleFocus = () => this.setState({ isShowHistory: true })

    handleQuery = () => {
        const { num } = this.state;
        if (isEmpty(num)) {
            return;
        }
        this.setState({ isBtnClicked: true })
        this.handleClose();
        this.queryExpress(num)
    }

    handleHistoryClick = num => {
        this.setState({ num, isShowHistory: false, isBtnClicked: true });
        this.queryExpress(num);
    }

    handleClear = () => {
        this.handleClose();
        isSupportStorage && localStorage.removeItem(EXPRESS_HISTORY);
    }

    handleClose = () => this.setState({ isShowHistory: false })

    queryExpress = num => this.props.actions.queryExpress({ num })

    renderDetails = detailList => {
        if (isEmpty(detailList)) {
            return null;
        }
        const { length } = detailList;
        return detailList.map((item, index) => {
            const { time, desc } = item;
            const [_date, _time] = formatDate(new Date(+time * 1000), "yyyy-MM-dd hh:mm").split(/\s+/);
            const isLastItem = index === length - 1;
            const isFirstItem = index === 0;
            const lineClass = isFirstItem ? "down" : (isLastItem ? "up" : "complete");
            const descMatchResult = desc.match(/(1\d{10})[^\d]*$/);
            const hasNumber = descMatchResult != null;
            let partOne = "", partTwo = "", partThree = "";
            if (hasNumber) {
                partOne = desc.substring(0, descMatchResult.index);
                partTwo = descMatchResult[1];
                partThree = desc.substring(descMatchResult.index + 11);
            }
            return (
                <tr key={index}>
                    <td className="row">
                        <span className="time">{_time}</span>
                        <span className="date">{_date}</span>
                    </td>
                    <td className="status">
                        <div className={`line ${lineClass}`}></div>
                        <div className={`circle ${isFirstItem ? `active` : ``}`}></div>
                    </td>
                    <td className="context">
                        {
                            hasNumber
                                ? <span className={`message ${isFirstItem ? `active` : ``}`}>
                                    <span>{partOne}</span>
                                    <span><a className="telephone_num" href={`tel:${partTwo}`}>{partTwo}</a></span>
                                    <span>{partThree}</span>
                                </span>
                                : <span className={`message ${isFirstItem ? `active` : ``}`}>{desc}</span>
                        }

                    </td>
                </tr>
            )

        })
    }

    renderExpressHistory = historyList => {
        if (isEmpty(historyList)) {
            return null;
        }
        const { num } = this.state;
        let elements = [];
        //只显示前五条记录
        elements = historyList.slice(0, 5).filter(item => item.number.includes(num)).map((item, index) => {
            return (
                <li key={item.number} onClick={() => this.handleHistoryClick(item.number)}>
                    <span className="left">{item.number}</span><span className="right">{item.company}</span>
                </li>
            )
        })
        let lastElement = (
            <li key="clear" className="clear">
                <span className="left" onClick={this.handleClear}>清除历史记录</span>
                <span className="right" onClick={this.handleClose}>关闭</span>
            </li>
        )
        elements.push(lastElement)
        return elements;
    }

    render() {
        const { icon, company, tel, context, loading, msg } = this.props.express;
        const historyList = isSupportStorage && JSON.parse(localStorage.getItem(EXPRESS_HISTORY)) || [];
        const { isBtnClicked, isShowHistory } = this.state;
        const scrollHeight = window.innerHeight - ((414 / 1080) * (520) / 41.4) * parseFloat(document.querySelector("html").style["fontSize"], 10);
        return (
            <div style={{ height: "100%" }}>
                <div className={classNames({ "express_background": !isBtnClicked, "no_result_bg": isBtnClicked && isEmpty(context) && !loading })} style={{ minHeight: "100%" }}>
                    <div className="express_container">
                        <div className="express_search_container">
                            <span className="express_search_input_wrapper">
                                <input
                                    type="number"
                                    className="express_search_input"
                                    placeholder="请输入快递单号"
                                    ref={element => this.searchInput = element}
                                    value={this.state.num}
                                    onChange={this.handleChange}
                                    onFocus={this.handleFocus}
                                />
                                <span className="express_search_input_suffix">
                                    <button type="button" className="express_search_button" onClick={this.handleQuery}>查询</button>
                                </span>
                            </span>
                            <div className={classNames({ express_search_history: true, hidden: isShowHistory ? isEmpty(historyList) : true })}>
                                <ul>
                                    {
                                        this.renderExpressHistory(historyList)
                                    }
                                </ul>
                            </div>

                        </div>
                        <div className={classNames({ dividie_line: true, hidden: isEmpty(context) })}></div>
                        <div className={classNames({ express_detail: true, hidden: isEmpty(context) })}>
                            <div className="company">
                                <div className="inline_block">
                                    <img className="logo" src={icon} />
                                </div>
                                <div className="msg">
                                    <div className="name">{company}</div>
                                    <div className="des">物流信息已同步官网实时更新</div>
                                </div>
                                <div className="right "><a className="telephone_num" href={`tel:${tel}`}>{tel}</a></div>
                            </div>
                            <div className="items" style={{ height: scrollHeight }}>
                                <table>
                                    <tbody>
                                        {
                                            this.renderDetails(context)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames({ "tips_box": true, hidden: !(isBtnClicked && isEmpty(context)) || loading })}>
                    <div className="big_tips">查询暂无结果</div>
                    <div className="small_tips">{msg}</div>
                </div>
                <Loader done={!loading} />
            </div>
        )
    }
}

function mapState(state) {
    return {
        express: state.express
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

const connectExpress = connect(mapState, mapDispatch)(Express);

const _Express = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}`} component={connectExpress} />
        <Route path={`${match.url}/:num`} component={connectExpress} />
    </Switch>
)

export default _Express