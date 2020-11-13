import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import BreakForm from './BreakForm'

class EditBreak extends React.Component {
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

  componentDidMount() {
    this.fetchBreakSelectedData()
  }

  fetchBreakSelectedData = async () => {
    await this.props.fetchSelectedBreak(this.props.match.params.id)
  }

  handleSubmit = async (formValues) => {
    console.log(formValues)
    await this.props.updateBreak(this.props.match.params.id, formValues)
    if (this.props.breakDataResponse) {
      let mes = {
        message: this.props.breakDataResponse.success,
        header: 'Form Completed',
        response: 'success',
      }
      this.setState({
        responseMessage: mes,
      })
    } else {
      let mes = {
        message: this.props.breakDataResponse.error,
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
    let { selectedBreak } = this.props

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
          {message ? (
            <div className={`ui ${response} message`}>
              <div className="header">{header}</div>
              <p>{message}</p>
            </div>
          ) : (
            <div></div>
          )}
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
    breakDataResponse: store.breaks.breakDataResponse,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSelectedBreak: (id) => dispatch.breaks.fetchSelectedBreak(id),
    updateBreak: (id, payload) => dispatch.breaks.updateBreak(id, payload),
  }
}

export default connect(mapStateToProps, mapDispatch)(EditBreak)
