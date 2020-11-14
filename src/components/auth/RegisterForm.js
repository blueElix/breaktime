import React from 'react'
import { connect } from 'react-redux'
import { Field, reset, reduxForm } from 'redux-form'

class RegisterForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
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
    dispatch(reset('registerForm'))
  }

  render() {
    let { isFormLoading } = this.props
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={`ui large error form ${isFormLoading ? 'loading' : ''}`}
      >
        <div className="ui stacked segment">
          <Field
            name="fname"
            component={this.renderInput}
            label="Enter your First Name"
          />

          <Field
            name="lname"
            component={this.renderInput}
            label="Enter your Last Name"
          />

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

          <Field
            name="confirmPassword"
            component={this.renderInputPassword}
            label="Confirm your password"
          />
          <button className="ui button primary">Submit</button>
        </div>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {}

  if (!formValues.fname) {
    errors.fname = 'You must enter your first name'
  }
  if (!formValues.lname) {
    errors.lname = 'You must enter your last name'
  }

  if (!formValues.email) {
    errors.email = 'You must enter your email'
  }

  if (!formValues.password) {
    errors.password = 'You must enter number of times'
  }

  if (!formValues.confirmPassword) {
    errors.confirmPassword = 'You must enter grace period'
  } else if (formValues.confirmPassword !== formValues.password) {
    errors.confirmPassword = 'Your password mismatched'
  }

  return errors
}

const mapStateToProps = (store) => {
  return {
    loginUser: store.breaks.loginUser,
    isFormLoading: store.breaks.isFormLoading,
  }
}

const formWrapped = reduxForm({
  form: 'registerForm',
  validate,
  enableReinitialize: true,
})(RegisterForm)

export default connect(mapStateToProps)(formWrapped)
