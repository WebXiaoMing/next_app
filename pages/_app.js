import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'

import Layout from '../components/Layout'
import WithRedux from '../components/WithRedux'

class MyApp extends App {

  static async getInitialProps (ctx) {
    const { Component } = ctx
    let pageProps = {}
    
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render () {
    const { Component, pageProps, store } = this.props
  
    return (
      <Container>
        <Provider store={ store }>
          <Layout>
              <Component { ...pageProps }/>
          </Layout>
        </Provider>
      </Container>
    )
  }
}

export default WithRedux(MyApp)