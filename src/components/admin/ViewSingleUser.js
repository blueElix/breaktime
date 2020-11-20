import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';

import moment from 'moment';

const ItemContainer = ({ title, name }) => {
  return (
    <div className="item">
      <div className="content">
        <div className="ui sub header">{title}</div>
        {name}
      </div>
    </div>
  );
};

class ViewAllUser extends React.Component {
  componentDidMount() {
    this.fetchUsersData();
  }

  fetchUsersData = async () => {
    await this.props.fetchSingleUser(this.props.match.params.id);
    await this.props.fetchSingleUserBreaktime(this.props.match.params.id);
  };

  renderUserBreaktime = () => {
    let { userBreaktime } = this.props;
    if (Array.isArray(userBreaktime)) {
      return userBreaktime.map((btime) => {
        return (
          <tr key={btime._id}>
            <td>{btime.breakname}</td>
            <td>{btime.createdAt}</td>
            <td>{moment(btime.start).format('hh:mmA')}</td>
            <td>{moment(btime.end).format('hh:mmA')}</td>
            <td>{btime.overbreak ? 'YES' : 'NO'}</td>
            <td>{btime.minsLate}</td>
          </tr>
        );
      });
    }

    return <Loader />;
  };

  renderTable = () => {
    return (
      <table className="ui table">
        <thead>
          <tr>
            <th>Break Name</th>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Overbrake</th>
            <th>Mins. Late</th>
          </tr>
        </thead>
        <tbody>{this.renderUserBreaktime()}</tbody>
      </table>
    );
  };
  render() {
    let { isFetchingUser, singleUser, userBreaktime } = this.props;
    console.log(userBreaktime, 'userBreaktime');
    if (isFetchingUser || !singleUser) {
      return <Loader />;
    }
    return (
      <div className="ui grid centered" style={{ padding: '10px' }}>
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">View Single User</div>
          </h2>
          <div className="content">
            <div className="ui horizontal list">
              <ItemContainer name={singleUser.fname} title="FIRST NAME" />
              <ItemContainer name={singleUser.lname} title="LAST NAME" />
              <ItemContainer name={singleUser.email} title="EMAIL" />
            </div>
          </div>
          {Array.isArray(userBreaktime) && userBreaktime.length > 0 ? (
            this.renderTable()
          ) : (
            <div className="ui warning message">
              <i className="close icon"></i>
              <div className="header">Sorry</div>
              This user doesn't have breaktime list to show.
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    userBreaktime: store.breaks.userBreaktime,
    singleUser: store.breaks.singleUser,
    isFetchingUser: store.breaks.isFetchingUser,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchSingleUser: (id) => dispatch.breaks.fetchSingleUser(id),
    fetchSingleUserBreaktime: (id) =>
      dispatch.breaks.fetchSingleUserBreaktime(id),
  };
};

export default connect(mapStateToProps, mapDispatch)(ViewAllUser);
