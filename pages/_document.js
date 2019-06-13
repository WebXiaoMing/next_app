import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  static async getInitialProps (ctx) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => App
    })
    
    const props = await Document.getInitialProps(ctx)
    return { ...props }
  }
  render () {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument