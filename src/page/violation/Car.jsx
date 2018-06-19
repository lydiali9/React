import React from 'react'
import history from '../../redux/history.js'
import LicenseSelect from './LicenseSelect.jsx';
import { classNames, isEmpty } from '../../common/utils'
import Message from '../../components/message/index.jsx'
import CarTypeSelect from './CarTypeSelect.jsx'
import { CAR_TYPE } from '../../common/constant'

export default class Car extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            numberPrefix: "京·A",
            isSelectShow: false,
            isCarSelectShow: false,
            vehicleType: "02",
            isEngineImgShow: false,
            isVINImgShow: false
        }
    }

    componentDidMount() {
        if (this.isUpdate()) {
            this.props.actions.queryCar({
                id: this.props.match.params.id
            }).then(res => {
                if (res.data.code == 200) {
                    const { content } = res.data;
                    const numberPrefix = content.plate_no.substr(0, 2).split("").join('·')
                    this.setState({ numberPrefix, vehicleType: content.vehicle_type })
                    this.numInput.value = content.plate_no.substr(2)
                    this.engineInput.value = content.engine_no;
                    this.vinInput.value = content.VIN
                } else {

                }
            }).catch(e => console.log(e))
        }
    }

    onChange = (newState, needFocus) => {
        this.setState(newState)
        needFocus && this.numInput.focus();
    }

    onClick = () => this.setState({ isSelectShow: true })

    handleSelectType = () => this.setState({ isCarSelectShow: true })

    handleUpdate = () => {
        const { isOk, msg } = this.verify();
        if (!isOk) {
            Message.info(msg)
            return;
        }
        this.props.actions.updateCar({
            id: this.props.match.params.id,
            vehicle_type: this.state.vehicleType,
            plate_no: `${this.state.numberPrefix.replace(/·/g, "")}${this.numInput.value}`,
            VIN: this.vinInput.value,
            engine_no: this.engineInput.value
        }).then(res => {
            if (res.data.code == 200) {
                history.push("/violation");
            } else {
                Message.info(res.data.msg)
            }
        }).catch(e => console.log(e))
    }

    handleDelete = () => {
        this.props.actions.deleteCar({
            id: this.props.match.params.id
        }).then(res => {
            if (res.data.code == 200) {
                history.push("/violation");
            } else {
                Message.info(res.data.msg)
            }
        }).catch(e => console.log(e))
    }

    handleAdd = () => {
        const { isOk, msg } = this.verify();
        if (!isOk) {
            Message.info(msg);
            return;
        }
        this.props.actions.addCar({
            vehicle_type: this.state.vehicleType,
            plate_no: `${this.state.numberPrefix.replace(/·/g, "")}${this.numInput.value}`,
            engine_no: this.engineInput.value,
            VIN: this.vinInput.value
        }).then(res => {
            if (res.data.code == 200) {
                history.push("/violation");
            } else {

            }
        }).catch(e => console.log(e))
    }

    isUpdate = () => this.props.match.url.includes("update")

    verify = () => {
        //not good
        if (isEmpty(this.state.vehicleType)) {
            return {
                msg: '请选择车辆类型',
                isOk: false
            }
        }

        if (isEmpty(this.state.numberPrefix)) {
            return {
                msg: '请选择车辆所属地区',
                isOk: false
            }
        }

        if (isEmpty(this.numInput.value)) {
            return {
                msg: '请输入车牌号',
                isOk: false
            }
        }

        if (!/^[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$|^[0-9]{5}[DF]$|^[DF][A-HJ-NP-Z0-9][0-9]{4}$/.test(this.numInput.value)) {
            return {
                msg: '车牌号格式错误',
                isOk: false
            }
        }

        if (isEmpty(this.vinInput.value)) {
            return {
                msg: '请输入后六位车架号',
                isOk: false
            }
        }

        if (isEmpty(this.engineInput.value)) {
            return {
                msg: '请输入后六位发动机号',
                isOk: false
            }
        }

        return { isOk: true }
    }

    renderButtons = () => {
        if (this.isUpdate()) {
            return (
                <div>
                    <button className="button primary" onClick={this.handleUpdate}>确认修改</button>
                    <button className="button danger" onClick={this.handleDelete}>删除车辆</button>
                </div>
            )
        } else {
            return <button className="button primary" onClick={this.handleAdd}>确认添加</button>
        }
    }

    render() {
        const isUpdate = this.isUpdate();
        const { vehicleType, isCarSelectShow, isSelectShow, numberPrefix, isEngineImgShow, isVINImgShow } = this.state;
        const result = CAR_TYPE.find(item => item.value === vehicleType) || {};
        const carTypeName = result.text || "";
        //新能源汽车
        const isNewEnergy = ["51", "52"].includes(String(vehicleType));
        const licenseDisplay = { display: isEngineImgShow || isVINImgShow ? "block" : "none" }
        return (
            <div className="violation_container">
                <div className="mask" style={{ display: isSelectShow || isCarSelectShow ? "block" : "none" }} onClick={()=>this.setState({isCarSelectShow:false,isSelectShow:false})}></div>
                <div className="mask" style={licenseDisplay} onClick={() => this.setState({ isEngineImgShow: false, isVINImgShow: false })}></div>
                <div className={classNames({ "license_img": true, "engine": isEngineImgShow, "vin": isVINImgShow})} style={licenseDisplay} onClick={() => this.setState({ isEngineImgShow: false, isVINImgShow: false })}></div>
                <div className="violation_car">
                    <div className={classNames({ title: true, edit: isUpdate })}>
                        <div className={isUpdate ? "underline" : ""} style={{ height: " 2.778rem" }}>
                            <div className="box">
                                <div className="big">{isUpdate ? `修改` : `添加`}车辆</div>
                                <div className="small">请按照行驶证填写正确信息</div>
                            </div>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr className="detail">
                                <td>
                                    <span className="attr">车辆类型</span>
                                </td>
                                <td className="row">
                                    <div className="underline" onClick={this.handleSelectType}>{carTypeName}<span className="right expand" style={{ transform: isCarSelectShow ? "rotate(90deg)" : "rotate(0deg)" }}></span></div>
                                </td>
                            </tr>
                            <tr className="detail">
                                <td>
                                    <span className="attr">车辆号码</span>
                                </td>
                                <td className="row">
                                    <div className="num">
                                        <span className={classNames({ "area": true, "green": isNewEnergy })} onClick={this.onClick}>{numberPrefix} <span className="down"></span></span>
                                        <input
                                            ref={element => this.numInput = element}
                                            type="number"
                                            placeholder="车牌号"
                                            className={classNames({ "car_num_input": true, "green": isNewEnergy })}
                                            maxLength={isNewEnergy ? "6" : "5"}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr className="detail">
                                <td>
                                    <span className="attr">车架号码</span>
                                </td>
                                <td className="row">
                                    <div style={{ position: "relative" }}>
                                        <input type="number" placeholder="请输入后六位车架号" maxLength="6" ref={element => this.vinInput = element} />
                                        <span className="tips" onClick={() => this.setState({ isVINImgShow: true })}></span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="detail">
                                <td>
                                    <span className="attr">发动机号</span>
                                </td>
                                <td  className="row">
                                    <div style={{ position: "relative" }}>
                                        <input type="number" placeholder="请输入后六位发动机号" maxLength="6" ref={element => this.engineInput = element} />
                                        <span className="tips" onClick={() => this.setState({ isEngineImgShow: true })}></span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {
                        this.renderButtons()
                    }
                    <CarTypeSelect show={isCarSelectShow} onChange={this.onChange} type={vehicleType} />
                    <LicenseSelect show={isSelectShow} onChange={this.onChange} numberPrefix={numberPrefix} />
                </div>
            </div>
        )
    }
}