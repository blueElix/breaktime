import React from 'react'
import { connect } from 'react-redux'
import BreaktimeButton from './BreaktimeButton'

const Loader = () => {
  return <div className="ui active centered inline loader"></div>
}
class CreateBreak extends React.Component {
  state = {
    isBreak: false,
    currentBreakId: null,
    buttonArray: [],
    breakType: null,
  }
  componentDidMount() {
    this.fetchBreakData()
  }

  // componentDidUpdate(breaktime) {
  //   this.fetchBreakData()
  // }
  fetchBreakData = async () => {
    await this.props.fetchBreak()
    await this.props.fetchBreakTime()
    await this.props.fetchUserData()
  }

  renderBreaktime() {
    let { breakList } = this.props

    if (!breakList) {
      let breakListStore = localStorage.getItem('breakList')
      breakList = JSON.parse(breakListStore)
    }

    return breakList.map((list) => {
      return (
        <div className="item" key={list._id}>
          <div className="right floated content">
            <BreaktimeButton breakId={list._id} />
          </div>
          <span className="ui avatar image">
            <i className="hourglass start icon" aria-hidden="true"></i>
          </span>
          <div className="content">
            {list.name} - {list.lengthOfBreak}mins
          </div>
        </div>
      )
    })
  }

  render() {
    let breakListStore = localStorage.getItem('breakList')
    let breaktimeStore = localStorage.getItem('breaktime')
    return (
      <div className="ui grid centered" style={{ padding: '10px' }}>
        <div className="column ten wide">
          {this.props.isFetching ? (
            <div className="ui active centered inline loader"></div>
          ) : (
            ''
          )}
          <h2 className="ui teal image header">
            <div className="content">
              <span>
                <i className="coffee icon"></i>
              </span>{' '}
              BREAKTIME
            </div>
          </h2>
          {this.props.isFetching ? (
            <Loader />
          ) : (
            <div className="ui middle aligned divided list">
              {breakListStore && breaktimeStore ? (
                this.renderBreaktime()
              ) : (
                <Loader />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isFetching: store.breaks.isFetching,
    breakList: store.breaks.breakList,
    userData: store.breaks.userData,
    breaktime: store.breaks.breaktime,
    isOnBreak: store.breaks.isOnBreak,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchUserData: dispatch.breaks.fetchUserData,
    fetchBreak: dispatch.breaks.fetchBreak,
    fetchBreakTime: dispatch.breaks.fetchBreakTime,
    createBreaktime: (payload) => dispatch.breaks.createBreaktime(payload),
    endBreaktime: (payload) => dispatch.breaks.endBreaktime(payload),
  }
}
export default connect(mapStateToProps, mapDispatch)(CreateBreak)
