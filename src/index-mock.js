import React from 'react'
import ReactDOM from 'react-dom'
import { polyfill } from 'es6-promise'
import Root from './router/router.jsx'
// import './mocks/index.js'
import { initBaseRem } from './common/utils.js'
import './style/base.css'

polyfill();
initBaseRem();
ReactDOM.render(<Root />, document.querySelector('#main'));