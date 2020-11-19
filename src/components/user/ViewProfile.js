import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Loader from '../Loader';

const ViewProfile = ({ fetchUserData, userData }) => {
  // useEffect
  useEffect(() => {
    const cdm = async () => {
      await fetchUserData();
    };
    cdm();
  }, []);

  return (
    <div className="ui container">
      <h2 className="ui center aligned icon teal image header">
        <i className="circular user icon"></i>
        Profile
      </h2>

      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        {userData ? (
          <div className="column">
            <div className="ui list">
              <div className="item">
                <i className="user icon"></i>
                <div className="content">
                  {userData.fname} {userData.lname}
                </div>
              </div>

              <div className="item">
                <i className="mail icon"></i>
                <div className="content">
                  <a>{userData.email}</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    userData: store.breaks.userData,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchUserData: dispatch.breaks.fetchUserData,
  };
};
export default connect(mapStateToProps, mapDispatch)(ViewProfile);
