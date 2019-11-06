// eslint-disable-next-line no-unused-vars
import React from 'react';
// import '../../assets/stylesheets/blog.css';

export default function CommentsForm(props) {
    return (
        <div className="blogs-comment-block">
        <h3>
            Leave a Reply
            {props.showReplyForm && <span className='cancel-comment-reply' onClick={props.handleReplyCancel}/>}
        </h3>
        <p>Your email address will not be published. Required fields are marked <span className="required">*</span></p>

        <p>
            <label>Comment <span className="required">*</span></label>
            <textarea cols="45" rows="8" id="authorComment" value={props.fields && props.fields.authorComment} onChange={event => props.handleChange(event)} ></textarea>
            <br /><span style={{ fontSize: '12px', color: 'red' }}>{props.errors.authorComment}</span>
        </p>
        <p>
            <label className="name-email-website">Name <span className="required">*</span></label>
            <input className="blogs-input" type="email" size="30" id="authorName" value={props.fields && props.fields.authorName} onChange={event => props.handleChange(event)} />
            <span style={{ fontSize: '12px', color: 'red' }}>{props.errors.authorName}</span>
        </p>
        <p>
            <label className="name-email-website">Email <span className="required">*</span></label>
            <input className="blogs-input" type="email" size="30" id="authorEmail" value={props.fields && props.fields.authorEmail} onChange={event => props.handleChange(event)} />
            <span style={{ fontSize: '12px', color: 'red' }}>{props.errors.authorEmail}</span>
        </p>
        <p>
            <label className="name-email-website">Website</label>
            <input className="blogs-input" type="email" size="30" id="authorWebsite" value={props.fields && props.fields.authorWebsite} onChange={event => props.handleChange(event)} />
            <span style={{ fontSize: '12px', color: 'red' }}>{props.errors.authorWebsite}</span>
        </p>
        <p>
            <input type="checkbox" />
            <label>Save my name, email, and website in this browser for the next time I comment.</label>
        </p>
        <p>
            <button onClick={() => props.postCommentHandler()} className="blog-comment-btn">Post Comment</button>
        </p>
    </div>
    );
}
