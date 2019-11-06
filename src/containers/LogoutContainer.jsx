// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import { Redirect } from 'react-router';
import { logoutFunction, requestUserLogout } from '../actions/login';
import { clearCartReducer } from '../actions/cart';
import { clearWishlistReducer } from '../actions/wishList';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

class LogoutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
        };
    }

    componentDidMount() {
        this.props.getLogoutData({ apiToken: this.props.apiToken });
        // this.props.clearCartData();
        setTimeout(() => {
            this.setState({ render: true });
        }, 5000);
    }

    render() {
        if (this.state.render) {
            return (<Redirect to='/' />);
        }
        return (
            <div className="logout"><div><h1>You are now Logged out</h1>
                <p>You have logged out and will be redirected to our home page in 5 seconds.</p></div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getLogoutData: (data) => {
        dispatch(requestUserLogout(data)),
            // dispatch(logoutFunction()),
            dispatch(clearCartReducer()),
            dispatch(clearWishlistReducer())
    },
    // clearCartData: () => dispatch(clearCartReducer()),
});

const mapStateToProps = (state) => {
    const { loginReducer } = state;

    const {
        loginData,
        isFetching: isLoading,
        error: loginError,
        apiToken,
    } = loginReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError);

    return {
        loginData,
        isLoading,
        error,
        apiToken,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(LogoutContainer));
