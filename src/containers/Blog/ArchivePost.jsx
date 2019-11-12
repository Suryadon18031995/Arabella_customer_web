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
import ArticlePreview from '../../components/Blog/ArticlePreview.jsx';
import SocialMediaIcons from '../../components/Blog/SocialMediaIcons.jsx';
import { fetchBlogPostsData, fetchCatIdData, fetchBlogCategoriesData, fetchInstaFeedData } from '../../actions/blog';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class ArchivePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            archivesData: [],
            archivesList: [],
            recentPosts: [],
            searchValue: undefined,
            redirectToSearchPage: false,
            categoryList: this.props.blogCategories,
            breadCrumbsList: [],
            monthYear: _get(this.props, 'match.params.id').split('-'),
            currentImage: 0,
            currentImageLink: null,
        };
    }

    componentDidMount() {
        if (_isEmpty(this.props.blogPosts)) {
            this.props.fetchBlogsData();
        } else if (this.props.match.params.id.length !== 4) {
            const archivesData = _groupBy(_get(this.props, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
            const archivesList = Object.keys(archivesData);
            const posts = _get(archivesData, moment(this.props.match.params.id).format('YYYY MM'));
            const recentPosts = this.props.blogPosts.map(eachPost => ({
                id: _get(eachPost, 'id'),
                title: _get(eachPost, 'title.rendered'),
                imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
            }));
            this.setState({
                posts,
                recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                archivesData,
                archivesList,
                comments: this.props.commentsData > 5 ? this.props.commentsData.slice(0, 5) : this.props.commentsData,
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
                        link: `/blog/archive/${this.state.monthYear[0]}`,
                        name: this.state.monthYear[0],
                    },
                    {
                        link: undefined,
                        name: moment(new Date(_get(this.props, 'match.params.id').split('-').join(' '))).format('MMMM'),
                    },
                ],
            });
        } else if (this.props.match.params.id.length === 4) {
            const archivesDataYear = _groupBy(_get(this.props, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('year').format('YYYY'));
            const posts = _get(archivesDataYear, this.props.match.params.id);
            const recentPosts = this.props.blogPosts.map(eachPost => ({
                id: _get(eachPost, 'id'),
                title: _get(eachPost, 'title.rendered'),
                imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
            }));
            const archivesData = _groupBy(_get(this.props, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
            const archivesList = Object.keys(archivesData);
            this.setState({
                posts,
                archivesData,
                archivesList,
                comments: this.props.commentsData > 5 ? this.props.commentsData.slice(0, 5) : this.props.commentsData,
                recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                monthYear: undefined,
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
                        name: this.props.match.params.id,
                    },
                ],
            });
        }
        if (_isEmpty(this.state.categoryList)) {
            this.props.fetchBlogsCategoriesData();
        }
        if (_isEmpty(this.state.instaFeedData)) {
            this.props.fetchInstaFeedData();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.url.split('/')[2] === 'archive' && this.props.match.params.id.length === 4 && this.props.match.params.id !== prevProps.match.params.id) {
            const archivesData = _groupBy(_get(this.props, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('year').format('YYYY'));
            const posts = _get(archivesData, this.props.match.params.id);
            this.setState({
                posts,
                monthYear: undefined,
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
                        name: this.props.match.params.id,
                    },
                ],
            });
        }
        if (prevProps.match.url.split('/')[2] === 'archive' && this.props.match.params.id.length !== 4 && this.props.match.params.id !== prevProps.match.params.id) {
            const posts = _get(this.state.archivesData, moment(this.props.match.params.id).format('YYYY MM'));
            const monthYear = _get(this.props, 'match.params.id').split('-');
            this.setState({
                posts,
                monthYear,
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
                        link: `/blog/archive/${monthYear[0]}`,
                        name: monthYear[0],
                    },
                    {
                        link: undefined,
                        name: moment(_get(this.props, 'match.params.id').split('-').join(' ')).format('MMMM'),
                    },
                ],
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextprops) {
        if (!_isEmpty(nextprops.blogPosts)) {
            const recentPosts = nextprops.blogPosts && nextprops.blogPosts.map(eachPost => ({
                id: _get(eachPost, 'id'),
                title: _get(eachPost, 'title.rendered'),
                imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
            }));
            const archivesData = _groupBy(_get(nextprops, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
            const archivesList = Object.keys(archivesData);
            const posts = _get(archivesData, moment(this.props.match.params.id).format('YYYY MM'));
            this.setState({
                posts,
                recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                archivesData,
                archivesList,
            });
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
                            <div className="archive-title-span">Month</div>
                            {this.props.match.params.id.length !== 4 ? moment(this.props.match.params.id).format('MMMM YYYY') : this.props.match.params.id}
                        </h1>
                    </div>
                    <div className="blog-page">
                        {Array.isArray(this.state.posts) && this.state.posts.map(eachPost =>
                            <ErrorBoundary>
                                <ArticlePreview key={eachPost.id} post={eachPost} />
                            </ErrorBoundary>)}
                    </div>
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
    fetchInstaFeedData: () => dispatch(fetchInstaFeedData()),
});

const mapStateToProps = (state) => {
    const { blogReducer } = state;

    const {
        blogPosts,
        commentsData,
        blogCategories,
        error: blogError,
        // isFetching: isLoading,
        instaFeedData,
    } = blogReducer || [];

    const error = !_isEmpty(blogError) || _isError(blogError);

    return {
        blogPosts,
        commentsData,
        blogCategories,
        error,
        // isLoading,
        instaFeedData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ArchivePost));
