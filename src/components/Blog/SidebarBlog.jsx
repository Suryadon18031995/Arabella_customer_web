// eslint-disable-next-line no-unused-vars
import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import Gallery from 'react-grid-gallery';
// import '../../assets/stylesheets/blog.css';

export default function SidebarBlog(props) {
  return (
    <div>
      <div id="secondary" className="main-widget-area" role="complementary">
        <aside id="search-2" className="widget widget_search">
          <div className="search-form">
            <label>
              <span className="screen-reader-text">Search for:</span>
              <input type="search" className="search-field" placeholder="Search …"
                value={props.searchValue}
                onChange={props.handleSearchChange} />
            </label>
            <button type='submit' className="search-submit" onClick={props.handleSearchClick}>
              Search
            </button>
          </div>
        </aside>
        <aside id="recent-posts-2" className="widget widget_recent_entries">
          <div className="widget-title-container">
            <h3 className="widget-title">Recent Posts</h3>
          </div>
          <ul>
            {
              props.recentPosts && props.recentPosts.map((eachTitle, index) => (
                <li className="blog-title" key={index}>
                  <a href={`/blog/${eachTitle.id}`}>{_get(eachTitle, 'title')}</a>
                </li>
              ))
            }
          </ul>
        </aside>
        <aside id="recent-comments-2" className="widget widget_recent_comments">
          <div className="widget-title-container">
            <h3 className="widget-title">Recent Comments</h3>
          </div>
          <ul id="recentcomments">
            {
              _get(props, 'comments') && Object.entries(_get(props, 'comments')).map((thisData, index) => {
                const title = thisData[1].link && (thisData[1].link).split('/');
                return <li className="recentcomments blog-title" key={index}>
                  <span className="comment-author-link">
                    <a href={`/blog/${thisData[1].post}`} className="url">{thisData[1].author_name}</a>
                  </span>{' '}
                  on{' '}
                  <a href={`/blog/${thisData[1].post}#blogscomment`} onClick={props.handleScroll} className="comment-title">{title && title[5].replace(/-/g, ' ')}</a>
                </li>;
              })
            }
            {/* <li className="recentcomments"><span className="comment-author-link">
              <a href="http://kabloomcorp.com" rel="external nofollow" className="url">aneesh</a>
            </span> on
            <a href="https://uat.bloomkonnect.com/test/blog/2018/10/04/quick-flower-tips-for-even-the-most-advanced-florist-from-bloomkonnect/#comment-2">Quick Flower Tips for Even the Most Advanced Florist from BloomKonnect</a>
            </li>
            <li className="recentcomments">
              <span className="comment-author-link">
                <a href="https://wordpress.org/" rel="external nofollow" className="url">A WordPress Commenter</a>
              </span>
              on
              <a href="https://uat.bloomkonnect.com/test/blog/2018/08/17/hello-world/#comment-1">Wedding Flowers</a>
              </li> */}
          </ul>
        </aside>
        <aside id="archives-2" className="widget widget_archive"><div className="widget-title-container"><h3 className="widget-title">Archives</h3></div><ul>
          {
            props.archivesList && props.archivesList.map((eachMonth, index) => (
              <li className="blog-title" key={index}>
                <a href={`/blog/archive/${eachMonth.split(' ').join('-')}`}>
                  {moment(new Date(eachMonth.split(' ').join('-'))).format('MMMM YYYY')}
                </a>
              </li>
            ))
          }
        </ul>
        </aside>
        <aside id="categories-2" className="widget widget_categories">
          <div className="widget-title-container">
            <h3 className="widget-title">Categories</h3>
          </div>
          <ul>
            {
              props.categoryList && props.categoryList.map((category, index) => (
                <li className="blog-title" key={index}>
                  <a href={`/blog/category/${category.slug}#${category.id}`}>
                    {category.name}
                  </a>
                </li>
              ))
            }
          </ul>
        </aside>
        <aside id="wdi_instagram_widget-3" className="widget wdi_instagram_widget">
          <div className="widget-title-container">
            <h3 className="widget-title">Instagram Feed</h3>
          </div>
          {/* <div id="wdi_feed_0" className="wdi_feed_main_container wdi_layout_th wdi_feed_theme_1 wdi_feed_thumbnail_1"> */}
          {/* <div className="wdi_token_error">Instagram token error.</div> */}
          {/* <div className="wdi_check_fontawesome wdi_hidden">
              <i className="fa fa-instagram"></i>
            </div> */}
          {/* </div> */}
          <div>
            <Gallery images={props.instaFeedData}
              enableImageSelection={false}
              currentImageWillChange={props.onCurrentImageChange}
              customControls={[
                <a target='_blank' href={props.currentImageLink}><i className="fa fa-instagram" style={{ color: 'white', fontSize: '30px' }}></i></a>,
              ]}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
