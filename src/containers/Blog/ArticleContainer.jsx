// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import ReactDOM from 'react-dom';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';
import _isError from 'lodash/isError';
import moment from 'moment';
import Link from 'react-router-dom/Link';
import Redirect from 'react-router/Redirect';
import _groupBy from 'lodash/groupBy';
import SidebarBlog from '../../components/Blog/SidebarBlog.jsx';
import BreadcrumbBlog from '../../components/Blog/BreadcrumbBlog.jsx';
import SocialMediaIcons from '../../components/Blog/SocialMediaIcons.jsx';
import CommentsForm from '../../components/Blog/CommentForm.jsx';
import {
    fetchEachPostData,
    // fetchCatIdData,
    fetchBlogPostsData,
    fetchBlogCommentsData,
    postBlogCommentData,
    fetchCommentsData,
    // fetchTagNamesData,
    fetchInstaFeedData,
} from '../../actions/blog';
import authorAvatar from '../../assets/images/author_avatar.png';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            fields: {},
            errors: {},
            recentPosts: [],
            searchValue: undefined,
            redirectToSearchPage: false,
            breadCrumbsList: [],
            category: undefined,
            previousPost: undefined,
            nextPost: undefined,
            comments: undefined,
            flag: false, // for page refresh
            showReplyForm: false,
            showReplyId: undefined,
            currentImage: 0,
            currentImageLink: null,
        };
    }

    findPrevAndNextBlogHandler = (index) => {
        let previousPost = index - 1;
        let nextPost = index + 1;

        if (previousPost >= 0) {
            previousPost = { id: _get(this.props.blogPosts, [previousPost, 'id']), title: _get(this.props.blogPosts[previousPost], 'title.rendered') };
        } else {
            previousPost = undefined;
        }

        if (nextPost < this.props.blogPosts.length) {
            nextPost = { id: _get(this.props.blogPosts[nextPost], 'id'), title: _get(this.props.blogPosts[nextPost], 'title.rendered') };
        } else {
            nextPost = undefined;
        }

        this.setState({
            previousPost,
            nextPost,
        });
    }

    scrollToDiv = () => {
        const hashId = this.props.history.location.hash;
        if (hashId === '#blogscomment') {
            const blogscommentNode = ReactDOM.findDOMNode(this.refs.blogscomment);
            window.scrollTo(0, blogscommentNode.offsetTop);
        }
        // else {
        //     const articleNode = ReactDOM.findDOMNode(this.refs.articleNode);
        //     window.scrollTo(0, articleNode.offsetTop);
        // }
    }

    handleScroll = () => {
        this.scrollToDiv();
    }

    componentDidMount() {
        this.props.fetchPostData({ postId: _get(this.props, 'match.params.id') });

        this.props.fetchCommentsData({ postId: _get(this.props, 'match.params.id') });

        // if (_get(this.props, 'eachPost') !== undefined) {
        //     const eachPost = _get(this.props, 'eachPost');

        //     for (const singlePost of eachPost) {
        //         this.props.fetchPostCategory(_get(singlePost, 'categories').join());
        //         break;
        //     }
        // }

        if (this.props.blogPosts) {
            const recentPosts = this.props.blogPosts.map((eachPost, index) => {
                const currentPost = _get(this.props, ['eachPost', 0]);

                if (_get(eachPost, 'id') === _get(currentPost, 'id')) {
                    this.findPrevAndNextBlogHandler(index);
                }

                return {
                    id: _get(eachPost, 'id'),
                    title: _get(eachPost, 'title.rendered'),
                };
            });
            const archivesData = _groupBy(_get(this.props, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
            const archivesList = Object.keys(archivesData);
            this.setState({
                recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                archivesList,
            });
        } else {
            this.props.fetchBlogsData();
        }
        if (this.props.history.location.hash) {
            this.scrollToDiv();
        }
        this.props.fetchAllCommentsData();
        if (_isEmpty(this.state.instaFeedData)) {
            this.props.fetchInstaFeedData();
        }
    }

    componentDidUpdate(previousProps) {
        if (_get(previousProps, 'match.params.id') !== undefined && _get(this.props, 'match.params.id') !== undefined && _get(previousProps, 'match.params.id') !== _get(this.props, 'match.params.id')) {
            this.props.fetchPostData({ postId: _get(this.props, 'match.params.id') });
            this.props.fetchCommentsData({ postId: _get(this.props, 'match.params.id') });
            this.setState({ post: [], comments: undefined });
        }
    }

    dateFormatHandler = (date) => {
        date = new Date(date);

        const months = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let hours = date.getHours();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // to show 12 instead of 0

        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${hours}:${date.getMinutes()} ${ampm}`;
    }

    componentWillReceiveProps(nextprops) {
        if (!_isEmpty(nextprops.commentsData)) {
            this.setState({ commentsData: nextprops.commentsData > 5 ? nextprops.commentsData.slice(0, 5) : nextprops.commentsData });
        }
        if (!_isEmpty(nextprops.eachPost) && nextprops.eachPost.length === 1 && _get(nextprops, ['eachPost', 0, 'id']) == _get(this.props, 'match.params.id') && _isEmpty(this.state.post)) {
            // this.props.fetchTagNamesBlogData(_get(nextprops.eachPost, [0, 'tags']).join());
            this.setState({
                post: _get(nextprops, ['eachPost', 0]),
                category: _get(nextprops.eachPost, [0, '_embedded', 'wp:term', 0, 0]),
                tagsData: _get(nextprops.eachPost, [0, '_embedded', 'wp:term', 1]),
                breadCrumbsList: [
                    {
                        link: '/',
                        name: 'home',
                    },
                    {
                        link: '/blog',
                        name: 'Bloomkonnect Blog',
                    },
                    {
                        link: `/blog/category/${_get(nextprops.eachPost, [0, '_embedded', 'wp:term', 0, 0, 'slug'])}#${_get(nextprops.eachPost, [0, '_embedded', 'wp:term', 0, 0, 'id'])}`,
                        name: _get(nextprops.eachPost, [0, '_embedded', 'wp:term', 0, 0, 'name']),
                    },
                    {
                        link: undefined,
                        name: _get(nextprops, ['eachPost', 0, 'title', 'rendered']),
                    },
                ],
            });
        }
        // if (!_isEmpty(nextprops.tagsData)) {
        //     this.setState({ tagsData: nextprops.tagsData });
        // }

        if (nextprops.fetchingType === 'RECEIVED_BLOG_COMMENTS') {
            let tempComments = nextprops.blogComments;
            tempComments = _sortBy(tempComments, 'id');
            const childComments = [];
            const parentComments = [];
            let comments = [];

            Array.isArray(tempComments) && tempComments.length > 0 && tempComments.map((element) => {
                if (_get(element, 'parent') !== 0) {
                    childComments.push({
                        id: _get(element, 'id'),
                        author_name: element.author_name,
                        comment: _get(element, 'content.rendered'),
                        date: this.dateFormatHandler(element.date),
                        // date_gmt: this.dateFormatHandler(element.date_gmt),
                        image: _get(element, 'author_avatar_urls.96'),
                        parent: _get(element, 'parent'),
                        hasChild: !_isEmpty(_get(element, ['_links', 'children'])),
                    });
                } else {
                    parentComments.push({
                        id: _get(element, 'id'),
                        author_name: element.author_name,
                        comment: _get(element, 'content.rendered'),
                        date: this.dateFormatHandler(element.date),
                        // date_gmt: this.dateFormatHandler(element.date_gmt),
                        image: _get(element, 'author_avatar_urls.96'),
                        parent: _get(element, 'parent'),
                        hasChild: !_isEmpty(_get(element, ['_links', 'children'])),
                    });
                }
            });

            parentComments.map((each) => {
                comments.push(each);
                if (each.hasChild) {
                    comments = [...comments, ..._filter(childComments, ['parent', each.id])];
                }
            });

            this.setState({
                comments,
            });
        }

        if (!_isEmpty(nextprops.postComment) && this.state.flag) {
            let comments = this.state.comments.slice();
            const { fields } = this.state;
            const field = {
                id: fields.authorComment,
                author_name: fields.authorName,
                comment: fields.authorComment,
                date: this.dateFormatHandler(new Date().toDateString()),
                image: 'empty',
                parent: _get(this.state, 'showReplyId'),
            };
            if (this.state.showReplyId) {
                const index = _findIndex(comments, ['id', this.state.showReplyId]);
                let tempComments = [];
                tempComments = comments.slice(0, index + 1);
                tempComments.push(field);
                tempComments = [...tempComments, ...comments.slice(index + 1, comments.length)];
                comments = tempComments;
            } else {
                comments.push(field);
            }

            this.setState({
                fields: {},
                errors: {},
                comments,
                showReplyForm: false,
                showReplyId: undefined,
            });
        }

        if (!_isEmpty(nextprops.blogPosts)) {
            const recentPosts = nextprops.blogPosts && nextprops.blogPosts.map((eachPost, index) => {
                const currentPost = _get(nextprops, ['eachPost', 0]);

                if (_get(eachPost, 'id') === _get(currentPost, 'id')) {
                    this.findPrevAndNextBlogHandler(index);
                }

                return {
                    id: _get(eachPost, 'id'),
                    title: _get(eachPost, 'title.rendered'),
                };
            });

            if (_isEmpty(this.state.recentPosts)) {
                this.setState({
                    recentPosts: recentPosts.length > 5 ? recentPosts.slice(0, 5) : recentPosts,
                });
            }
        }

        //         if (!_isEmpty(nextprops.catIds)) {
        //             this.setState({
        //                 category: {
        //                     id: _get(nextprops.catIds, 'id'),
        //                     name: _get(nextprops.catIds, 'name'),
        //                     slug: _get(nextprops.catIds, 'slug'),
        //             },
        // });
        //         }
    }

    createMarkup = content => ({ __html: content });

    handleReply = (id) => {
        this.setState({ showReplyForm: true, showReplyId: id });
    }

    handleReplyCancel = () => {
        this.setState({ showReplyForm: false, showReplyId: undefined });
    }

    populateCommentHandler = element => (
        <li key={_get(element, 'id')} className={_get(element, 'parent') !== 0 ? 'blog-comments-list-item-reply' : 'blog-comments-list-item'}>
            <div className="row blog-comment">
                <div>
                    <div className="col-lg-2">
                        {
                            element.image === 'empty' ? (<img src={authorAvatar} />) : (<img src={element.image} />)
                        }
                    </div>
                    <div className="col-lg-10">
                        <p className="author_name"><a href="">{element.author_name}</a></p>
                        <p className="comment-date"><a href="">{element.date}</a></p>
                        {
                            element.image === 'empty' ? (
                                <p className="comment-awaiting-moderation">Your comment is awaiting moderation. This is a preview, your comment will be visible after it has been approved.</p>

                            ) : ('')
                        }
                        <p className="comment-content" dangerouslySetInnerHTML={this.createMarkup(element.comment)} />
                    </div>
                </div>
            </div>
            <div className="blog-reply">
                <a onClick={() => this.handleReply(_get(element, 'id'))}>Reply</a>
                <hr />
            </div>
            {this.state.showReplyForm && _get(element, 'id') === this.state.showReplyId && <CommentsForm
                showReplyForm={this.state.showReplyForm}
                fileds={this.state.fields}
                errors={this.state.errors}
                handleChange={this.handleChange}
                postCommentHandler={this.postCommentHandler}
                handleReplyCancel={this.handleReplyCancel}
            />}
        </li>
    )

    commentTitleHandler = () => {
        const commentTitle = this.state.comments.length === 1 ? `One thought on "${_get(this.state, 'post.title.rendered')}"` : `${this.state.comments.length} thoughts on "${_get(this.state, 'post.title.rendered')}"`;
        return commentTitle;
    }

    handleChange = (event) => {
        const fields = this.state.fields.slice();
        fields[event.target.id] = event.target.value;
        this.setState({ fields });
    }

    postCommentHandler = () => {
        if (this.validateCommentHandler()) {
            const data = {
                authEmail: this.state.fields.authorEmail,
                authName: this.state.fields.authorName,
                content: this.state.fields.authorComment,
                post: _get(this.state, 'post.id'),
                authUrl: this.state.fields.authorWebsite,
                parent: this.state.showReplyForm ? this.state.showReplyId : undefined,
            };
            // should add comment parent if its a reply to a comment.
            this.props.postUserCommentData(data);
            this.setState({ flag: true });
        }
    }

    validateCommentHandler = () => {
        let fields, errors, isFormValid;

        fields = this.state.fields;
        errors = {};
        isFormValid = true;

        if (!fields.authorComment) {
            isFormValid = false;
            errors.authorComment = 'This is a required field.';
        }

        if (!fields.authorName) {
            isFormValid = false;
            errors.authorName = ' This is a required field.';
        }

        if (!fields.authorEmail) {
            isFormValid = false;
            errors.authorEmail = ' This is a required field.';
        } else if (!fields.authorEmail.includes('@') || !fields.authorEmail.includes('.com')) {
            isFormValid = false;
            errors.authorEmail = ' Invalid value for Email.';
        }

        this.setState({ errors });
        return isFormValid;
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
        // To List Categories
        const postUnder = this.state.category !== undefined ? (<div className="category-list-blogs"><a href={`/blog/category/${this.state.category.slug}#${_get(this.state, 'category.id')}`} rel="category tag">{_get(this.state, ('category.name')).toUpperCase()}</a></div>) : '';

        // To Display Previous Post
        const previousPost = this.state.previousPost !== undefined ? (<div className="blogs-nav-prev"><a href={`/blog/${_get(this.state, ('previousPost.id'))}`}>{`<--${_get(this.state, ('previousPost.title'))}`}</a></div>) : <div className="blogs-nav-prev"></div>; // need to change this arrow later.

        // To Display Next Post
        const nextPost = this.state.nextPost !== undefined ? (<div className="blogs-nav-next"><a href={`/blog/${_get(this.state, ('nextPost.id'))}`}>{`${_get(this.state, ('nextPost.title'))}-->`}</a></div>) : <div className="blogs-nav-next"></div>;

        const comments = Array.isArray(this.state.comments) && this.state.comments.length > 0 ? (
            this.state.comments.map(current => this.populateCommentHandler(current))
        ) : (<div></div>);

        const commentHeading = (this.state.comments !== undefined && this.state.comments.length > 0) ? (
            <div>
                <h2 className="blog-comment-title">{this.commentTitleHandler()}</h2>
            </div>
        ) : (<div></div>);

        return (
            <div className="container container-main">
                <h1 className="blog-header-title text-center">Farm To Florist Konnection</h1>
                <div className="blog-page">
                    <BreadcrumbBlog
                        list={this.state.breadCrumbsList} />
                </div>
                <div ref="article" className="col-lg-8 col-md-8 col-sm-8 col-xs-12 blog">
                    {this.props.isLoading && <div></div>}
                    {!this.props.isLoading && <div><h1 className="sectionTitle">{_get(this.state, 'post.title.rendered')}</h1>
                        <div className="genpost-entry-meta">
                            <span className="posted-on blog-title">
                                {/* <a href={`/blog/${props.post.id}`}> */}
                                <span>
                                    {moment(this.state.post.date).format('MMMM D, YYYY')}
                                </span>
                                {/* </a> */}
                            </span>
                            <span className="byline">
                                <span className="author vcard blog-title">
                                    <Link
                                        to={{
                                            pathname: `/blog/author/${_get(this.state, ['post', '_embedded', 'author', 0, 'id'])}`,
                                            state: { authorName: _get(this.state, ['post', '_embedded', 'author', 0, 'name']) },
                                        }}
                                    >
                                        {/* <a href={`/blog/author/${_get(props, ['post', '_embedded', 'author', 0, 'id'])}`} className="url fn n"> */}
                                        {_get(this.state, ['post', '_embedded', 'author', 0, 'name'])}
                                        {/* </a> */}
                                    </Link>
                                </span>
                            </span>
                        </div>

                        {_get(this.state.post, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'full', 'source_url']) ? (
                            <img
                                className="img-responsive webpic"
                                alt="article header"
                                src={_get(this.state.post, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'full', 'source_url'])}
                            />
                        ) : (
                                ''
                            )}
                        <div className="content" dangerouslySetInnerHTML={this.createMarkup(_get(this.state, 'post.content.rendered'))} />
                        <div>
                            {/* Category to which current post is mapped. */}
                            <div>
                                <div className="pu-blogs">POSTED  UNDER</div>
                                {postUnder}
                            </div>
                            <div>
                                {Array.isArray(this.state.tagsData) && this.state.tagsData.length > 0 && <div className="pu-blogs">TAGGED</div>}
                                {Array.isArray(this.state.tagsData) && this.state.tagsData.length > 0 && this.state.tagsData.map((eachTag, index) => (
                                    <div className="category-list-blogs" key={index}>
                                        <a href={`/blog/tags/${eachTag.slug}#${eachTag.id}`} rel="category tag">
                                            {eachTag.name.toUpperCase()}
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            {previousPost}
                            {nextPost}
                            <hr />
                            {/* User Comments */}
                            <div ref='blogscomment'>
                                {commentHeading}
                                <ul className="blog-comments-list">
                                    {comments}
                                </ul>
                            </div>
                            {/* User Comment Form */}
                            {!this.state.showReplyForm &&
                                <CommentsForm
                                    showReplyForm={this.state.showReplyForm}
                                    fileds={this.state.fields}
                                    errors={this.state.errors}
                                    handleChange={this.handleChange}
                                    postCommentHandler={this.postCommentHandler}
                                    handleReplyCancel={this.handleReplyCancel}
                                />}
                        </div>
                    </div>}
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <ErrorBoundary>
                        <SidebarBlog comments={this.state.commentsData}
                            searchValue={this.state.searchValue}
                            recentPosts={this.state.recentPosts}
                            categoryList={this.props.blogCategories}
                            archivesList={this.state.archivesList}
                            handleScroll={this.handleScroll}
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
    fetchPostData: data => dispatch(fetchEachPostData(data)),
    // fetchPostCategory: data => dispatch(fetchCatIdData(data)),
    fetchBlogsData: () => dispatch(fetchBlogPostsData()),
    fetchCommentsData: data => dispatch(fetchBlogCommentsData(data)),
    postUserCommentData: data => dispatch(postBlogCommentData(data)),
    fetchAllCommentsData: () => dispatch(fetchCommentsData()),
    // fetchTagNamesBlogData: data => dispatch(fetchTagNamesData(data)),
    fetchInstaFeedData: () => dispatch(fetchInstaFeedData()),
});

const mapStateToProps = (state) => {
    const { blogReducer } = state;

    const {
        eachPost,
        // catIds,
        blogPosts,
        blogComments,
        postComment,
        commentsData,
        blogCategories,
        // tagsData,
        isFetching: isLoading,
        type: fetchingType,
        error: blogError,
        instaFeedData,
    } = blogReducer || [];

    const error = !_isEmpty(blogError) || _isError(blogError);

    return {
        eachPost,
        // catIds,
        blogPosts,
        blogComments,
        postComment,
        commentsData,
        blogCategories,
        // tagsData,
        isLoading,
        fetchingType,
        error,
        instaFeedData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ArticleContainer));
