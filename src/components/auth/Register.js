import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      responseMessage: {
        message: '',
        header: '',
        response: '',
      },
    }
  }

  handleSubmit = async (formValues) => {
    await this.props.registerUser(formValues)
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

  render() {
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
          <RegisterForm onSubmit={this.handleSubmit} />
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
    registerUserData: store.breaks.registerUserData,
  }
}
const mapDispatch = (dispatch) => {
  return {
    registerUser: (payload) => dispatch.breaks.registerUser(payload),
  }
}

export default connect(mapStateToProps, mapDispatch)(Register)
