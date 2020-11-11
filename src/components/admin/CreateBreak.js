import React from 'react'

class CreateBreak extends React.Component {
  render() {
    return (
      <div
        className='ui middle two column centered aligned grid'
        style={{ padding: '10px' }}
      >
        <div className='column'>
          <h2 className='ui teal image header'>
            <div className='content'>Create Break</div>
          </h2>
          <form className='ui large form'>
            <div className='ui stacked segment'>
              <div className='field'>
                <label>Name</label>
                <input type='text' name='name' placeholder='Enter Break Name' />
              </div>

              <div className='field'>
                <label>Break Length (Minutes)</label>
                <input
                  type='number'
                  name='breakLength'
                  placeholder='Enter Break Length'
                />
              </div>

              <div className='field'>
                <label>Times</label>
                <input
                  type='number'
                  name='times'
                  placeholder='Enter How Many Times Allowed'
                />
              </div>

              <div className='field'>
                <label>Grace Period Time (Minutes)</label>
                <input
                  type='number'
                  name='gracePeriod'
                  placeholder='Enter Grace Period'
                />
              </div>
              <div className='ui fluid large teal submit button'>Create</div>
            </div>
            <div className='ui error message' />
          </form>
        </div>
      </div>
    )
  }
}

export default CreateBreak
