import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

class ProfileForm extends React.Component {
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

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render() {
    let { isLoadingData } = this.props
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={`ui large error form ${isLoadingData ? 'loading' : ''}`}
      >
        <div className="ui stacked segment">
          <Field
            name="email"
            component={this.renderInputEmail}
            label="Enter your Email"
          />
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

  if (!formValues.fname) {
    errors.fname = 'You must enter your first name'
  }

  if (!formValues.lname) {
    errors.lname = 'You must enter your last name'
  }

  return errors
}
const mapStateToProps = (store) => {
  return {
    isLoadingData: store.breaks.isLoadingData,
  }
}

const formWrapped = reduxForm({
  form: 'profileForm',
  validate,
  enableReinitialize: true,
})(ProfileForm)

export default connect(mapStateToProps)(formWrapped)
