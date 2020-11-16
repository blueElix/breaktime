import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BreaktimeButton from './BreaktimeButton';

const Loader = () => {
  return <div className="ui active centered inline loader"></div>;
};
const CreateBreak = ({
  isFetching,
  breakList,
  fetchBreak,
  fetchBreakTime,
  fetchUserData,
  userData,
  createBreaktime,
  endBreaktime,
  fetchUserBreakTime,
  myBreaktime,
  breaktime,
}) => {
  const fetchBreakData = async () => {
    await fetchBreak();
    await fetchBreakTime();
    await fetchUserData();
    await fetchUserBreakTime();
  };

  //states
  const [isBreak, setIsBreak] = useState(false);
  const [currentBreakId, setCurrentBreakId] = useState(null);
  const [buttonArray, setButtonArray] = useState([]);
  const [breakType, setBreakType] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);

  // useEffect
  useEffect(() => {
    const cdm = async () => {
      fetchBreakData();
    };
    cdm();
  }, []);

  const renderButton = ({ _id, times, name }) => {
    let bcount = 0;
    if (myBreaktime) {
      myBreaktime.map((m) => {
        if (m.end && m.breakname === name) {
          bcount = bcount + 1;
        }
      });
    }

    const clickFunction = () => {
      if (_id === userData.currentBreakId) {
        const payload = userData.currentBreaktime;
        endBreaktime(payload);
        fetchBreakData();
      } else {
        const payload = {
          break: _id,
        };
        createBreaktime(payload);
        fetchBreakData();
      }
    };

    let active = '';
    let buttonValue = 'Take break';
    let buttonDisabled = '';
    if (userData.currentBreakId) {
      buttonDisabled = 'disabled';
    }
    if (_id === userData.currentBreakId) {
      buttonDisabled = '';
      active = 'active';
      buttonValue = 'Return from break';
    }
    if (bcount >= times) {
      buttonDisabled = 'disabled';
      buttonValue = 'FInished';
    }

    return (
      <React.Fragment>
        {/* <div className="ui active inverted dimmer">
          <div className="ui big text loader">Loading</div>
        </div> */}
        <button
          className={`ui teal button ${active} ${buttonDisabled}
    `}
          onClick={() => {
            clickFunction();
          }}
        >
          {buttonValue}
        </button>
      </React.Fragment>
    );
  };

  const renderBreaktime = () => {
    return (
      <React.Fragment>
        {breakList.map((list) => {
          return (
            <div className="item" key={list._id}>
              <div className="right floated content">{renderButton(list)}</div>
              <span className="ui avatar image">
                <i className="hourglass start icon" aria-hidden="true"></i>
              </span>
              <div className="content">
                {list.name} - {list.lengthOfBreak}mins
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  let breakListStore = localStorage.getItem('breakList');
  let breaktimeStore = localStorage.getItem('breaktime');

  return (
    <div className="ui grid centered" style={{ padding: '10px' }}>
      <div className="column ten wide">
        <h2 className="ui teal image header">
          <div className="content">
            <span>
              <i className="coffee icon"></i>
            </span>{' '}
            BREAKTIME
          </div>
        </h2>
        {isFetching ? (
          <Loader />
        ) : (
          <div className="ui middle aligned divided list">
            {breakListStore && breaktimeStore ? renderBreaktime() : <Loader />}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    isFetching: store.breaks.isFetching,
    breakList: store.breaks.breakList,
    userData: store.breaks.userData,
    breaktime: store.breaks.breaktime,
    isOnBreak: store.breaks.isOnBreak,
    myBreaktime: store.breaks.myBreaktime,
    breaktimeTaken: store.breaks.breaktimeTaken,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchUserBreakTime: dispatch.breaks.fetchUserBreakTime,
    fetchUserData: dispatch.breaks.fetchUserData,
    fetchBreak: dispatch.breaks.fetchBreak,
    fetchBreakTime: dispatch.breaks.fetchBreakTime,
    createBreaktime: (payload) => dispatch.breaks.createBreaktime(payload),
    endBreaktime: (payload) => dispatch.breaks.endBreaktime(payload),
    setBreaktimeTaken: (payload) => dispatch.breaks.setBreaktimeTaken(payload),
  };
};
export default connect(mapStateToProps, mapDispatch)(CreateBreak);
