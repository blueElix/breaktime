import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  componentDidMount() {
    this.importBreakList();
  }

  importBreakList = async () => {
    await this.props.fetchBreak();
    await this.props.fetchAllowedBreaks();
    await this.props.fetchUserData();
    await this.props.fetchBreakTime();

    if (this.props.userData === 'admin') {
      await this.props.fetchAllUsers();
    }
  };
  render() {
    return (
      <div className="ui container">
        <h2 className="ui center aligned icon header">
          <i className="circular users icon"></i>
          WELCOME!!
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    userData: store.breaks.userData,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchBreak: dispatch.breaks.fetchBreak,
    fetchAllowedBreaks: dispatch.breaks.fetchAllowedBreaks,
    fetchBreakTime: dispatch.breaks.fetchBreakTime,
    fetchUserData: dispatch.breaks.fetchUserData,
    fetchAllUsers: dispatch.breaks.fetchAllUsers,
  };
};

export default connect(mapStateToProps, mapDispatch)(Home);
