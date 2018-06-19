import React from 'react'
import './style.css'

const Loader = props => (
    <div className="fakeloader" style={{ "display": props.done ? "none" : "block" }}>
        <div className="spinner"></div>
    </div>
)
export default Loader