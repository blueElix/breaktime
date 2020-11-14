import React from 'react'
import { Field, reset, reduxForm } from 'redux-form'

class LoginForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInputPassword = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type="password" autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  renderInputEmail = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type="email" autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues, dispatch) => {
    this.props.onSubmit(formValues)
    dispatch(reset('loginForm'))
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui large error form"
      >
        <div className="ui stacked segment">
          <Field
            name="email"
            component={this.renderInputEmail}
            label="Enter your Email"
          />
          <Field
            name="password"
            component={this.renderInputPassword}
            label="Enter your Password"
          />
          <button className="ui button primary">Submit</button>
        </div>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {}

  if (!formValues.email) {
    errors.email = 'You must enter your email'
  }

  if (!formValues.password) {
    errors.password = 'You must enter number of times'
  }

  return errors
}

export default reduxForm({
  form: 'loginForm',
  validate,
  enableReinitialize: true,
})(LoginForm)
