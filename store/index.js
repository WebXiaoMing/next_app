import { createStore } from 'redux'
import reducer from './reducers/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const createAppStore = (defaultState) => {
  const store = createStore(
      reducer,
      {
        ...defaultState
      },
      composeWithDevTools()
    )

  return store
}

export default createAppStore