import MockAdapter from 'axios-mock-adapter'
import http from '../common/http.js'

var mock = new MockAdapter(http, { delayResponse: 99 });

export default mock