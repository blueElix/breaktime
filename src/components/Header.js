import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      role: false,
    }
  }

  componentDidMount() {
    this.importUserData()
  }

  importUserData = async () => {
    await this.props.fetchUserData()
    let { userData } = this.props
    let storeUser = localStorage.getItem('userData')
    let user = JSON.parse(storeUser)

    this.setState({ role: user.role })
    if (userData) {
      this.setState({ role: userData.role })
    }

    if (!storeUser || !userData) {
      this.logout()
    }
  }

  renderForAdmin = () => {
    return (
      <React.Fragment>
        <Link to="/create-break" className="item">
          Create Break
        </Link>
        <Link to="/view-all-break" className="item">
          View All Break
        </Link>
        <Link to="/view-all-users" className="item">
          View All Users
        </Link>
        <Link to="/view-all-breaktime" className="item">
          View All Breaktime
        </Link>
        <Link to="/statistics" className="item">
          Statistics
        </Link>
      </React.Fragment>
    )
  }
  renderForUser = () => {
    return (
      <React.Fragment>
        <Link to="/breaktime" className="item">
          Breaktime
        </Link>
      </React.Fragment>
    )
  }
  logout = () => {
    history.push('/')
    localStorage.clear()
    window.location.reload(false)
  }
  render() {
    return (
      <div>
        <div className="ui left fixed vertical menu">
          <div className="item">
            <span>
              <i className="big clock outline icon"></i>
            </span>
          </div>
          {this.state.role === 'admin'
            ? this.renderForAdmin()
            : this.renderForUser()}
          <Link to="/" className="item">
            Profile
          </Link>
          <Link to="/" className="item" onClick={() => this.logout()}>
            Logout
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    userData: store.breaks.userData,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUserData: dispatch.breaks.fetchUserData,
  }
}

export default connect(mapStateToProps, mapDispatch)(Header)
