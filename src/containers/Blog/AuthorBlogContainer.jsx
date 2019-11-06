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
import {
  fetchBlogPostsData,
  fetchCatIdData,
  fetchBlogCategoriesData,
  fetchEachPostData,
  fetchCommentsData,
  fetchInstaFeedData,
} from '../../actions/blog';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class AuthorBlogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      archivesList: [],
      recentPosts: [],
      searchValue: undefined,
      redirectToSearchPage: false,
      categoryList: this.props.blogCategories,
      breadCrumbsList: [],
      currentImage: 0,
      currentImageLink: null,
    };
  }

  componentDidMount() {
    this.props.fetchBlogsPostsByAuthorData({ authorId: _get(this.props, 'match.params.id') });
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
            name: `Articles by: ${_get(this.props, 'location.state.authorName')}`,
          },
        ],
      });
    }
    if (_isEmpty(this.state.categoryList)) {
      this.props.fetchBlogsCategoriesData();
    }
    this.props.fetchCommentsData();
    if (_isEmpty(this.state.instaFeedData)) {
      this.props.fetchInstaFeedData();
    }
  }

  componentWillReceiveProps(nextprops) {
    if (!_isEmpty(nextprops.eachPost)) {
      this.setState({
        posts: nextprops.eachPost,
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
            name: `Articles by: ${_get(nextprops.eachPost, [0, '_embedded', 'author', 0, 'name'])}`,
          },
        ],
      });
    }
    if (!_isEmpty(nextprops.blogCategories) && _isEmpty(this.state.categoryList)) {
      this.setState({ categoryList: nextprops.blogCategories });
    }
    if (!_isEmpty(nextprops.commentsData)) {
      this.setState({ comments: nextprops.commentsData > 5 ? nextprops.commentsData.slice(0, 5) : nextprops.commentsData });
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
              <div className="archive-title-span">Author</div>
              {_get(this.props, 'location.state.authorName') ? _get(this.props, 'location.state.authorName') : _get(this.state.posts, [0, '_embedded', 'author', 0, 'name'])}
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
  fetchBlogsPostsByAuthorData: data => dispatch(fetchEachPostData(data)),
  fetchCommentsData: () => dispatch(fetchCommentsData()),
  fetchInstaFeedData: () => dispatch(fetchInstaFeedData()),
});

const mapStateToProps = (state) => {
  const { blogReducer } = state;

  const {
    blogPosts,
    // catIds,
    blogCategories,
    eachPost,
    commentsData,
    error: blogError,
    // isFetching: isLoading,
    instaFeedData,
  } = blogReducer || [];

  const error = !_isEmpty(blogError) || _isError(blogError);

  return {
    blogPosts,
    // catIds,
    blogCategories,
    eachPost,
    commentsData,
    error,
    // isLoading,
    instaFeedData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(AuthorBlogContainer));
