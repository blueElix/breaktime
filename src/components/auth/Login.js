import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Message from '../Message'
import history from '../../history'

class Login extends React.Component {
  handleSubmit = async (formValues) => {
    let token = localStorage.getItem('token')
    let { loginUser, messageResponse } = this.props
    await this.props.fetchLoginUser(formValues)

    if (token || loginUser) {
      history.push('/home')
    }
  }

  render() {
    let { messageResponse } = this.props
    return (
      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Login to your account</div>
          </h2>
          {messageResponse ? <Message /> : ''}
          <LoginForm onSubmit={this.handleSubmit} />
          <div className="ui message">
            New to us?{' '}
            <Link to="/register" className="item">
              Register
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    messageResponse: store.breaks.messageResponse,
    userData: store.breaks.userData,
    loginUser: store.breaks.loginUser,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchLoginUser: (payload) => dispatch.breaks.fetchLoginUser(payload),
  }
}

export default connect(mapStateToProps, mapDispatch)(Login)
