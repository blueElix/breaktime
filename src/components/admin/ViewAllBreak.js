import React from 'react'

class ViewAllUser extends React.Component {
  render() {
    return (
      <div className='ui grid centered' style={{ padding: '10px' }}>
        <div className='column twelve wide'>
          <h2 className='ui teal image header'>
            <div className='content'>View All Break</div>
          </h2>
          <table className='ui table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Break Length(Minutes)</th>
                <th>Times</th>
                <th>Grace Period Time (Minutes)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Coffee Break</td>
                <td>15 Mins</td>
                <td>1</td>
                <td>5 Mins</td>
                <td>
                  <button class='ui primary button'>Edit Details</button>
                </td>
              </tr>
              <tr>
                <td>Coffee Break</td>
                <td>15 Mins</td>
                <td>1</td>
                <td>5 Mins</td>
                <td>
                  <button class='ui primary button'>Edit Details</button>
                </td>
              </tr>
              <tr>
                <td>Coffee Break</td>
                <td>15 Mins</td>
                <td>1</td>
                <td>5 Mins</td>
                <td>
                  <button class='ui primary button'>Edit Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ViewAllUser
