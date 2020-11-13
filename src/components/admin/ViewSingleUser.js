import React from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader'

const ItemContainer = ({ title, name }) => {
  return (
    <div className="item">
      <div className="content">
        <div className="ui sub header">{title}</div>
        {name}
      </div>
    </div>
  )
}
class ViewAllUser extends React.Component {
  componentDidMount() {
    this.fetchUsersData()
  }

  fetchUsersData = async () => {
    await this.props.fetchSingleUser(this.props.match.params.id)
    await this.props.fetchSingleUserBreaktime(this.props.match.params.id)
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
            <button className="ui primary button">View Details</button>
          </td>
        </tr>
      )
    })
  }
  render() {
    let { isFetchingUser, singleUser } = this.props
    if (isFetchingUser || !singleUser) {
      return <Loader />
    }
    return (
      <div className="ui grid centered" style={{ padding: '10px' }}>
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">View Single User</div>
          </h2>
          <div className="content">
            <div className="ui horizontal list">
              <ItemContainer name={singleUser.fname} title="FIRST NAME" />
              <ItemContainer name={singleUser.lname} title="LAST NAME" />
              <ItemContainer name={singleUser.email} title="EMAIL" />
              <ItemContainer
                name={singleUser.userBreaktime}
                title="USER CURRENT BREAKTIME:"
              />
            </div>
          </div>
          {/* <table className="ui table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{allUsers ? this.renderUsersData() : ''}</tbody>
          </table> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    singleUser: store.breaks.singleUser,
    isFetchingUser: store.breaks.isFetchingUser,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchSingleUser: (id) => dispatch.breaks.fetchSingleUser(id),
    fetchSingleUserBreaktime: (id) =>
      dispatch.breaks.fetchSingleUserBreaktime(id),
  }
}

export default connect(mapStateToProps, mapDispatch)(ViewAllUser)
