import React from 'react';
import { connect } from 'react-redux';
import BreakForm from './BreakForm';

class CreateBreak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMessage: {
        message: '',
        header: '',
        response: '',
      },
    };
  }

  handleSubmit = async (formValues) => {
    await this.props.createBreak(formValues);
    if (this.props.breakDataResponse.success) {
      let mes = {
        message: this.props.breakDataResponse.success,
        header: 'Form Completed',
        response: 'success',
      };
      this.setState({
        responseMessage: mes,
      });
    } else {
      let mes = {
        message: this.props.breakDataResponse.error,
        header: 'Error',
        response: 'error',
      };
      this.setState({
        responseMessage: mes,
      });
    }
  };

  render() {
    let { message, response, header } = this.state.responseMessage;
    return (
      <div
        className="ui middle two column centered aligned grid"
        style={{ padding: '10px' }}
      >
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Create Break</div>
          </h2>
          {message ? (
            <div className={`ui ${response} message`}>
              <div className="header">{header}</div>
              <p>{message}</p>
            </div>
          ) : (
            <div></div>
          )}
          <BreakForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    breakDataResponse: store.breaks.breakDataResponse,
  };
};
const mapDispatch = (dispatch) => {
  return {
    createBreak: (payload) => dispatch.breaks.createBreak(payload),
  };
};

export default connect(mapStateToProps, mapDispatch)(CreateBreak);
