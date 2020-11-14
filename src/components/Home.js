import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
  componentDidMount() {
    this.importBreakList()
  }

  importBreakList = async () => {
    await this.props.fetchBreak()
    await this.props.fetchUserData()
    await this.props.fetchBreakTime()
    await this.props.fetchAllUsers()
  }
  render() {
    return (
      <div className="ui container">
        <h2 className="ui center aligned icon header">
          <i className="circular users icon"></i>
          WELCOME!!
        </h2>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {}
}
const mapDispatch = (dispatch) => {
  return {
    fetchBreak: dispatch.breaks.fetchBreak,
    fetchBreakTime: dispatch.breaks.fetchBreakTime,
    fetchUserData: dispatch.breaks.fetchUserData,
    fetchAllUsers: dispatch.breaks.fetchAllUsers,
  }
}

export default connect(mapStateToProps, mapDispatch)(Home)
