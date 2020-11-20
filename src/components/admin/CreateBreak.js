import React from 'react'
import { connect } from 'react-redux'
import BreakForm from './BreakForm'
import Message from '../Message'

class CreateBreak extends React.Component {
  handleSubmit = async (formValues) => {
    await this.props.createBreak(formValues)
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
            <div className="content">Create Break</div>
          </h2>
          {messageResponse ? <Message /> : ''}
          <BreakForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    messageResponse: store.breaks.messageResponse,
    breakDataResponse: store.breaks.breakDataResponse,
  }
}
const mapDispatch = (dispatch) => {
  return {
    createBreak: (payload) => dispatch.breaks.createBreak(payload),
  }
}

export default connect(mapStateToProps, mapDispatch)(CreateBreak)
