import React from 'react'

class ViewAllBreaktime extends React.Component {
  render() {
    return (
      <div className='ui grid centered' style={{ padding: '10px' }}>
        <div className='column twelve wide'>
          <h2 className='ui teal image header'>
            <div className='content'>View All Breaktime</div>
          </h2>
          <table className='ui table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Break</th>
                <th>Start</th>
                <th>End</th>
                <th>Date</th>
                <th>Overbreak</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Eliza Carlos</td>
                <td>Coffee Break</td>
                <td>11:15 AM</td>
                <td>11:30 AM</td>
                <td>05-11-2020</td>
                <td>NO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ViewAllBreaktime
