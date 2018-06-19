import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom';
import history from '../../redux/history.js'
import * as Actions from './actions'
import Car from './Car.jsx'
import ViolationRecords from './ViolationRecords.jsx'
import { isEmpty } from '../../common/utils';

class Violation extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.countCar()
    }

    handleAdd = () => history.push('/violation/car/add')

    handleUpdate = id => history.push(`/violation/car/update/${id}`)

    handleQueryRecord = params => history.push(`/violation/records/${params.plate_no}/${params.engine_no}/${params.VIN}/${params.vehicle_type}`)

    renderCarListElements = carList => {
        if (isEmpty(carList)) {
            return null;
        }

        return carList.map(item => (
            <div key={item.VIN}>
                <div className="title">
                    <span className="num">{item.plate_no}</span>
                    <span className="edit right" onClick={() => this.handleUpdate(item._id)}>编辑</span>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td className="underline">违章次数</td>
                            <td className="text-right underline">{item.total}次</td>
                        </tr>
                        <tr>
                            <td className="underline">罚款金额</td>
                            <td className="red text-right underline">{item.fine}元</td>
                        </tr>
                        <tr>
                            <td className="underline">扣分</td>
                            <td className="red text-right underline">{item.point}分</td>
                        </tr>
                        <tr className="blue" >
                            <td colSpan="2"><span onClick={() => this.handleQueryRecord(item)}>立即查询</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))
    }

    render() {
        const containerSyle = { padding: "0.417rem 0.417rem 0 0.417rem" }
        const { carList } = this.props.violation
        return (
            <div className="violation_container" style={containerSyle}>
                <div className="table-container">
                    {
                        this.renderCarListElements(carList)
                    }
                </div>
                <div className="content_box init">
                    <div className="center">
                        <div className="blue" onClick={this.handleAdd}><div className="add_icon"></div>添加车辆</div>
                        <div>{isEmpty(carList) ? `暂无车辆，请添加后查询！` : `急速查询，支持全国`}</div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapState(state) {
    return {
        violation: state.violation
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}
const connectCar = connect(mapState, mapDispatch)(Car)
const _Car = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}/add`} component={connectCar} />
        <Route exact path={`${match.url}/update/:id`} component={connectCar} />
    </Switch>
)

const _Violation = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}`} component={connect(mapState, mapDispatch)(Violation)} />
        <Route path={`${match.url}/records/:plate_no/:engine_no/:VIN/:vehicle_type`} component={connect(mapState, mapDispatch)(ViolationRecords)} />
        <Route path={`${match.url}/car`} component={_Car} />
    </Switch>
)


export default _Violation 