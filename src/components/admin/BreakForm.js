import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class BreakForm extends React.Component {
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

  renderInputNumber = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type="number" autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render() {
    let { isFormLoading, isBreakFetching } = this.props
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={`ui large error form ${
          isFormLoading || isBreakFetching ? 'loading' : ''
        }`}
      >
        <Field
          name="name"
          component={this.renderInput}
          label="Enter Break Name"
        />
        <Field
          name="lengthOfBreak"
          component={this.renderInputNumber}
          label="Enter Break Length"
        />
        <Field
          name="times"
          component={this.renderInputNumber}
          label="Enter How Many Times Allowed"
        />
        <Field
          name="gracePeriod"
          component={this.renderInputNumber}
          label="Enter Grace Period"
        />
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {}

  if (!formValues.name) {
    errors.name = 'You must enter break name'
  }

  if (!formValues.lengthOfBreak) {
    errors.lengthOfBreak = 'You must enter a length of break'
  }

  if (!formValues.times) {
    errors.times = 'You must enter number of times'
  }

  if (!formValues.gracePeriod) {
    errors.gracePeriod = 'You must enter grace period'
  }

  return errors
}

const mapStateToProps = (store) => {
  return {
    isFormLoading: store.breaks.isFormLoading,
    isBreakFetching: store.breaks.isBreakFetching,
  }
}

const formWrapped = reduxForm({
  form: 'breakForm',
  validate,
  enableReinitialize: true,
})(BreakForm)

export default connect(mapStateToProps)(formWrapped)
