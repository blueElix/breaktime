import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../../history'

class BreakDelete extends React.Component {
  componentDidMount() {
    this.fetchBreakSelectedData()
  }

  fetchBreakSelectedData = async () => {
    await this.props.fetchSelectedBreak(this.props.match.params.id)
  }

  renderActions() {
    const { id } = this.props.match.params

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteBreak(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/view-all-break" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    )
  }

  renderContent() {
    if (!this.props.selectedBreak) {
      return 'Are you sure you want to delete this break?'
    }

    return `Are you sure you want to delete the break with Name: ${this.props.selectedBreak.name}`
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/view-all-break')}
      />
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
    deleteBreak: (id) => dispatch.breaks.deleteBreak(id),
  }
}

export default connect(mapStateToProps, mapDispatch)(BreakDelete)
