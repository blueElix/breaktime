import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../../history'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    let payload = {
      email: this.state.email,
      password: this.state.password,
    }
    let token = localStorage.getItem('token')

    await this.props.fetchLoginUser(payload)

    if (token) {
      history.push('/home')
    }
  }

  render() {
    return (
      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Login to your account</div>
          </h2>
          <form className="ui large form" onSubmit={this.handleSubmit}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email address"
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={(event) =>
                      this.setState({ password: event.target.value })
                    }
                  />
                </div>
              </div>
              <input
                className="ui fluid large teal submit button"
                type="submit"
                value="Login"
              />
            </div>
            <div className="ui error message" />
          </form>
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
    userData: store.breaks.userData,
    loginUser: store.breaks.loginUser,
    isFetchingAll: store.breaks.isFetchingAll,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchLoginUser: (payload) => dispatch.breaks.fetchLoginUser(payload),
    fetchUserData: dispatch.breaks.fetchUserData,
  }
}

export default connect(mapStateToProps, mapDispatch)(Login)
