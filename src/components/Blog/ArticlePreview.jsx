// eslint-disable-next-line no-unused-vars
import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import Link from 'react-router-dom/Link';

export default function ArticlePreview(props) {
  function createMarkup() {
    // /href="(.*?)"/g    replace(/(?<=\href=")(.*?)(?=\")/g, `/blog/${props.post.id}`)
    return { __html: props.post.excerpt.rendered.replace(/href="(.*?)"/g, `href="/blog/${props.post.id}"`) };
  }
  if (props.post) {
    return (
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="article blog-title">
          <a href={`/blog/${props.post.id}`} className="blackLink">
            {_get(props, ['post', '_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']) ? (
              <img
                className="img-responsive webpic"
                alt="article header"
                src={_get(props, ['post', '_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url'])}
              />
            ) : (
                ''
              )}
            <h3 className="text-center">{props.post.title.rendered}</h3>
          </a>
          <div className="genpost-entry-meta">
            <span className="posted-on blog-title">
              <a href={`/blog/${props.post.id}`}>
                <span>
                  {moment(props.post.date).format('MMMM D, YYYY')}
                </span>
              </a>
            </span>
            <span className="byline">
              <span className="author vcard blog-title">
                <Link
                  to={{
                    pathname: `/blog/author/${_get(props, ['post', '_embedded', 'author', 0, 'id'])}`,
                    state: { authorName: _get(props, ['post', '_embedded', 'author', 0, 'name']) },
                  }}
                >
                  {/* <a href={`/blog/author/${_get(props, ['post', '_embedded', 'author', 0, 'id'])}`} className="url fn n"> */}
                  {_get(props, ['post', '_embedded', 'author', 0, 'name'])}
                  {/* </a> */}
                </Link>
              </span>
            </span>
            <span className="comments-link">
              <a href={`/blog/${props.post.id}`}>
                {_get(props, ['post', '_embedded', 'replies', 0]) && _get(props, ['post', '_embedded', 'replies', 0]).length > 0 ? _get(props, ['post', '_embedded', 'replies', 0]).length : 'Comment'}
              </a>
            </span>
          </div>
          <div className="content" dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
    );
  }
  return null;
}
