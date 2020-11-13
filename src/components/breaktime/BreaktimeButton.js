import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class BreaktimeButton extends React.Component {
  breakFunction = async (id) => {
    let breakStorage = localStorage.getItem('isOnBreak')
    console.log(id)
    if (breakStorage) {
      await this.props.endBreaktime(id)
      await this.props.fetchBreakTime()
    } else {
      const payload = {
        break: id,
      }
      await this.props.createBreaktime(payload)
      await this.props.fetchBreakTime()
    }
  }

  render() {
    const now = moment()
    const today = now.toISOString().split('T')[0]
    let { breakId, breaktime, userData } = this.props
    let breakStorage = localStorage.getItem('isOnBreak')
    let defaultButtonData = {
      button: 'take',
      label: 'Take a Break',
      type: breakStorage ? 'positive disabled' : 'positive',
    }

    if (!breaktime) {
      let breaktimeStore = localStorage.getItem('breaktime')
      breaktime = JSON.parse(breaktimeStore)
    }

    if (!userData) {
      let userStore = localStorage.getItem('userData')
      userData = JSON.parse(userStore)
    }

    console.log(breakId)

    let buttonData = breaktime.map((blist) => {
      let data = {
        button: '',
        label: '',
        type: '',
        breakId: blist.break._id,
      }
      if (
        blist.user === userData._id &&
        blist.break._id === breakId &&
        blist.createdAt === today &&
        userData.currentBreaktime
      ) {
        data = {
          button: 'onBack',
          label: 'Back From Break',
          type: 'primary',
          breakId: blist.break._id,
        }
      } else if (
        blist.user === userData._id &&
        blist.break._id === breakId &&
        blist.createdAt === today &&
        blist.start &&
        blist.end
      ) {
        data = {
          button: 'done',
          label: 'Done Break',
          type: 'secondary disabled',
          breakId: blist.break._id,
        }
      }
      return data
    })

    return (
      <button
        className={`ui button ${
          buttonData.breakId === breakId
            ? buttonData.type
            : defaultButtonData.type
        }`}
        onClick={() => {
          this.breakFunction(breakId)
        }}
      >
        {buttonData.label ? buttonData.label : defaultButtonData.label}
      </button>
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
export default connect(mapStateToProps, mapDispatch)(BreaktimeButton)
