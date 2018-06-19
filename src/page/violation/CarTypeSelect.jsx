import React from 'react'
import { CAR_TYPE } from '../../common/constant'
import { classNames } from '../../common/utils.js'

export default class CarTypeSelect extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleSelectType = vehicleType => this.props.onChange({ vehicleType, isCarSelectShow: false })

    renderList = () => {
        const { type } = this.props;
        return CAR_TYPE.map(item => {
            let activeClass = "", checkClass = "";
            if (item.value == type) {
                activeClass = "active";
                checkClass = "check"
            }
            return (
                <li
                    key={item.value}
                    className={activeClass}
                    onClick={() => this.handleSelectType(item.value)}
                >
                    {item.text}<span className={checkClass}></span>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classNames({ "fixed_box": true, hidden: !this.props.show })} >
                <div className={classNames({ ranage_select: true })} style={{ color: "#9fa3a8" }} >
                    <span className="selected">请选择车辆类型</span>
                </div>
                <div className="selector_container">
                    <ul className="area_ul">
                        {
                            this.renderList()
                        }
                    </ul>
                </div>
            </div>
        )
    }
}