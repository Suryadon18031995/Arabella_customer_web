import React, { Component } from 'react';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _sortBy from 'lodash/sortBy';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import TagsComponent from '../../components/MyAccount/TagsComponent.jsx';
import { fetchProductTags } from '../../actions/products';
import Loader from '../../components/Loader/Loader.jsx';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class TagsContainer extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);

        this.state = {
            data: undefined,
            redirectToDetailsPage: false,
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'MY ACCOUNT',
                },
            ],
        };
    }
    goBack() {
        this.props.history.goBack();
    }
    showTagsDetails = (row) => {
        this.setState({
            redirectToDetailsPage: true,
            tagId: _get(row, 'id'),
        });
    }

    componentDidMount() {
        this.props.getMyProductTags({
            apiToken: _get(this.props, 'apiToken'),
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(nextProps.tagsData.data) && _get(nextProps.tagsData, 'code')) {
            this.setState({
                data: _sortBy(_get(nextProps.tagsData, 'data'), 'name'),
            });
        }
    }
    render() {
        if (_get(this, 'props.isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }
        if (this.state.redirectToDetailsPage) {
            return <Redirect push to={{
                pathname: `/customer/account/tags/detail/${this.state.tagId}`,
                state: { tagId: this.state.tagId },
            }} />;
        }

        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">
                    <div className='container-block'>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <ErrorBoundary>
                                <OneColumLeft
                                    salesRepUser={this.props.salesRepUser}
                                    primeUser={this.props.primeUser}
                                    rewardsPointAmount={_get(this.props.userProfileData, ['rewardspoin_details', 'point_amount'], 0)}
                                />
                            </ErrorBoundary>
                        </div>
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <div>
                                <h2>My Tags</h2>
                                <ErrorBoundary>
                                    <TagsComponent data={this.state.data}
                                        showTagsDetails={this.showTagsDetails} />
                                </ErrorBoundary>
                                <div>
                                    <button onClick={this.goBack}>Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    getMyProductTags: data => dispatch(fetchProductTags(data)),
});

const mapStateToProps = (state) => {
    const {
        tagsReducer, loginReducer,
    } = state;

    const {
        apiToken,
        user,
        storeId,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
    } = loginReducer || [];

    const {
        tagsData,
        isFetching: isLoading,
        error: tagsError,
    } = tagsReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(tagsError) || _isError(tagsError);

    return {
        tagsData,
        isLoading,
        apiToken,
        user,
        storeId,
        salesRepUser,
        error,
        primeUser,
        userProfileData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(TagsContainer));
