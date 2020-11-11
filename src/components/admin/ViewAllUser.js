import React from 'react'

class ViewAllUser extends React.Component {
  render() {
    return (
      <div className='ui grid centered' style={{ padding: '10px' }}>
        <div className='column twelve wide'>
          <h2 className='ui teal image header'>
            <div className='content'>View All Users</div>
          </h2>
          <table className='ui table'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Eliza</td>
                <td>Carlos</td>
                <td>ecarlos.devacad@gmail.com</td>
                <td>Online</td>
                <td>
                  <button className='ui primary button'>Edit Details</button>
                </td>
              </tr>
              <tr>
                <td>Eliza</td>
                <td>Carlos</td>
                <td>ecarlos.devacad@gmail.com</td>
                <td>Online</td>
                <td>
                  <button className='ui primary button'>Edit Details</button>
                </td>
              </tr>
              <tr>
                <td>Eliza</td>
                <td>Carlos</td>
                <td>ecarlos.devacad@gmail.com</td>
                <td>Online</td>
                <td>
                  <button className='ui primary button'>Edit Details</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colSpan='3'>3 People</th>
                <th>2 Online</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }
}

export default ViewAllUser
