import React from 'react'
import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import Message from '../Message'

class EditProfile extends React.Component {
  handleSubmit = async (formValues) => {
    await this.props.updateUserData(formValues)
  }

  render() {
    let { userData, messageResponse } = this.props

    if (!userData) {
      let userStorage = localStorage.getItem('userData')
      userData = JSON.parse(userStorage)
    }

    return (
      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Edit Profile</div>
          </h2>
          {messageResponse ? <Message /> : ''}
          <ProfileForm
            initialValues={{
              fname: userData.fname,
              lname: userData.lname,
              email: userData.email,
            }}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    messageResponse: store.breaks.messageResponse,
    userData: store.breaks.userData,
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUserData: (payload) => dispatch.breaks.updateUserData(payload),
  }
}

export default connect(mapStateToProps, mapDispatch)(EditProfile)
