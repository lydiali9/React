import { handleActions } from 'redux-actions'
import { STATUS } from '../../common/constant'

const initialState = {
  loading: false,
  list: []
};

const reducer = handleActions(
  {
    QUERY_ACTIVITY: (state, action) => {
      return Object.assign({}, state, {
        loading: true
      })
    },
    QUERY_ACTIVITY_OK: (state, action) => {
      if (action.payload.code === STATUS.OK) {
        return Object.assign({}, state, {
          loading: false,
          ...action.payload.content,
          list: state.list.concat(action.payload.content.list)
        })
      }
      return Object.assign({}, state, initialState)
    },
    QUERY_ACTIVITY_ERROR:(state, action)=>{
      return Object.assign({}, state, initialState)
    },
    RESET_ACTIVITY_LIST: (state, action) => {
      return Object.assign({}, state, {
        loading: false,
        list: []
      })
    }
  },

  initialState
);

export default reducer  