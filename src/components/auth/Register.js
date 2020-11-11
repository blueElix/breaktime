import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        lname: '',
        fname: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      submitted: false,
      responseMessage: {
        message: '',
        header: '',
        response: '',
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    const { name, value } = event.target
    const { user } = this.state

    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ submitted: true })

    let { user } = this.state

    if (user.lname && user.fname && user.email && user.password) {
      if (user.confirmPassword !== user.password) {
        let mes = {
          message: 'Modify your password',
          header: 'Warning!',
          response: 'warning',
        }
        this.setState({
          responseMessage: mes,
        })
      } else {
        let payload = {
          email: user.email,
          password: user.password,
          lname: user.lname,
          fname: user.fname,
        }

        let userReset = {
          email: '',
          password: '',
          lname: '',
          fname: '',
        }

        await this.props.registerUser(payload)
        this.setState({ submitted: false, user: userReset })
        event.target.reset()

        if (this.props.registerUserData.success) {
          let mes = {
            message: this.props.registerUserData.success,
            header: 'Form Completed',
            response: 'success',
          }
          this.setState({
            responseMessage: mes,
          })
        } else {
          let mes = {
            message: this.props.registerUserData.error,
            header: 'Error',
            response: 'error',
          }
          this.setState({
            responseMessage: mes,
          })
        }
      }
    }
  }

  render() {
    let { user, submitted } = this.state
    let { isFormLoading } = this.props
    let { message, response, header } = this.state.responseMessage
    return (
      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Register User</div>
          </h2>
          {message ? (
            <div className={`ui ${response} message`}>
              <div className="header">{header}</div>
              <p>{message}</p>
            </div>
          ) : (
            <div></div>
          )}

          <form
            className={`ui large form ${isFormLoading ? 'loading' : ''}`}
            onSubmit={this.handleSubmit}
          >
            <div className="ui stacked segment">
              <div
                className={'field' + (submitted && !user.fname ? ' error' : '')}
              >
                <label>First Name</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter First Name"
                  value={user.fname}
                  onChange={this.handleChange}
                />
              </div>
              <div
                className={'field' + (submitted && !user.lname ? ' error' : '')}
              >
                <label>Last Name</label>
                <input
                  type="text"
                  name="lname"
                  placeholder="Enter Last Name"
                  value={user.lname}
                  onChange={this.handleChange}
                />
              </div>

              <div
                className={'field' + (submitted && !user.email ? ' error' : '')}
              >
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={user.email}
                  onChange={this.handleChange}
                />
              </div>

              <div
                className={
                  'field' + (submitted && !user.password ? ' error' : '')
                }
              >
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={user.password}
                  onChange={this.handleChange}
                />
              </div>

              <div
                className={
                  'field' + (submitted && !user.confirmPassword ? ' error' : '')
                }
              >
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
              </div>
              <input
                className="ui fluid large teal submit button"
                type="submit"
                value="Register"
              />
            </div>
            <div className="ui error message" />
          </form>
          <div className="ui message">
            Already registered?{' '}
            <Link to="/" className="item">
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    loginUser: store.breaks.loginUser,
    registerUserData: store.breaks.registerUserData,
    isFetchingAll: store.breaks.isFetchingAll,
    isFormLoading: store.breaks.isFormLoading,
  }
}
const mapDispatch = (dispatch) => {
  return {
    registerUser: (payload) => dispatch.breaks.registerUser(payload),
  }
}

export default connect(mapStateToProps, mapDispatch)(Register)
