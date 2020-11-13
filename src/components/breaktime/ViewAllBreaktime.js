import React from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader'
// import { Link } from 'react-router-dom'

class ViewAllBreaktime extends React.Component {
  componentDidMount() {
    this.fetchBreatimeList()
  }

  fetchBreatimeList = async () => {
    await this.props.fetchBreakTime()
  }

  renderBreatimeList = () => {
    let { breaktime } = this.props

    if (!breaktime) {
      let breaktimeStore = localStorage.getItem('breaktime')
      breaktime = JSON.parse(breaktimeStore)
    }

    // const now = '2020-11-09T13:06:43.511Z'
    // const today = now.toString().slice(11, 16)
    // console.log(today)

    return breaktime.map((btime) => {
      return (
        <tr key={btime._id}>
          <td>{btime.username}</td>
          <td>{btime.breakname}</td>
          <td>{btime.createdAt}</td>
          <td>{btime.start}</td>
          <td>{btime.end}</td>
          <td>{btime.minsLate}</td>
          <td>{btime.overbreak ? 'YES' : 'NO'}</td>
          {/* <td>
            <Link to={`/view/user/${btime._id}`} className="ui button primary">
              View
            </Link>
          </td> */}
        </tr>
      )
    })
  }

  render() {
    let { isFetching, breaktime } = this.props

    if (isFetching) {
      return <Loader />
    }

    return (
      <div className="ui grid centered" style={{ padding: '10px' }}>
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">View All Breaktime</div>
          </h2>
          <table className="ui table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Break Name</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Minutes Late</th>
                <th>Overbreak</th>
              </tr>
            </thead>
            <tbody>{breaktime ? this.renderBreatimeList() : <tr></tr>}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    breaktime: store.breaks.breaktime,
    isFetching: store.breaks.isFetching,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchBreakTime: dispatch.breaks.fetchBreakTime,
  }
}

export default connect(mapStateToProps, mapDispatch)(ViewAllBreaktime)
