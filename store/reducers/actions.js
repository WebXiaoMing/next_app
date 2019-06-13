import { ADD, UPDATE_NAME } from './types'

export const add = () => {
  return {
    type: ADD
  }
}

export const setName = (name) => {
  return {
     type: UPDATE_NAME,
     payload: name
  }
}