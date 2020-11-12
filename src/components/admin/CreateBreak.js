import React from 'react'
import { connect } from 'react-redux'

class CreateBreak extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      breaks: {
        name: '',
        lengthOfBreak: '',
        times: '',
        gracePeriod: '',
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

  handleChange = (e) => {
    const { name, value } = e.target
    const { breaks } = this.state

    this.setState({
      breaks: {
        ...breaks,
        [name]: value,
      },
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({ submitted: true })

    let { breaks } = this.state
    if (
      breaks.name &&
      breaks.lengthOfBreak &&
      breaks.times &&
      breaks.gracePeriod
    ) {
      let payload = {
        name: breaks.name,
        lengthOfBreak: breaks.lengthOfBreak,
        times: breaks.times,
        gracePeriod: breaks.gracePeriod,
      }

      let breakReset = {
        name: '',
        lengthOfBreak: '',
        times: '',
        greacePeriod: '',
      }

      await this.props.createBreak(payload)
      this.setState({ submitted: false, breaks: breakReset })

      if (this.props.breakDataResponse.success) {
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
  }

  render() {
    let { breaks, submitted } = this.state
    let { isFormLoading } = this.props
    let { message, response, header } = this.state.responseMessage
    return (
      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Create Break</div>
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
                className={
                  'field' + (submitted && !breaks.name ? ' error' : '')
                }
              >
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={breaks.name}
                  onChange={this.handleChange}
                  placeholder="Enter Break Name"
                />
              </div>

              <div
                className={
                  'field' + (submitted && !breaks.lengthOfBreak ? ' error' : '')
                }
              >
                <label>Break Length (Minutes)</label>
                <input
                  type="number"
                  name="lengthOfBreak"
                  value={breaks.lengthOfBreak}
                  onChange={this.handleChange}
                  placeholder="Enter Break Length"
                />
              </div>

              <div
                className={
                  'field' + (submitted && !breaks.times ? ' error' : '')
                }
              >
                <label>Times</label>
                <input
                  type="number"
                  name="times"
                  value={breaks.times}
                  onChange={this.handleChange}
                  placeholder="Enter How Many Times Allowed"
                />
              </div>

              <div
                className={
                  'field' + (submitted && !breaks.gracePeriod ? ' error' : '')
                }
              >
                <label>Grace Period Time (Minutes)</label>
                <input
                  type="number"
                  name="gracePeriod"
                  value={breaks.gracePeriod}
                  onChange={this.handleChange}
                  placeholder="Enter Grace Period"
                />
              </div>
              <input
                className="ui fluid large teal submit button"
                type="submit"
                value="Create"
              />
            </div>
            <div className="ui error message" />
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    isFormLoading: store.breaks.isFormLoading,
    breakDataResponse: store.breaks.breakDataResponse,
  }
}
const mapDispatch = (dispatch) => {
  return {
    createBreak: (payload) => dispatch.breaks.createBreak(payload),
  }
}

export default connect(mapStateToProps, mapDispatch)(CreateBreak)
