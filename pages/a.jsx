import { connect } from 'react-redux'
import { add } from '../store/reducers/actions'

const Test = ({name}) => {
  return (
    <>
      <div className="container">这是a页面 { name }</div>
      <style jsx>{`
        .container {
          background: red;
          color: #ccc;
          font-size: 12px;
          display: flex;
        }
      `}</style>
    </>
  )
}

const App = connect(
  (store) => store,
  dispatch => {
    return {
      add: dispatch(add())
    }
  }
)(Test)
export default App