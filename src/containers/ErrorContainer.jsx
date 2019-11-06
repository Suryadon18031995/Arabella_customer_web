import React from 'react';
// import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import BreadCrumbs from '../components/Common/BreadCrumbs.jsx';
import Loader from '../components/Loader/Loader.jsx';

class ErrorsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'Error',
                },
            ],
        };
    }

    render() {
        if (_get(this.props, 'isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container" style={{ minHeight: '500px' }}>
                    Sorry, Something went wrong!
                </div>
            </div>
        );
    }
}

// const mapDispatchToProps = dispatch => ({
// getContactData: data => dispatch(fetchContactData(data)),
// });

// const mapStateToProps = (state) => {
// const { contactReducer, loginReducer } = state;

// const {
// loginData,
// } = loginReducer || [];

// const {
// contactData,
// isFetching: isLoading,
// } = contactReducer || [];

// return {
// contactData,
// loginData,
// isLoading,
// };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ErrorsContainer);
export default ErrorsContainer;

// export default ErrorsContainer;
