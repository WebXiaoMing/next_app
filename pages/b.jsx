
const Test = ({name}) => {
  return (
    <div>这是b页面 { name }</div>
  )
}

Test.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'xiaoming'
      })
    }, 2000)
  })

  return await promise
}

export default Test