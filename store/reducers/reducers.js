import { ADD, UPDATE_NAME } from './types'
import { combineReducers } from 'redux'

const userState = {
  count: 0
}

const otherState = {
  name: 'xiaoming'
}

const userReducer = (state = userState, action) => {
  if (action.type === ADD) {
    return {...state, count: state.count + 1}
  }
  
  return state
}

const otherReducer = (state = otherState, action) => {
  if (action.type === UPDATE_NAME) {
    return {...state, name: action.payload}
  }

  return state
}

export default combineReducers({
  user: userReducer,
  other: otherReducer
})