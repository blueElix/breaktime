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
  fetchUserData,
  userData,
  createBreaktime,
  endBreaktime,
  fetchUserBreakTime,
  myBreaktime,
}) => {
  // //states
  // const [isBreak, setIsBreak] = useState(false);
  // const [currentBreakId, setCurrentBreakId] = useState(null);
  // const [buttonArray, setButtonArray] = useState([]);
  // const [breakType, setBreakType] = useState(null);
  const [allowedBreakList, setAllowedBreakList] = useState(null);

  // useEffect
  useEffect(() => {
    const cdm = async () => {
      await fetchUserBreakTime();
      await fetchUserData();
      await fetchBreak();
      checkAllowedBreaks();
    };
    cdm();
  }, []);

  const checkAllowedBreaks = () => {
    console.log(breakList, 'breaklist');
    console.log(myBreaktime, 'myBreaktime');
    if (Array.isArray(breakList) && Array.isArray(myBreaktime)) {
      breakList.map((b, index) => {
        let bcount = 0;

        myBreaktime.map((m) => {
          if (m.breakname === b.name) {
            bcount = bcount + 1;
          }
          if (bcount >= b.times) {
            breakList[index].buttonDisabled = 'disabled';
            breakList[index].buttonValue = 'Finished';
          }
        });
      });

      setAllowedBreakList(breakList);
    }
  };

  const renderBreaktime = () => {
    console.log(allowedBreakList, 'allowedBreakList');

    return (
      <React.Fragment>
        {allowedBreakList.map((list) => {
          return (
            <div className="item" key={list._id}>
              <div className="right floated content">
                {/* {renderButton(list)} */}

                <button
                  onClick={() => {
                    console.log(userData, 'id');
                    if (list._id === userData.currentBreakId) {
                      const payload = userData.currentBreaktime;
                      endBreaktime(payload);
                      checkAllowedBreaks();
                    } else {
                      const payload = {
                        break: list._id,
                      };
                      createBreaktime(payload);
                      checkAllowedBreaks();
                    }
                  }}
                  className={`ui teal button ${
                    list.buttonValue
                      ? list.buttonDisabled
                      : list._id === userData.currentBreakId
                      ? 'active'
                      : ''
                  }
      `}
                >
                  {console.log(list.buttonValue, 'butonvalue')}
                  {list.buttonValue
                    ? list.buttonValue
                    : list._id === userData.currentBreakId
                    ? 'Return from break'
                    : 'Take a break'}
                </button>
              </div>
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
            {Array.isArray(allowedBreakList) &&
            userData &&
            Array.isArray(myBreaktime) ? (
              renderBreaktime()
            ) : (
              <Loader />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  console.log(store, 'store');
  return {
    isFetching: store.breaks.isFetching,
    breakList: store.breaks.breakList,
    userData: store.breaks.userData,
    myBreaktime: store.breaks.myBreaktime,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchUserBreakTime: dispatch.breaks.fetchUserBreakTime,
    fetchUserData: dispatch.breaks.fetchUserData,
    fetchBreak: dispatch.breaks.fetchBreak,

    createBreaktime: (payload) => dispatch.breaks.createBreaktime(payload),
    endBreaktime: (payload) => dispatch.breaks.endBreaktime(payload),
  };
};
export default connect(mapStateToProps, mapDispatch)(CreateBreak);
