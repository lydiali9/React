import { handleActions } from 'redux-actions'
import { STATUS } from '../../common/constant'

const initialState = {
    loading: false,
    recordList: [],
    carList: []
};

const reducer = handleActions(
    {
        QUERY_RECORDS: (state, action) => {
            return Object.assign({}, state, {
                loading: true
            })
        },
        QUERY_RECORDS_OK: (state, action) => {
            if (action.payload.code === STATUS.OK) {
                return Object.assign({}, state, {
                    loading: false,
                    recordList: action.payload.content.Records
                })
            }
            return Object.assign({}, state, initialState)
        },
        QUERY_RECORDS_ERROR: (state, action) => {
            return Object.assign({}, state, initialState)
        },
        COUNT_CAR: (state, action) => {
            return Object.assign({}, state, {
                loading: true
            })
        },
        COUNT_CAR_OK: (state, action) => {
            if (action.payload.code === STATUS.OK) {
                return Object.assign({}, state, {
                    loading: false,
                    carList: action.payload.content
                })
            }
            return Object.assign({}, state, initialState)
        },
    },
    initialState
);

export default reducer  