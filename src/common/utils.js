import qs from 'qs'
import { formatPattern } from 'url-matcher'
import { INV_UID, INV_X_ACCESS_TOKEN } from './constant.js'
import http from './http.js'

export const isSupportStorage = function () {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}();

export function createAsyncAction(type, urlReg, opts1 = {}) {
  return (payload = {}, opts2 = {}) => dispatch => {
    const method = opts2.method || opts1.method || 'post';
    const headers = {};
    if (isSupportStorage) {
      payload.uid = localStorage.getItem(INV_UID);
      const token = localStorage.getItem(INV_X_ACCESS_TOKEN);
      isNotEmpty(token) && (headers["x-access-token"] = token)
    }
    const url = formatPattern(urlReg, payload);
    dispatch({
      type,
      payload,
      meta: {
        url
      }
    });

    return new Promise(function (resolve, reject) {
      return http({
        url,
        headers,
        params: method === 'get' ? payload : undefined,
        data: method === 'post' ? payload : undefined,
        transformRequest: [function (data, headers) {
          return qs.stringify(data);
        }],
        ...opts1,
        ...opts2
      }).then(res => {
        resolve(res);
        dispatch({
          type: type + '_OK',
          payload: res.data,
          meta: {
            url,
            payload
          }
        });
      }).catch(err => {
        reject(err);
        dispatch({
          type: type + '_ERROR',
          payload: err,
          error: true,
          meta: {
            url,
            payload
          }
        });
      })
    })
  }
}

export function createUploadAction(type, urlReg) {
  return (payload, opts) => dispatch => {
    const url = formatPattern(urlReg, payload);
    dispatch({
      type,
      payload,
      meta: {
        url
      }
    });

    return new Promise(function (resolve, reject) {
      let formData = new FormData();
      for (let p in payload) {
        if (payload.hasOwnProperty(p)) {
          formData.append(p, payload[p]);
        }
      }

      return http.post(url, formData, opts)
        .then(res => {
          resolve(res);
          dispatch({
            type: type + '_OK',
            payload: res.data,
            meta: {
              url,
              payload
            }
          });
        }).catch(err => {
          reject(err);
          dispatch({
            type: type + '_ERROR',
            payload: err,
            error: true,
            meta: {
              url,
              payload
            }
          });
        })
    })
  }
}

export function initBaseRem() {
  let windowWidth = document.documentElement.clientWidth || window.innerWidth;
  let baseRem = (windowWidth / 10);
  let htmlDom = document.querySelector('html');
  htmlDom.style.fontSize = baseRem + 'px';
};

let hasOwn = {}.hasOwnProperty;

export function classNames() {
  let classes = [];
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];
    if (!arg) continue;

    let argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(classNames.apply(null, arg));
    } else if (argType === 'object') {
      for (let key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
}

/**
 * 空值检测
 * @description " ",NaN,null,undefined,[],{}都属于空值
 * @description 布尔类型直接返回 0不是空值
 */
export function isEmpty(v) {
  switch (typeof v) {
    case 'undefined':
      return true;
    case 'string':
      if (v.replace(/^\s+|\s+$/g, "").length === 0) {
        return true;
      }
      return false;
    case 'boolean':
      return v;
    case 'number':
      if (isNaN(v)) {
        return true;
      }
      return false;
    case 'object':
      if (null === v) {
        return true;
      } else if (undefined !== v.length && v.length === 0) {
        return true;
      } else {
        for (var k in v) {
          return false;
        }
        return true;
      }
    default:
      return false;
  }
}


export function isNotEmpty(v) {
  return !isEmpty(v);
}

export function formatDate(date, fmt = "yyyy-MM-dd") {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
    }
  }
  return fmt;
}

export function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var keyA = Object.keys(objA),
    keyB = Object.keys(objB);

  if (keyA.length != keyB.length) {
    return false;
  }

  for (var idx = 0, len = keyA.length; idx < len; idx++) {
    var key = keyA[idx];

    if (!objB.hasOwnProperty(key)) {
      return false;
    }
    var valueA = objA[key],
      valueB = objB[key];
    if (valueA !== valueB) {
      return false;
    }
  }
  return true;
}

export function isLogin() {
  return isSupportStorage ? isNotEmpty(localStorage.getItem(INV_X_ACCESS_TOKEN)) : false
}