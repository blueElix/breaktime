import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class BreaktimeButton extends React.Component {
  state = {
    buttonData: {
      button: '',
      label: '',
      type: '',
    },
  }

  breakFunction = async (id) => {
    let breakStorage = localStorage.getItem('isOnBreak')
    console.log(id)
    if (breakStorage) {
      await this.props.endBreaktime(id)
      this.fetchBreakData()
      this.renderBreaktime()
    } else {
      const payload = {
        break: id,
      }
      this.props.createBreaktime(payload)
      this.fetchBreakData()
      this.renderBreaktime()
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

    breaktime.map((blist) => {
      if (
        blist.user === userData._id &&
        blist.break._id === breakId &&
        blist.createdAt === today &&
        userData.currentBreaktime
      ) {
        return this.setState({
          buttonData: {
            button: 'onBack',
            label: 'Back From Break',
            type: 'primary',
          },
        })
      } else if (
        blist.user === userData._id &&
        blist.break._id === breakId &&
        blist.createdAt === today &&
        blist.start &&
        blist.end
      ) {
        return this.setState({
          buttonData: {
            button: 'done',
            label: 'Done Break',
            type: 'secondary disabled',
          },
        })
      }
    })

    return (
      <button
        className={`ui button ${
          this.state.buttonData.type
            ? this.state.buttonData.type
            : defaultButtonData.type
        }`}
        onClick={() => alert('hello')}
      >
        {this.state.buttonData.label
          ? this.state.buttonData.label
          : defaultButtonData.label}
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
