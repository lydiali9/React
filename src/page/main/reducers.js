import { handleActions } from 'redux-actions'
import Message from '../../components/message/index.jsx'
import history from '../../redux/history.js'
import { isSupportStorage } from '../../common/utils'
import { STATUS, INV_UID, INV_X_ACCESS_TOKEN } from '../../common/constant'

const initialState = {
    loading: false,
    headphoto: '../../src/images/login/alt.png',
    name: '',
    _id: '',
    sex: '',
    age: '',
    number: ''
};

const reducer = handleActions(
    {
        GET_CODE: (state, action) => {
            return Object.assign({}, state);
        },

        GET_CODE_OK: (state, action) => {
            if (action.payload.code === STATUS.OK) {
                console.log("验证码发送成功");
            }
            return Object.assign({}, state, initialState)
        },

        GET_CODE_ERROR: (state, action) => {
            return Object.assign({}, state, initialState)
        },

        LOGIN_OK: (state, action) => {
            if (action.payload.code === STATUS.OK) {
                if (isSupportStorage) {
                    localStorage.setItem(INV_UID, action.payload.content._id)
                    localStorage.setItem(INV_X_ACCESS_TOKEN, action.payload.content.token);
                }
            }
            return Object.assign({}, state, initialState)
        },

        LOGIN_ERROR: (state, action) => {
            Message.error("登录失败")
            return Object.assign({}, state, initialState)
        },

        USER_INFO: (state, action) => {
            return Object.assign({}, state, {
                loading: true
            })
        },

        USER_INFO_OK: (state, action) => {
            if (action.payload.code === STATUS.OK) {
                return Object.assign({}, state, {
                    loading: false,
                    ...action.payload.content
                })
            }
            return Object.assign({}, state, initialState)
        }
    },
    initialState
);

export default reducer