import React from 'react'

class Overlay extends React.Component {
  render() {
    return (
      <div className='ui active inverted dimmer'>
        <div className='ui big text loader'>Loading</div>
      </div>
    )
  }
}

export default Overlay
