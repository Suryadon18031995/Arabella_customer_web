// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import Redirect from 'react-router/Redirect';
import SidebarBlog from '../../components/Blog/SidebarBlog.jsx';
import BreadcrumbBlog from '../../components/Blog/BreadcrumbBlog.jsx';
import SocialMediaIcons from '../../components/Blog/SocialMediaIcons.jsx';
import ArticlePreview from '../../components/Blog/ArticlePreview.jsx';
import {
    fetchEachPostData,
    fetchCatIdData,
    fetchBlogCategoriesData,
    fetchBlogPostsData,
    fetchCommentsData,
    fetchInstaFeedData,
} from '../../actions/blog';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class CategoryPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categoryList: this.props.blogCategories,
            recentPosts: [],
            breadCrumbsList: [],
            // archivesData: [],
            searchValue: undefined,
            redirectToSearchPage: false,
            archivesList: [],
            currentImage: 0,
            currentImageLink: null,
        };
    }

    componentDidMount() {
        if (_isEmpty(this.props.blogPosts)) {
            this.props.fetchBlogsData();
        } else {
            const recentPosts = this.props.blogPosts.map(eachPost => ({
                id: _get(eachPost, 'id'),
                title: _get(eachPost, 'title.rendered'),
                imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
            }));
            const archivesData = _groupBy(_get(this.props, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
            const archivesList = Object.keys(archivesData);
            this.setState({
                recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                archivesList,
            });
        }
        this.props.fetchCategoryBlogsData({ catId: this.props.location.hash.substring(1) });
        if (_isEmpty(this.state.categoryList)) {
            this.props.fetchBlogsCategoriesData();
        }
        this.setState({
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
                    name: _get(this.props, 'match.params.id').split('-').join(' '),
                },
            ],
        });
        this.props.fetchCommentsData();
        if (_isEmpty(this.state.instaFeedData)) {
            this.props.fetchInstaFeedData();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.url.split('/')[2] === 'category' && this.props.location.hash !== prevProps.location.hash) {
            this.props.fetchCategoryBlogsData({ catId: this.props.location.hash.substring(1) });
            this.setState({
                posts: [],
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
                        name: _get(this.props, 'match.params.id').split('-').join(' '),
                    },
                ],
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextprops) {
        if (nextprops.blogPosts) {
            const recentPosts = nextprops.blogPosts && nextprops.blogPosts.map(eachPost => ({
                id: _get(eachPost, 'id'),
                title: _get(eachPost, 'title.rendered'),
                imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
            }));
            const archivesData = _groupBy(_get(nextprops, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
            const archivesList = Object.keys(archivesData);
            this.setState({
                recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                // archivesData,
                archivesList,
            });
        }
        if (!_isEmpty(nextprops.eachPost)) {
            this.setState({
                posts: nextprops.eachPost,
            });
        }
        if (!_isEmpty(nextprops.blogCategories) && _isEmpty(this.state.categoryList)) {
            this.setState({ categoryList: nextprops.blogCategories });
        }
        if (!_isEmpty(nextprops.commentsData)) {
            this.setState({ comments: nextprops.commentsData > 5 ? nextprops.commentsData.slice(0, 5) : nextprops.commentsData });
        }
    }

    handleSearchChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        });
    }

    handleSearchClick = () => {
        this.setState({
            redirectToSearchPage: true,
        });
    }

    onCurrentImageChange = (index) => {
        this.setState({
            currentImage: index,
            currentImageLink: _get(this.props.instaFeedData, [index, 'link']),
        });
    }

    render() {
        if (this.state.redirectToSearchPage) {
            return (
                <Redirect push to={{
                    pathname: '/blog/search',
                    state: { searchValue: this.state.searchValue },
                }} />
            );
        }
        return (
            <div className="container container-main">
                <h1 className="blog-header-title text-center">Farm To Florist Konnection</h1>
                <div className="blog-page">
                    <BreadcrumbBlog list={this.state.breadCrumbsList} />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                    <div className="archive-page-header">
                        <h1 className="archive-page-title">
                            {_get(this.props, 'match.params.id').split('-').join(' ')}
                        </h1>
                    </div>
                    <div className="blog-page">
                        {Array.isArray(this.state.posts) && this.state.posts.length > 0 && this.state.posts.map(eachPost =>
                            <ErrorBoundary>
                                <ArticlePreview key={eachPost.id} post={eachPost} />
                            </ErrorBoundary>)}
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <ErrorBoundary>
                        <SidebarBlog {...this.state}
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
    fetchCategoryBlogsData: data => dispatch(fetchEachPostData(data)),
    fetchPostCategory: () => dispatch(fetchCatIdData()),
    fetchBlogsCategoriesData: () => dispatch(fetchBlogCategoriesData()),
    fetchBlogsData: () => dispatch(fetchBlogPostsData()),
    fetchCommentsData: () => dispatch(fetchCommentsData()),
    fetchInstaFeedData: () => dispatch(fetchInstaFeedData()),
});

const mapStateToProps = (state) => {
    const { blogReducer } = state;

    const {
        blogPosts,
        eachPost,
        // catIds,
        blogCategories,
        commentsData,
        error: blogError,
        // isFetching: isLoading,
        instaFeedData,
    } = blogReducer || [];

    const error = !_isEmpty(blogError) || _isError(blogError);
    return {
        blogPosts,
        eachPost,
        // catIds,
        blogCategories,
        commentsData,
        error,
        // isLoading,
        instaFeedData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(CategoryPost));
