import React from 'react'
import { connect } from 'react-redux'

const StatisticsCom = ({ value, label }) => {
  return (
    <div className="statistic">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  )
}

class Statistics extends React.Component {
  state = {
    userCount: 0,
    breakCount: 0,
    breaktimeCount: 0,
    overbreakCount: 0,
    notOverbreakCount: 0,
  }

  componentDidMount() {
    this.fetchAllData()
    this.renderStatisticsCount()
  }

  fetchAllData = async () => {
    await this.props.fetchAllUsers()
    await this.props.fetchBreak()
    await this.props.fetchBreakTime()
  }

  renderStatisticsCount = () => {
    let { allUsers, breakList, breaktime } = this.props

    if (allUsers) {
      let totalUser = allUsers.filter((user) => {
        return user._id
      }).length

      this.setState({ userCount: totalUser })
    }

    if (breakList) {
      let totalBreak = breakList.filter((blist) => {
        return blist._id
      }).length
      this.setState({ breakCount: totalBreak })
    }

    if (breaktime) {
      let totalBreaktime = breaktime.filter((btlist) => {
        return btlist._id
      }).length
      let notOverbreak = breaktime.filter((btlist) => !btlist.overbreak).length
      let Overbreak = breaktime.filter((btlist) => btlist.overbreak).length
      this.setState({
        breaktimeCount: totalBreaktime,
        notOverbreakCount: notOverbreak,
        overbreakCount: Overbreak,
      })
    }

    return
  }

  render() {
    let {
      userCount,
      breakCount,
      breaktimeCount,
      overbreakCount,
      notOverbreakCount,
    } = this.state
    return (
      <div className="ui grid centered" style={{ padding: '10px' }}>
        <div className="column">
          <div className="ui five statistics">
            <StatisticsCom value={userCount} label="TOTAL MEMBERS" />
            <StatisticsCom value={breakCount} label="TOTAL BREAKS" />
            <StatisticsCom value={breaktimeCount} label="TOTAL BREAKTIME" />
            <StatisticsCom value={overbreakCount} label="TOTAL OVERBREAK" />
            <StatisticsCom
              value={notOverbreakCount}
              label="TOTAL NOT OVERBRAKE"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    allUsers: store.breaks.allUsers,
    breakList: store.breaks.breakList,
    breaktime: store.breaks.breaktime,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: dispatch.breaks.fetchAllUsers,
    fetchBreak: dispatch.breaks.fetchBreak,
    fetchBreakTime: dispatch.breaks.fetchBreakTime,
  }
}

export default connect(mapStateToProps, mapDispatch)(Statistics)
