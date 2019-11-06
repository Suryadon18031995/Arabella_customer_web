// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import _isError from 'lodash/isError';
import moment from 'moment';
import Redirect from 'react-router/Redirect';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import SidebarBlog from '../../components/Blog/SidebarBlog.jsx';
import BreadcrumbBlog from '../../components/Blog/BreadcrumbBlog.jsx';
import SocialMediaIcons from '../../components/Blog/SocialMediaIcons.jsx';
import {
  fetchBlogPostsData,
  fetchCatIdData,
  fetchBlogCategoriesData,
  fetchCommentsData,
  fetchInstaFeedData,
} from '../../actions/blog';
import ArticlePreview from '../../components/Blog/ArticlePreview.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class BlogContainer extends Component {
  // constructor(props) {
  //   super(props);
  state = {
    posts: [],
    categoryList: [],
    carousalData: [],
    archivesData: [],
    archivesList: [],
    comments: undefined,
    searchValue: undefined,
    redirectToSearchPage: false,
    apiBroke: false,
    currentImage: 0,
    currentImageLink: null,
    breadCrumbsList: [
      {
        link: '/',
        name: 'home',
      },
      {
        link: undefined,
        name: 'Bloomkonnect Blog',
      },
    ],
  };
  // }

  componentDidMount() {
    document.title = 'Blog- Wholesale Flowers, Bulk Fresh Flowers';
    this.props.fetchBlogsData();
    this.props.fetchBlogsCategoriesData();
    this.props.fetchCommentsData();
    this.props.fetchInstaFeedData();
  }

  componentWillReceiveProps(nextprops) {
    if (!_isEmpty(nextprops.blogPosts)) {
      if (_get(nextprops.blogPosts, 'code') === 404) {
        return this.setState({ apiBroke: true });
      }
      const carousalData = nextprops.blogPosts && nextprops.blogPosts.map(eachPost => ({
        id: _get(eachPost, 'id'),
        title: _get(eachPost, 'title.rendered'),
        imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
      }));
      const archivesData = _groupBy(_get(nextprops, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
      const archivesList = Object.keys(archivesData);
      this.setState({
        posts: nextprops.blogPosts,
        carousalData: carousalData.length > 5 ? carousalData.slice(0, 5) : carousalData,
        archivesData,
        archivesList,
      });
    }
    if (!_isEmpty(nextprops.blogCategories)) {
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
        <div className='top-blog'>
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 left-div">
            <ErrorBoundary>
              <Carousel infiniteLoop showThumbs={false} autoPlay interval={5000} >
                {
                  Array.isArray(this.state.carousalData) && this.state.carousalData.length > 0 && this.state.carousalData && this.state.carousalData.map((eachData, index) => (
                    <div className="post" key={index}>
                      <img key={index} alt={eachData.title} src={eachData.imageUrl} />
                      <a href={`/blog/${eachData.id}`}>
                        <span className="legend">{eachData.title}</span>
                      </a>
                    </div>
                  ))
                }
              </Carousel>
            </ErrorBoundary>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 right-div">
            <div className='top-side-blog'>
              <img className='img-side'
                src={_get(this.state.carousalData, [0, 'imageUrl'])}
                alt={_get(this.state.carousalData, [0, 'title'])}
              />
              <a href={`/blog/${_get(this.state.carousalData, [0, 'id'])}`}>
                <span className='h3 side-title'>
                  {_get(this.state.carousalData, [0, 'title'])}
                </span>
              </a>
            </div>
            <div className='top-side-blog'>
              <img className='img-side'
                src={_get(this.state.carousalData, [1, 'imageUrl'])}
                alt={_get(this.state.carousalData, [1, 'title'])}
              />
              <a href={`/blog/${_get(this.state.carousalData, [1, 'id'])}`}>
                <span className='h3 side-title'>
                  {_get(this.state.carousalData, [1, 'title'])}
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="blog-page">
          <BreadcrumbBlog list={this.state.breadCrumbsList} />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
          <div className="blog-page">
            {this.state.apiBroke ? <span>Sorry. Something went wrong. Please try after sometime.</span> : null}
            {Array.isArray(this.state.posts) && this.state.posts.length > 0 && this.state.posts && this.state.posts.map(eachPost =>
              <ErrorBoundary>
                <ArticlePreview key={eachPost.id} post={eachPost} />
              </ErrorBoundary>)}
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <ErrorBoundary>
            <SidebarBlog
              {...this.state}
              recentPosts={this.state.carousalData}
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
  fetchInstaFeedData: () => dispatch(fetchInstaFeedData()),
});

const mapStateToProps = (state) => {
  const { blogReducer } = state;

  const {
    blogPosts,
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
    // catIds,
    blogCategories,
    commentsData,
    error,
    // isLoading,
    instaFeedData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BlogContainer));
