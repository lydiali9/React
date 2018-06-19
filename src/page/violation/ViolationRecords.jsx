import React from 'react';
import Loader from '../../components/loader/index.jsx'
import { isEmpty, classNames } from '../../common/utils.js'
import './style.css'

export default class ViolationRecords extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { plate_no, engine_no, VIN, vehicle_type } = this.props.match.params;
        this.props.actions.queryViolationRecords({ plate_no, engine_no, VIN, vehicle_type })
    }

    render() {
        const { recordList,loading } = this.props.violation;
        const { plate_no } = this.props.match.params;
        return (
            <div className={classNames({"violation_container": true, "no_result_bg": isEmpty(recordList) && !loading})} >
                <ul>
                    {
                        recordList.map(item => {
                            return (
                                <li className="violation_records" key={item.violationCode}>
                                    <div>
                                        <div className="title">
                                            <span className="car_num">{plate_no}</span>
                                            <span className="time right">{item.occTime}</span>
                                        </div>
                                        <div className="detail">
                                            <div className="position">{item.address}</div>
                                            <div className="desc">{item.reason}</div>
                                            <div className="code">
                                                <span>违章代码：</span>
                                                <span className="blue right">{item.violationCode}</span>
                                            </div>
                                        </div>
                                        <div className="foot">
                                            <span className="icon money"></span>
                                            <span className="text">{item.fine}</span>
                                            <span className="icon fen"></span>
                                            <span className="text">{item.point}分</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={classNames({ "tips_box": true, hidden: !isEmpty(recordList) || loading })}>
                    <div className="big_tips">暂无违章信息</div>
                    <div className="small_tips">继续保持，暂无违章记录哦！</div>
                </div>
                <Loader done={!loading} />
            </div>
        )
    }
}