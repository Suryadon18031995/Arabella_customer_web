import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import ForgotPasswordComponent from '../../components/BKMComponent/ForgotPasswordComponent.jsx';
import { fetchForgotPassword, clearForgotReducerData } from '../../actions/login';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class ForgotPasswordContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      redirectToLogin: false,
      result: undefined,
      errors: {},
    };
  }

  forgotPassword = () => {
    if (this.handleValidation()) {
      this.props.getForgotPassword({ email: this.state.email });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEmpty(_get(nextProps, 'forgotPasswordData'))) {
      if (_get(nextProps, ['forgotPasswordData', 0, 'code']) !== 1) {
        this.setState({
          redirectToLogin: false,
        });
        alert(_get(nextProps, ['forgotPasswordData', 0, 'message']));
      } else if (_get(nextProps, ['forgotPasswordData', 0, 'code']) === 1) {
        this.setState({
          redirectToLogin: true,
          result: _get(nextProps, ['forgotPasswordData', 0, 'message']),
        });
      }
      this.props.clearForgotData();
    }
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;
    // Email
    if (this.state.email === undefined) {
      formIsValid = false;
      errors.email = 'This is a required field.';
    }

    if (this.state.email !== undefined) {
      const lastAtPos = this.state.email.lastIndexOf('@');
      const lastDotPos = this.state.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors.email = 'Please enter a valid email address. For example johndoe@domain.com.';
      }
    }

    this.setState({ errors });
    return formIsValid;
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect push to={{ pathname: '/login', state: { msg: this.state.result, id: 'true' } }} />;
    }
    return (
      <div>
        <ErrorBoundary>
          <ForgotPasswordComponent
            state={this.state}
            handleInputChange={this.handleInputChange}
            forgotPassword={this.forgotPassword}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getForgotPassword: data => dispatch(fetchForgotPassword(data)),
  clearForgotData: () => dispatch(clearForgotReducerData()),
});

const mapStateToProps = (state) => {
  const { loginReducer } = state;

  const {
    forgotPasswordData,
    isFetching: isLoading,
    error: loginError,
  } = loginReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError);

  return {
    forgotPasswordData,
    isLoading,
    error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ForgotPasswordContainer));
