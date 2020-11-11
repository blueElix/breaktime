import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class CreateBreak extends React.Component {
  // constructor(){
  //   this.state = {
  //     isBreak: false,
  //     currentBreakId: null,
  //     buttonArray: [],
  //     breakType: null,
  //   }

  //let {breaktime} = this.props
  // }
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

  breakFunction = async (id) => {
    let breakStorage = localStorage.getItem('isOnBreak')
    console.log(id)
    if (breakStorage) {
      await this.props.endBreaktime(id)
      this.fetchBreakData()
    } else {
      const payload = {
        break: id,
      }
      this.props.createBreaktime(payload)
      this.fetchBreakData()
    }
  }

  renderBreaktime() {
    const now = moment()
    const today = now.toISOString().split('T')[0]
    let { userData, breakList, breaktime } = this.props
    let buttonData = {}
    let breakStorage = localStorage.getItem('isOnBreak')

    if (!breakList) {
      let breakListStore = localStorage.getItem('breakList')
      breakList = JSON.parse(breakListStore)
    }

    if (!breaktime) {
      let breaktimeStore = localStorage.getItem('breaktime')
      breaktime = JSON.parse(breaktimeStore)
    }

    return breakList.map((list) => {
      return (
        <div className="item" key={list._id}>
          <div className="right floated content">
            {breaktime.map((blist) => {
              if (
                blist.user === userData._id &&
                blist.break._id === list._id &&
                blist.createdAt === today &&
                blist.start &&
                blist.end
              ) {
                buttonData = {
                  button: 'done',
                  label: 'Done Break',
                  type: 'secondary disabled',
                }
              } else if (
                blist.user === userData._id &&
                blist.break._id === list._id &&
                blist.createdAt === today &&
                userData.currentBreaktime
              ) {
                buttonData = {
                  button: 'onBack',
                  label: 'Back From Break',
                  type: 'primary',
                }
              } else {
                buttonData = {
                  button: 'take',
                  label: 'Take a Break',
                  type: breakStorage ? 'positive disabled' : 'positive',
                }
              }
            })}
            <button
              onClick={() => {
                this.breakFunction(list._id)
              }}
              className={`ui button 
            ${buttonData.type}`}
            >
              {buttonData.label}
            </button>
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
          <div className="ui middle aligned divided list">
            {breakListStore && breaktimeStore ? this.renderBreaktime() : ''}
          </div>
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
