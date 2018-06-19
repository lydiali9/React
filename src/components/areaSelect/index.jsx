import React from 'react'
import { classNames, isEmpty, isNotEmpty } from '../../common/utils.js'
import http from '../../common/http.js'
import './style.css'

//直辖市
const municipality = {
    //北京
    "北京市": [110100],
    //天津
    "天津市": [120100],
    //上海
    "上海市": [310100],
    //重庆
    "重庆市": [500100, 500200]
}

export default class AreaSelect extends React.Component {
    static defaultProps = {
        onChange: function () { },
        areaName: "广东-深圳",
        data: {},
        show: false
    };

    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0,
            isSelectorShow: true
        }
    }

    componentDidMount() {
        http.get('/api/area/query').then(res => {
            if (res.data.code == 200) {
                this.setState({ data: res.data.content })
            }
        }).catch(e => console.log(e))
    }

    switchTab = activeTabIndex => {
        this.setState({
            activeTabIndex,
            isSelectorShow: activeTabIndex === this.state.activeTabIndex
                ? !this.state.isSelectorShow : true
        })
    }

    handleSelectProvince = provinceName => {
        this.setState({ activeTabIndex: 1, isSelectorShow: true });
        this.props.onChange(`${provinceName}-`, true)
    }

    handleSelectCity = cityName => {
        this.setState({ activeTabIndex: 1, isSelectorShow: false })
        this.props.onChange(`${this.props.areaName.split("-")[0]}-${cityName}`, false)
    }


    getElements = () => {
        if (isEmpty(this.state.data)) {
            return null;
        }
        switch (this.state.activeTabIndex) {
            //省 (直辖市)
            case 0:
                return this.getProvince();
            //市 （直辖市区）
            case 1:
                return this.getCity();
            default:
                return null;
        }
    }

    getProvince = () => {
        const { data } = this.state;
        const provinceObject = data["86"];
        const provinceList = Object.keys(provinceObject);
        const _province = this.props.areaName.split("-")[0];
        return provinceList.map(provinceCode => {
            const provinceName = provinceObject[provinceCode];
            let activeClass = "", checkClass = "";
            if (isNotEmpty(_province) && provinceName.includes(_province)) {
                activeClass = "active";
                checkClass = "check"
            }
            return (
                <li
                    key={provinceCode}
                    className={activeClass}
                    onClick={() => this.handleSelectProvince(provinceName)}
                >
                    {provinceName}<span className={checkClass}></span>
                </li>
            )
        });
    }

    getCity = () => {
        const { data } = this.state;
        const [province = "", city = ""] = this.props.areaName.split("-");
        let cityObject = {};
        //直辖市
        if (this.isMunicipality(province)) {
            const key = Object.keys(municipality).find(item => item.includes(province))
            municipality[key].forEach(code => Object.assign(cityObject, data[code]))
        } else {
            cityObject = data[Object.keys(data["86"]).find(item => data["86"][item].includes(province))]
        }
        const _current = this.state.cityCode;
        const cityList = Object.keys(cityObject);
        return cityList.map(cityCode => {
            const cityName = cityObject[cityCode]
            let activeClass = "", checkClass = "";
            if (isNotEmpty(city) && cityName.includes(city)) {
                activeClass = "active";
                checkClass = "check"
            }
            return (
                <li
                    key={cityCode}
                    className={activeClass}
                    onClick={() => this.handleSelectCity(cityName)}
                >
                    {cityName}<span className={checkClass}></span>
                </li>
            )
        });
    }

    isMunicipality = province => Object.keys(municipality).includes(province)

    render() {
        let [province = "请选择省份", city] = this.props.areaName.split("-");
        if (isEmpty(city)) {
            city = this.isMunicipality(province) ? `请选择地区` : `请选择城市`
        }
        const { activeTabIndex, isSelectorShow } = this.state;
        return (
            <div className={classNames({ selector_container: true, hidden: !this.props.show })}>
                <div className="underlime">
                    <div className={classNames({ area_column: true, active: activeTabIndex === 0 })} onClick={() => this.switchTab(0)}>{province}</div>
                    <div className={classNames({ area_column: true, active: activeTabIndex === 1, hidden: isEmpty(province) })} onClick={() => this.switchTab(1)}>{city}</div>
                </div>
                <div className={classNames({ area_ul_container: true, hidden: !isSelectorShow })}>
                    <ul className="area_ul">
                        {
                            this.getElements()
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

