import { handleActions } from 'redux-actions'
import { STATUS } from '../../common/constant'

const initialState = {
    loading: false,
    messageList: []
}

const reducer = handleActions(
    {
        GET_BEHAVIOR: (state, action) => {
            return Object.assign({}, state, {
                loading: true,
            })
        },
        GET_BEHAVIOR_OK: (state, action) => {
            if (action.payload.code === STATUS.OK) {
                return Object.assign({}, state, {
                    loading: false,
                    messageList: action.payload.content
                })
            }

            return Object.assign({}, state, initialState)

        },
    },
    initialState
);

export default reducer