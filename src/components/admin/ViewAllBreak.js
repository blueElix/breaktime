import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Loader'

class ViewAllBreak extends React.Component {
  componentDidMount() {
    this.renderFetchBreakList()
  }

  renderFetchBreakList = async () => {
    await this.props.fetchBreak()
  }

  renderBreaks() {
    return this.props.breakList.map((list, index) => {
      return (
        <tr key={index}>
          <td>{list.name}</td>
          <td>{list.lengthOfBreak} Mins</td>
          <td>{list.times}</td>
          <td>{list.gracePeriod} Mins</td>
          <td>
            <Link to={`/breaks/edit/${list._id}`} className="ui button primary">
              Edit
            </Link>
          </td>
          <td>
            <Link to={`/breaks/delete/${list._id}`} className="ui button red">
              Delete
            </Link>
          </td>
        </tr>
      )
    })
  }
  render() {
    if (this.props.isFetching) {
      return <Loader />
    }
    return (
      <div className="ui grid centered" style={{ padding: '10px' }}>
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">View All Break</div>
          </h2>
          <table className="ui table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Break Length(Minutes)</th>
                <th>Times</th>
                <th>Grace Period Time (Minutes)</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.breakList ? this.renderBreaks() : <tr></tr>}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    breakList: store.breaks.breakList,
    isFetching: store.breaks.isFetching,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchBreak: dispatch.breaks.fetchBreak,
  }
}

export default connect(mapStateToProps, mapDispatch)(ViewAllBreak)
