import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Loader'

class ViewAllUser extends React.Component {
  componentDidMount() {
    this.fetchUsersData()
  }

  fetchUsersData = async () => {
    await this.props.fetchAllUsers()
  }

  renderUsersData = () => {
    let { allUsers } = this.props
    return allUsers.map((user) => {
      return (
        <tr key={user._id}>
          <td>{user.fname}</td>
          <td>{user.lname}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <Link to={`/view/user/${user._id}`} className="ui button primary">
              View
            </Link>
          </td>
        </tr>
      )
    })
  }
  render() {
    let { isFetchingUser, allUsers } = this.props
    if (isFetchingUser) {
      return <Loader />
    }
    return (
      <div className="ui grid centered" style={{ padding: '10px' }}>
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">View All Users</div>
          </h2>
          <table className="ui table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{allUsers ? this.renderUsersData() : <tr></tr>}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    allUsers: store.breaks.allUsers,
    isFetchingUser: store.breaks.isFetchingUser,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: dispatch.breaks.fetchAllUsers,
  }
}

export default connect(mapStateToProps, mapDispatch)(ViewAllUser)
