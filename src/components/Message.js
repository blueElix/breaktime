import React from 'react'
import { connect } from 'react-redux'

const Message = ({ messageResponse }) => {
  const renderMessage = () => {
    if (messageResponse) {
      return (
        <div className={`ui ${messageResponse.response} message`}>
          <div className="header">{messageResponse.header}</div>
          <p>{messageResponse.message}</p>
        </div>
      )
    } else {
      return
    }
  }

  return <div>{renderMessage()}</div>
}

const mapStateToProps = (store) => {
  return {
    messageResponse: store.breaks.messageResponse,
  }
}
export default connect(mapStateToProps)(Message)
