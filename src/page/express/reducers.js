import { handleActions } from 'redux-actions'
import Message from '../../components/message/index.jsx'
import { isSupportStorage } from '../../common/utils'
import { STATUS, EXPRESS_HISTORY } from '../../common/constant'

const initialState = {
  loading: false,
  icon: "",
  context: [],
  company: "",
  tel: "",
  msg: ""
};
const reducer = handleActions(
  {
    QUERY_EXPRESS: (state, action) => {
      return Object.assign({}, state, {
        loading: true,
        msg: ''
      })
    },
    QUERY_EXPRESS_OK: (state, action) => {

      if (action.payload.code === STATUS.OK) {
        const { context, company } = action.payload.content;
        if (isSupportStorage) {
          let expressHistory = JSON.parse(localStorage.getItem("EXPRESS_HISTORY")) || [];
          let hasSameHistory = expressHistory.findIndex(item => item.number === action.meta.payload.num) > -1;
          if (!hasSameHistory) {
            expressHistory.unshift({ company: company.shortname, number: action.meta.payload.num })
            localStorage.setItem(EXPRESS_HISTORY, JSON.stringify(expressHistory));
          }
        }
        return Object.assign({}, state, {
          loading: false,
          icon: company.icon.normal,
          context,
          company: company.shortname,
          tel: company.tel
        })
      }

      return Object.assign({ msg: action.payload.msg }, state, initialState)

    },
    QUERY_EXPRESS_ERROR: (state, action) => {
      return Object.assign({}, state, {
        loading: false
      })
    }
  },
  initialState
);

export default reducer