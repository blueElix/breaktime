import React from 'react'
import { connect } from 'react-redux'
import BreakForm from './BreakForm'
import Message from '../Message'

class EditBreak extends React.Component {
  componentDidMount() {
    this.fetchBreakSelectedData()
  }

  fetchBreakSelectedData = async () => {
    await this.props.fetchSelectedBreak(this.props.match.params.id)
  }

  handleSubmit = async (formValues) => {
    await this.props.updateBreak(formValues)
  }

  render() {
    let { selectedBreak, messageResponse } = this.props

    if (!selectedBreak) {
      return <div>Loading... </div>
    }

    if (selectedBreak._id !== this.props.match.params.id) {
      this.fetchBreakSelectedData()
    }
    return (
      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Edit Break</div>
          </h2>
          {messageResponse ? <Message /> : ''}
          <BreakForm
            initialValues={{
              name: selectedBreak.name,
              lengthOfBreak: selectedBreak.lengthOfBreak,
              times: selectedBreak.times,
              gracePeriod: selectedBreak.gracePeriod,
            }}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    selectedBreak: store.breaks.selectedBreak,
    messageResponse: store.breaks.messageResponse,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSelectedBreak: (id) => dispatch.breaks.fetchSelectedBreak(id),
    updateBreak: (payload) => dispatch.breaks.updateBreak(payload),
  }
}

export default connect(mapStateToProps, mapDispatch)(EditBreak)
