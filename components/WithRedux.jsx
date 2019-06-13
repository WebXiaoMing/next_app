import React from 'react'

import createAppStore from '../store'

const isServer = typeof window === 'undefined'
const __WINDOW_REDUX_STORE__ = '__WINDOW_REDUX_STORE__'

const getInitReduxStore = (initialState) => {
  if (isServer) {
    return createAppStore(initialState)
  }
  if (!window[__WINDOW_REDUX_STORE__]) {
    window[__WINDOW_REDUX_STORE__] = createAppStore(initialState)
  }

  return window[__WINDOW_REDUX_STORE__]
}
 
export default (Comp) => {
  return class WithRedux extends React.Component {
    constructor (props) {
      super(props)
      this.reduxStore = getInitReduxStore(props.initialReduxState)
    }

    static async getInitialProps (ctx) {
      const { req } = ctx.ctx
      const userInfo = (req.session && req.session.userInfo) ? req.session.userInfo : {}
      const store = getInitReduxStore({
        user: userInfo
      })

      let appProps = {}
      if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx)
      }

      return { 
        ...appProps,
        initialReduxState: store.getState()
      }
    }

    render () {
      return <Comp { ...this.props } store={ this.reduxStore }/>
    }
  }
}