import { combineReducers } from 'redux'
import express from '../page/express/reducers'
import user from '../page/main/reducers'
import activity from '../page/activity/reducers'
import violation from '../page/violation/reducers'
import home from '../page/home/reducers'

export default combineReducers({
  express,
  activity,
  user,
  violation,
  home
})
