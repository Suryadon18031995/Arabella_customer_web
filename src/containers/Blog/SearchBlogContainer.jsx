import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import SocialMediaIcons from '../../components/Blog/SocialMediaIcons.jsx';
import SidebarBlog from '../../components/Blog/SidebarBlog.jsx';
import BreadcrumbBlog from '../../components/Blog/BreadcrumbBlog.jsx';
import ArticlePreview from '../../components/Blog/ArticlePreview.jsx';
import {
    fetchBlogPostsData,
    fetchCatIdData,
    fetchBlogCategoriesData,
    fetchCommentsData,
    fetchEachPostData,
    fetchInstaFeedData,
} from '../../actions/blog';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

function SearchLoaderBlog(props) {
    if (props.isLoading) {
        return (<div />);
    }
    return (<div>
        {props.posts.length > 0 ? <div className="archive-page-header">
            <h1 className="archive-page-title">
                Search Results For:{' '}{_get(props, 'searchText')}
            </h1>
        </div> :
            <div>
                <h1>Nothing Found</h1>
                <span>Sorry, but nothing matched your search terms. Please try again with some different keywords.</span>
                <div className="search-form">
                    <label style={{ width: '100%' }}>
                        <input type="search" className="search-field" placeholder="Search …"
                            value={props.searchValue}
                            onChange={props.handleSearchChange} />
                    </label>
                    <button type='submit' className="search-submit" onClick={props.handleSearchClick}>
                        Search
                        </button>
                </div>
            </div>}
        <div className="blog-page">
            {Array.isArray(props.posts) && props.posts.map(eachPost => <ArticlePreview key={eachPost.id} post={eachPost} />)}
        </div>
    </div>);
}

class SearchBlogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            archivesData: [],
            archivesList: [],
            recentPosts: [],
            categoryList: this.props.blogCategories,
            breadCrumbsList: [],
            searchValue: undefined,
            searchText: undefined,
            currentImage: 0,
            currentImageLink: null,
        };
    }

    componentDidMount() {
        this.props.fetchCommentsData();
        if (_get(this.props, 'location.state.searchValue')) {
            this.props.fetchBlogsPostsBySearch({ searchString: _get(this.props, 'location.state.searchValue') });
            this.setState({
                searchText: _get(this.props, 'location.state.searchValue'),
                searchValue: _get(this.props, 'location.state.searchValue'),
                breadCrumbsList: [
                    {
                        link: '/',
                        name: 'home',
                    },
                    {
                        link: '/blog',
                        name: 'Blog',
                    },
                    {
                        link: undefined,
                        name: `Search results for '${_get(this.props, 'location.state.searchValue')}'`,
                    },
                ],
            });
        }
        if (_isEmpty(this.props.blogPosts)) {
            this.props.fetchBlogsData();
        } else {
            const archivesData = _groupBy(_get(this.props, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
            const archivesList = Object.keys(archivesData);
            const recentPosts = this.props.blogPosts.map(eachPost => ({
                id: _get(eachPost, 'id'),
                title: _get(eachPost, 'title.rendered'),
                imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
            }));
            this.setState({
                recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                archivesList,
                comments: this.props.commentsData > 5 ? this.props.commentsData.slice(0, 5) : this.props.commentsData,
            });
        }
        if (_isEmpty(this.state.instaFeedData)) {
            this.props.fetchInstaFeedData();
        }
    }

    UNSAFE_componentWillReceiveProps(nextprops) {
        if (!_isEmpty(nextprops.commentsData)) {
            this.setState({ comments: nextprops.commentsData > 5 ? nextprops.commentsData.slice(0, 5) : nextprops.commentsData });
        }
        if (nextprops.fetchingType === 'RECEIVED_GET_EACH_POST') {
            this.setState({
                posts: nextprops.eachPost,
            });
        }
        if (!_isEmpty(nextprops.blogPosts)) {
            const recentPosts = nextprops.blogPosts && nextprops.blogPosts.map(eachPost => ({
                id: _get(eachPost, 'id'),
                title: _get(eachPost, 'title.rendered'),
                imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
            }));
            const archivesData = _groupBy(_get(nextprops, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
            const archivesList = Object.keys(archivesData);
            this.setState({
                recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                archivesList,
            });
        }
    }

    handleSearchChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        });
    }

    handleSearchClick = () => {
        this.props.fetchBlogsPostsBySearch({ searchString: this.state.searchValue });
        this.setState({
            searchText: this.state.searchValue,
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: '/blog',
                    name: 'Blog',
                },
                {
                    link: undefined,
                    name: `Search results for '${_get(this.state, 'searchValue')}'`,
                },
            ],
        });
    }

    onCurrentImageChange = (index) => {
        this.setState({
            currentImage: index,
            currentImageLink: _get(this.props.instaFeedData, [index, 'link']),
        });
    }

    render() {
        return (
            <div className="container container-main">
                <h1 className="blog-header-title text-center">Farm To Florist Konnection</h1>
                <div className="blog-page">
                    <BreadcrumbBlog list={this.state.breadCrumbsList} />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                    <ErrorBoundary>
                        <SearchLoaderBlog {...this.state}
                            isLoading={this.props.isLoading}
                            handleSearchChange={this.handleSearchChange}
                            handleSearchClick={this.handleSearchClick} />
                    </ErrorBoundary>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <ErrorBoundary>
                        <SidebarBlog
                            {...this.state}
                            handleSearchChange={this.handleSearchChange}
                            handleSearchClick={this.handleSearchClick}
                            onCurrentImageChange={this.onCurrentImageChange}
                            instaFeedData={this.props.instaFeedData}
                        />
                    </ErrorBoundary>
                </div>
                <SocialMediaIcons />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchBlogsData: () => dispatch(fetchBlogPostsData()),
    fetchPostCategory: () => dispatch(fetchCatIdData()),
    fetchBlogsCategoriesData: () => dispatch(fetchBlogCategoriesData()),
    fetchCommentsData: () => dispatch(fetchCommentsData()),
    fetchBlogsPostsBySearch: data => dispatch(fetchEachPostData(data)),
    fetchInstaFeedData: () => dispatch(fetchInstaFeedData()),
});

const mapStateToProps = (state) => {
    const { blogReducer } = state;

    const {
        blogPosts,
        commentsData,
        blogCategories,
        eachPost,
        isFetching: isLoading,
        type: fetchingType,
        error: blogError,
        instaFeedData,
    } = blogReducer || [];

    const error = !_isEmpty(blogError) || _isError(blogError);

    return {
        blogPosts,
        commentsData,
        blogCategories,
        eachPost,
        fetchingType,
        isLoading,
        error,
        instaFeedData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(SearchBlogContainer));
