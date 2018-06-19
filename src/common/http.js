import axios from 'axios'
import qs from 'qs'
import history from '../redux/history.js'
import config from '../config/config.js'
import Message from '../components/message/index.jsx'

let http = axios.create({
  method: 'post',
  headers: {},
  timeout: 12000,
  baseURL: config.baseURL

});

http.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});


http.interceptors.response.use(function (res) {
  return Promise.resolve(res);
}, function (error) {
  if (!navigator.onLine) {
    history.push("/offline")
  }
  Message.info("网络异常", 3000, 'net_error')
  return Promise.reject(error);
});

export default http