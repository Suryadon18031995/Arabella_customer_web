import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import LoginComponent from './../components/BKMComponent/LoginComponent.jsx';
import { fetchLoginData } from '../actions/login';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: undefined,
      email: undefined,
      redirectToHome: false,
      errors: {},
      showError: false,
    };
  }

  componentDidMount() {
    document.title = 'Customer Login';
  }

  loginData = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.handleValidation()) {
        this.props.getLoginData({ email: this.state.email, password: this.state.pass });
      }
    }
  };

  loginDataclick = () => {
    if (this.handleValidation()) {
      this.props.getLoginData({ email: this.state.email, password: this.state.pass });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;
    // Email
    if (this.state.email === '') {
      formIsValid = false;
      errors.email = 'This is a required field.';
    }

    if (typeof this.state.email !== 'undefined' && this.state.email !== '') {
      const lastAtPos = this.state.email.lastIndexOf('@');
      const lastDotPos = this.state.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors.email = 'Please enter a valid email address. For example johndoe@domain.com.';
      }
    }

    if (this.state.pass === '') {
      formIsValid = false;
      errors.pass = 'this is a required field';
    }

    if (typeof this.state.pass !== 'undefined' && this.state.pass !== '') {
      if ((this.state.pass).length < 6) {
        formIsValid = false;
        errors.pass = 'Please enter 6 or more characters. Leading or trailing spaces will be ignored.';
      }
    }

    this.setState({ errors });
    return formIsValid;
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEmpty(_get(nextProps, 'loginData'))) {
      this.setState({
        loginResult: _get(nextProps.loginData, [0, 'message']),
      });
      if (_get(nextProps.loginData, [0, 'message']) === 'success') {
        this.setState({
          loginShow: true,
          redirectToHome: true,
          totalProd: _get(nextProps.loginData, [0, 'cartDetails', 'result']),
          totalProdInCart: _get(nextProps.loginData, [0, 'cartDetails', 'total_products_in_cart']),
          subtotal: _get(nextProps.loginData, [0, 'cartDetails', 'subtotal']),
        });
      } else {
        this.setState({
          showError: true,
        });
      }
    }
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect push to="/customer/account" />;
    }
    let forgotPasswordId; let forgotPasswordRes;
    if (this.props.location.state !== undefined) {
      forgotPasswordRes = this.props.location.state.msg;
      forgotPasswordId = this.props.location.state.id;
    }
    return (
      <div>
        <ErrorBoundary>
          <LoginComponent
            forgotPasswordRes={forgotPasswordRes}
            forgotPasswordId={forgotPasswordId}
            handleInputChange={this.handleInputChange}
            loginData={this.loginData}
            loginDataclick={this.loginDataclick}
            state={this.state}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLoginData: data => dispatch(fetchLoginData(data)),
});

const mapStateToProps = (state) => {
  const { loginReducer } = state;

  const {
    loginData,
    isFetching: isLoading,
    apiToken,
    error: loginError,
  } = loginReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError);

  return {
    loginData,
    apiToken,
    isLoading,
    error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(LoginContainer));
