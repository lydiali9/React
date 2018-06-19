import { createAction } from 'redux-actions'
import { createAsyncAction } from '../../common/utils.js'

export const queryArea = createAsyncAction('QUERY_AREA', '/query/queryArea');

export const queryActivity = createAsyncAction("QUERY_ACTIVITY", "/api/activity/query", { method: "get" })

export const resetActitityList = createAction("RESET_ACTIVITY_LIST")