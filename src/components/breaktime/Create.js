import React from 'react';
import { connect } from 'react-redux';
import BreaktimeButton from './BreaktimeButton';

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
    console.log(this.props, 'props');
    console.log(this.props.myBreaktime, 'myBreaktime');
    if (Array.isArray(this.props.myBreaktime)) {
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

            <div className="ui middle aligned divided list">
              {this.props.allowedBreakList.map((list) => {
                return (
                  <div className="item" key={list._id}>
                    <div className="right floated content">
                      {list.isFinished ? (
                        <button className="ui teal button disabled">
                          Finished
                        </button>
                      ) : this.props.userData.currentBreakId === list._id ? (
                        <button
                          onClick={() => {
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
    breakList: store.breaks.breakList,
    allowedBreakList: store.breaks.allowedBreakList,
    userData: store.breaks.userData,
    myBreaktime: store.breaks.myBreaktime,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchUserBreakTime: dispatch.breaks.fetchUserBreakTime,
    fetchUserData: dispatch.breaks.fetchUserData,
    fetchBreak: dispatch.breaks.fetchBreak,

    fetchAllowedBreaks: dispatch.breaks.fetchAllowedBreaks,
    createBreaktime: (payload) => dispatch.breaks.createBreaktime(payload),
    endBreaktime: (payload) => dispatch.breaks.endBreaktime(payload),
  };
};
export default connect(mapStateToProps, mapDispatch)(CreateBreak);
