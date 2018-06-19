import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom';
import history from '../../redux/history.js'
import * as Actions from './actions'
import Message from '../../components/message/index.jsx'
import AreaSelect from '../../components/areaSelect/index.jsx'
import { classNames, isEmpty, isNotEmpty, formatDate } from '../../common/utils.js'
import './style.css'

const Loading = ({ show }) => (
    <div className="spinner" style={{ display: show ? "block" : "none" }}>
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
    </div>
);

const TIME_RANGE = [
    {
        value: "TODAY",
        text: "今天",
    },
    {
        value: "TOMORROW",
        text: "明天",
    },
    {
        value: "WEEK",
        text: "本周",
    },
    {
        value: "MONTH",
        text: "本月",
    }
]

class Activity extends React.PureComponent {
    constructor(props) {
        super(props);
        const { startDate, endDate } = this.getThisMonth();
        this.state = {
            isTimeSelectorShow: false,
            isAreaSelectorShow: false,
            activeTimeText: "全部活动",
            areaName: "广东省-深圳市",
            startDate,
            endDate,
            pageIndex: 1,
            isShowLoading: false
        }
    }
    componentDidMount() {
        const session = JSON.parse(sessionStorage.getItem("ACTIVITY_SESSION"));
        const { params } = this.props.match;
        if (isNotEmpty(session)) {
            const { list, pagecount, lastScrollTop, pageIndex, areaName, startDate, endDate } = session
            // not good
            this.props.activity.list = list;
            this.props.activity.pagecount = pagecount
            this.setState({ pageIndex, areaName, startDate, endDate, hasSession: true })
            setTimeout(() => { this.container.scrollTop = lastScrollTop }, 0)
        } else {
            this.props.actions.resetActitityList();
            if (isNotEmpty(params)) {
                const { startDate, endDate, pageIndex, pageSize, province, city } = params;
                this.setState({ startDate, endDate, pageIndex, pageSize, province, city }, this.queryActitity);
            } else {
                this.queryActitity();
            }
        }

        window.addEventListener("click", this.handleBlur, false)
        this.container.addEventListener('scroll', this.onScrollToBottom, false);
        this.importBaiduMapScript();
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.handleBlur, false);
        sessionStorage.removeItem("ACTIVITY_SESSION")
    }

    importBaiduMapScript = () => {
        const self = this;
        if (isEmpty(document.querySelector("#baidu_map")) && isEmpty(window.BMap)) {
            const script = document.createElement("script");
            script.id = "baidu_map"
            script.src = `http://api.map.baidu.com/getscript?v=2.0&ak=krP6kTQZyiYFo7OUwW535MKqeZnMZLLI&services=&t=${+new Date()}`;
            script.onload = script.onreadystatechange = function () {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                    script.onload = script.onreadystatechange = null;
                    self.getCurrentPosition();
                }
            };
            document.body.appendChild(script);
        } else {
            self.getCurrentPosition();
        }
    }

    getCurrentPosition = () => {
        const self = this;
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            const crd = pos.coords;
            const point = new BMap.Point(crd.longitude, crd.latitude);
            const gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                console.log(rs)
                const { province, city } = rs.addressComponents;
                self.setState({ areaName: `${province}-${city}` })
            });
        };

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    handleBlur = e => {
        try {
            if (e.target.className.includes("mask")) {
                this.setState({
                    isTimeSelectorShow: false,
                    isAreaSelectorShow: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    queryActitity = () => {
        const [province, city] = this.state.areaName.replace(/省|市|自治区|壮族|回族|维吾尔族|特别行政区/g, "").split("-");
        this.props.actions.queryActivity({
            src: "inveno",
            pageIndex: this.state.pageIndex,
            pageSize: 10,
            province,
            city,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        })
    }

    toggleTimeSelector = () => {
        this.setState({
            isTimeSelectorShow: !this.state.isTimeSelectorShow,
            isAreaSelectorShow: false
        })
    }

    toggleAreaSelector = () => {
        this.setState({
            isTimeSelectorShow: false,
            isAreaSelectorShow: !this.state.isAreaSelectorShow
        })
    }

    handleAreaChange = (areaName, isAreaSelectorShow) => this.setState({ areaName, isAreaSelectorShow }, () => {
        this.props.actions.resetActitityList();
        this.queryActitity();
    })

    handleSelectTime = (activeTimeValue, activeTimeText) => {
        const { startDate, endDate } = this.getDate(activeTimeValue);
        this.setState({ startDate, endDate, activeTimeText, isTimeSelectorShow: false }, () => {
            this.props.actions.resetActitityList();
            this.queryActitity()
        })
    }

    onScrollToBottom = () => {
        const { container } = this;
        const scrollTop = Math.ceil(container.scrollTop);
        const clientHeight = window.innerHeight;
        const scrollHeight = container.scrollHeight;
        this.setState({ isShowLoading: true })
        // 当距离底部toBottom距离，触发onScrollToBottom
        if (scrollTop + clientHeight + 15 >= scrollHeight) {
            const nextIndex = this.state.pageIndex + 1;
            if (nextIndex >= this.props.activity.pagecount) {
                this.setState({ isShowLoading: false })
            }
            if (nextIndex <= this.props.activity.pagecount && !this.props.activity.loading) {
                this.setState({ pageIndex: nextIndex }, this.queryActitity)
            }
        }

        this.lastScrollTop = scrollTop;
    }

    handleUrlChange = url => {
        const activity = {
            list: this.props.activity.list,
            lastScrollTop: this.lastScrollTop,
            pageIndex: this.state.pageIndex,
            areaName: this.state.areaName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            pagecount: this.props.activity.pagecount
        }
        sessionStorage.setItem("ACTIVITY_SESSION", JSON.stringify(activity))
        location.href = url
    }

    getDate = dateType => {
        switch (dateType) {
            case "TODAY":
                const today = this.getToday();
                return { startDate: today, endDate: today }
            case "TOMORROW":
                const tomorrow = this.getTomorrow();
                return { startDate: tomorrow, endDate: tomorrow }
            case "WEEK": {
                const { startDate, endDate } = this.getThisWeek()
                return { startDate, endDate }
            }
            case "MONTH": {
                const { startDate, endDate } = this.getThisMonth();
                return { startDate, endDate }
            }
            default: {
                const { startDate, endDate } = this.getThisMonth();
                return { startDate, endDate }
            }
        }
    }

    getToday = () => formatDate(new Date())

    getTomorrow = () => {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        return formatDate(date)
    }

    getThisWeek = () => {
        const date = new Date();
        const num = date.getDay() - 1;
        date.setDate(date.getDate() - num);
        const startDate = formatDate(date);
        date.setDate(date.getDate() + 6);
        const endDate = formatDate(date);
        return { startDate, endDate }
    }

    getThisMonth = () => {
        const date = new Date();
        date.setDate(1);
        const startDate = formatDate(date)
        date.setMonth(date.getMonth() + 1);
        date.setDate(date.getDate() - 1);
        const endDate = formatDate(date);
        return { startDate, endDate }
    }


    renderTimeSelectorElements = activeTimeValue => {
        return TIME_RANGE.map(item => {
            const isActive = item.value === activeTimeValue;
            let activeClass = "", checkClass = "";
            if (isActive) {
                activeClass = "active";
                checkClass = "check";
            }
            return (
                <li
                    key={item.value}
                    className={activeClass}
                    onClick={() => this.handleSelectTime(item.value, item.text)}
                >
                    {item.text}<span className={checkClass}></span>
                </li>
            )

        })
    }

    renderActivityListElements = activityList => {
        if (isEmpty(activityList)) {
            return null;
        }
        return (
            activityList.map((item, index) => {
                let { id, title, startdate, enddate, logo, url, city, province } = item;
                if (isEmpty(window.WebKitAnimationEvent)) {
                    if (title.length > 30) {
                        title = `${title.substr(0, 25)}...`
                    }
                }
                return (
                    <li key={id}>
                        <a className="activity_item clear" onClick={() => this.handleUrlChange(url)} target="_self">
                            <div className="left">
                                <img className="activity_logo" src={logo} alt="logo" />
                            </div>
                            <div className="activity_detail">
                                <div className="activity_title">{title}</div>
                                <div className="activity_address">
                                    <div className="bottom">{`${province} ${city}`}</div>
                                    <div><span className="active"> </span>{`${formatDate(new Date(startdate), "MM/dd hh:mm")} — ${formatDate(new Date(enddate), "MM/dd hh:mm")}`}</div>
                                </div>
                            </div>
                        </a>
                    </li>
                )
            })
        )
    }

    render() {

        const { isTimeSelectorShow, isAreaSelectorShow, activeTimeValue, areaName, activeTimeText } = this.state;
        const timeTriangleClass = isTimeSelectorShow ? "triangle_up" : "triangle_down";
        const areaTriangleClass = isAreaSelectorShow ? "triangle_up" : "triangle_down";
        const maskStyle = { display: (isTimeSelectorShow || isAreaSelectorShow) ? "block" : "none" }
        const { loading, list } = this.props.activity;
        return (
            <div className={classNames({ "activity_container": true, "no_result_bg": isEmpty(list) && !loading })} ref={element => this.container = element}>
                <div className="mask" style={maskStyle}></div>
                <div className="fixed_box">
                    <div className="ranage_select" onClick={this.toggleTimeSelector}>
                        <span className="selected ">{activeTimeText}</span>
                        <span className={timeTriangleClass}></span>
                    </div>
                    <div className="ranage_select" onClick={this.toggleAreaSelector}>
                        <span className="selected ">{areaName}</span>
                        <span className={areaTriangleClass}></span>
                    </div>
                    <div className={classNames({ selector_container: true, hidden: !this.state.isTimeSelectorShow })}>
                        <ul className="area_ul">
                            {
                                this.renderTimeSelectorElements(activeTimeValue)
                            }
                        </ul>
                    </div>
                    <AreaSelect
                        show={this.state.isAreaSelectorShow}
                        areaName={this.state.areaName}
                        onChange={this.handleAreaChange}
                    />
                </div>
                <div className="activity_list">
                    <ul>
                        {
                            this.renderActivityListElements(list)
                        }
                    </ul>
                </div>
                <Loading show={this.state.isShowLoading} />
                <div className={classNames({ "tips_box": true, hidden: isNotEmpty(list) || loading })}>
                    <div className="big_tips">查询暂无结果</div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        activity: state.activity
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

const connectActivity = connect(mapState, mapDispatch)(Activity)


const _Activity = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}`} component={connectActivity} />
        <Route path={`${match.url}/:province/:city/:startDate/:endDate/:pageIndex/:pageSize`} component={connectActivity} />
    </Switch>
)

export default _Activity

