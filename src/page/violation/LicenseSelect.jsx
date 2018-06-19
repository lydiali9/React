import React from 'react'
import { letters, provinces } from '../../common/constant'
import { classNames, isNotEmpty } from '../../common/utils.js'

export default class LicenseSelect extends React.PureComponent {
    static defaultProps = {
        show: false,
        onChange: function () { },
        numberPrefix: ""
    }
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0
        }
    }

    swithTab = activeTabIndex => this.setState({ activeTabIndex })

    handleSelectProvince = provinceName => {
        const letter = this.props.numberPrefix.split("·")[1] || "";
        this.setState({ activeTabIndex: 1 })
        this.props.onChange({
            numberPrefix: `${provinceName}·${letter}`,
            isSelectShow: true
        })
    }

    handleSelectLetter = letter => {
        const abbreviation = this.props.numberPrefix.split("·")[0] || "";
        this.setState({ activeTabIndex: 0 })
        this.props.onChange({
            numberPrefix: `${abbreviation}·${letter}`,
            isSelectShow: false
        }, true)
    }

    renderList = () => {
        const [abbreviation = "", letter = ""] = this.props.numberPrefix.split("·");
        switch (this.state.activeTabIndex) {
            //地区
            case 0:
                return provinces.map(item => {
                    const { id, value, text } = item;
                    let activeClass = "", checkClass = "";
                    if (value == abbreviation) {
                        activeClass = "active";
                        checkClass = "check"
                    }
                    return (
                        <li
                            key={id}
                            className={activeClass}
                            onClick={() => this.handleSelectProvince(value, text)}
                        >
                            {text}<span className={checkClass}></span>
                        </li>
                    )
                })
            //字母
            case 1:
                return letters.map(item => {
                    let activeClass = "", checkClass = "";
                    if (item == letter) {
                        activeClass = "active";
                        checkClass = "check"
                    }
                    return (
                        <li
                            key={item}
                            className={activeClass}
                            onClick={() => this.handleSelectLetter(item)}
                        >
                            {item}<span className={checkClass}></span>
                        </li>
                    )
                })
            default:
                return null;
        }
    }

    render() {
        const { activeTabIndex } = this.state;
        const [abbreviation = "", letter = ""] = this.props.numberPrefix.split("·");
        const provinceObj = provinces.find(item => item.value === abbreviation)
        const provinceDesc = provinceObj && provinceObj.text || "";
        const isProvinceActive = activeTabIndex === 0
        return (
            <div className={classNames({ "fixed_box": true, hidden: !this.props.show })} >
                <div className={classNames({ ranage_select: true, active: isProvinceActive })} style={{ color: !isProvinceActive && "#9fa3a8" }} onClick={() => this.swithTab(0)}>
                    <span className="selected">{provinceDesc}</span>
                </div>
                <div className={classNames({ ranage_select: true, active: !isProvinceActive })} style={{ color: isProvinceActive && "#9fa3a8" }} onClick={() => this.swithTab(1)}>
                    <span className="selected ">{letter}</span>
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