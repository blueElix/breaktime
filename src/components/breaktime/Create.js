import React from 'react';
import { connect } from 'react-redux';
import BreaktimeButton from './BreaktimeButton';
import moment from 'moment';

const Loader = () => {
  return <div className="ui active centered inline loader"></div>;
};

class CreateBreak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBreaks: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserBreakTime();
  }

  render() {
    if (Array.isArray(this.props.myBreaktime)) {
      return (
        <div className="ui grid centered" style={{ padding: '10px' }}>
          <div className="column ten wide">
            <h2 className="ui teal image header">
              <div className="content">
                <span>
                  <i className="coffee icon"></i>
                </span>{' '}
                BREAKTIME{' '}
              </div>
            </h2>

            <div className="ui middle aligned divided list">
              {this.props.allowedBreakList.map((list) => {
                return (
                  <div className="item" key={list._id}>
                    {this.props.currentBreaktime &&
                    this.props.userData.currentBreakId === list._id ? (
                      <span>
                        <p style={{ fontSize: 10, color: 'teal' }}>
                          EXPECTED RETURN:{' '}
                          {moment(this.props.currentBreaktime.expected).format(
                            'hh:mmA',
                          )}
                        </p>
                      </span>
                    ) : null}

                    <div className="right floated content">
                      {this.props.isFetchingButton ? (
                        <button className="ui teal loading button">
                          Loading
                        </button>
                      ) : list.isFinished ? (
                        <button className="ui teal button disabled">
                          Finished
                        </button>
                      ) : this.props.userData.currentBreakId === list._id ? (
                        <button
                          onClick={() => {
                            this.props.setIsFetchingButton(true);
                            const payload = this.props.userData
                              .currentBreaktime;
                            this.props.endBreaktime(payload);
                          }}
                          className="ui teal button"
                        >
                          Return from break
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            this.props.setIsFetchingButton(true);
                            const payload = {
                              break: list._id,
                            };
                            this.props.createBreaktime(payload);
                          }}
                          className={`ui teal button ${
                            this.props.userData.currentBreakId ? 'disabled' : ''
                          }`}
                        >
                          Take Break
                        </button>
                      )}
                    </div>
                    <span className="ui avatar image">
                      <i
                        className="hourglass start icon"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <div className="content">
                      {list.name} - {list.lengthOfBreak}mins
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return <Loader />;
  }
}

const mapStateToProps = (store) => {
  return {
    isFetching: store.breaks.isFetching,
    isFetchingButton: store.breaks.isFetchingButton,
    breakList: store.breaks.breakList,
    allowedBreakList: store.breaks.allowedBreakList,
    userData: store.breaks.userData,
    myBreaktime: store.breaks.myBreaktime,
    currentBreaktime: store.breaks.currentBreaktime,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchUserBreakTime: dispatch.breaks.fetchUserBreakTime,
    fetchUserData: dispatch.breaks.fetchUserData,
    fetchBreak: dispatch.breaks.fetchBreak,
    setIsFetchingButton: dispatch.breaks.setIsFetchingButton,
    fetchAllowedBreaks: dispatch.breaks.fetchAllowedBreaks,
    createBreaktime: (payload) => dispatch.breaks.createBreaktime(payload),
    endBreaktime: (payload) => dispatch.breaks.endBreaktime(payload),
  };
};
export default connect(mapStateToProps, mapDispatch)(CreateBreak);
