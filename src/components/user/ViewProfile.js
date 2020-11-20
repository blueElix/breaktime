import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import moment from 'moment'

import Loader from '../Loader'

const ViewProfile = ({
  fetchUserData,
  userData,
  userBreaktimeList,
  fetchUserBreaktimeList,
}) => {
  // useEffect
  useEffect(() => {
    const cdm = async () => {
      await fetchUserData()
      await fetchUserBreaktimeList()
    }
    cdm()
  }, [])

  const renderBreatimeList = () => {
    if (!userBreaktimeList) {
      let userBreaktimeListStore = localStorage.getItem('userBreaktimeList')
      userBreaktimeList = JSON.parse(userBreaktimeListStore)
    }

    return userBreaktimeList.map((btime) => {
      return (
        <tr key={btime._id}>
          <td>{btime.breakname}</td>
          <td>{btime.createdAt}</td>
          <td>{moment(btime.start).format('hh:mmA')}</td>
          <td>{moment(btime.end).format('hh:mmA')}</td>
          <td>{btime.minsLate}</td>
          <td>{btime.overbreak ? 'YES' : 'NO'}</td>
        </tr>
      )
    })
  }

  const renderBreaktime = () => {
    return (
      <div>
        <h3 className="ui center aligned teal header">Breaktime</h3>
        <table className="ui table">
          <thead>
            <tr>
              <th>Break Name</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Minutes Late</th>
              <th>Overbreak</th>
            </tr>
          </thead>
          <tbody>{userBreaktimeList ? renderBreatimeList() : <tr></tr>}</tbody>
        </table>
      </div>
    )
  }
  return (
    <div className="ui container">
      <h2 className="ui center aligned icon teal image header">
        <i className="circular user icon"></i>
        Profile
      </h2>

      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        {userData ? (
          <div className="column">
            <div className="ui list">
              <div className="item">
                <i className="user icon"></i>
                <div className="content">
                  {userData.fname} {userData.lname}
                </div>
              </div>

              <div className="item">
                <i className="mail icon"></i>
                <div className="content">
                  <a>{userData.email}</a>
                </div>
              </div>

              <div className="item">
                <i className="edit icon"></i>
                <div className="content">
                  <Link to="/edit-profile" className="item">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      {userData && userData.role === 'user' ? renderBreaktime() : ''}
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    userData: store.breaks.userData,
    userBreaktimeList: store.breaks.userBreaktimeList,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchUserData: dispatch.breaks.fetchUserData,
    fetchUserBreaktimeList: dispatch.breaks.fetchUserBreaktimeList,
  }
}
export default connect(mapStateToProps, mapDispatch)(ViewProfile)
