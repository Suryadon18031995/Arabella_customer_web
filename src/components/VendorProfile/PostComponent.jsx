import React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import bg6 from '../../assets/images/bg6.jpg';

const ReplyComment = props => (
    <Comment>
        <Comment.Avatar src={props.profilePic} />
        <Comment.Content>
            <Comment.Author as='a'>Helen Peter</Comment.Author>
            {/* <Comment.Metadata>
                <div>Yesterday at 12:02AM</div>
            </Comment.Metadata> */}
            <Comment.Text>
                <textarea rows='2' placeholder='Type your reply here' onChange={props.handleReplyCommentChange} value={props.replyComment} />
            </Comment.Text>
            <Comment.Actions>
                <button onClick={() => props.handleRepliedComment(props.id)}>Reply</button>
            </Comment.Actions>
        </Comment.Content>
    </Comment>
);

const PostComponent = props => (
    <React.Fragment>
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div className='col-lg-1 col-md-2 col-sm-1 col-xs-1'>
                <img src={props.profilePic} height='40' width='40' />
            </div>
            <div className='col-lg-11 col-md-11 col-sm-11 col-xs-11'>
                <h3 style={{ display: 'inline-block' }}> Post Title goes here</h3>
                <span style={{ fontSize: '12px', marginLeft: '10px' }}>Posted 2 days ago.</span>
            </div>
        </div>
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <img src={bg6} alt='Post' width='100%' />
        </div>
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 marginCustom1 spanCustom'>
            <span><i className="glyphicon glyphicon-thumbs-up" style={{ fontSize: '20px', cursor: 'pointer', color: props.liked ? 'blue' : '' }} onClick={props.handleLikeClick} /> {props.liksesCount} Likes</span>
            <span onClick={props.handleShareClick}> <i className="glyphicon glyphicon glyphicon-share-alt" style={{ fontSize: '20px' }} /> Share</span>
        </div>
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 marginCustom1'>
            Post Desc: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
            </div>
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <Comment.Group>
                <h3>
                    Comments
                    </h3>
                {props.commentsData.map(eachComment =>
                    <Comment key={eachComment.id}>
                        <Comment.Avatar src={eachComment.profilePic} />
                        <Comment.Content>
                            <Comment.Author as='a'>{eachComment.name}</Comment.Author>
                            <Comment.Metadata>
                                <div>{eachComment.timestamp}</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>{eachComment.comment}</p>
                            </Comment.Text>
                            {(props.id1 !== eachComment.id) ? <Comment.Actions>
                                <Comment.Action onClick={() => props.handleReplyComment(eachComment.id, '')}>Reply</Comment.Action>
                            </Comment.Actions> : ''}
                        </Comment.Content>
                        {props.id1 === eachComment.id ? <ReplyComment profilePic={props.profilePic}
                            replyComment={props.replyComment}
                            id={eachComment.id}
                            handleReplyCommentChange={props.handleReplyCommentChange}
                            handleRepliedComment={props.handleRepliedComment} /> : ''}
                        {eachComment.replies.map(eachReply => (
                            <Comment.Group key={eachReply.id}>
                                <Comment>
                                    <Comment.Avatar src={eachReply.profilePic} />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{eachReply.name}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{eachReply.timestamp}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{eachReply.comment}</Comment.Text>
                                        {props.id2 !== eachReply.id ? <Comment.Actions>
                                            <Comment.Action onClick={() => props.handleReplyComment(eachComment.id, eachReply.id)}>Reply</Comment.Action>
                                        </Comment.Actions> : ''}
                                    </Comment.Content>
                                </Comment>
                                {props.id2 === eachReply.id ? <ReplyComment profilePic={props.profilePic}
                                    replyComment={props.replyComment}
                                    id={eachReply.id}
                                    handleReplyCommentChange={props.handleReplyCommentChange}
                                    handleRepliedComment={props.handleRepliedComment} /> : ''}
                            </Comment.Group>
                        ))}
                    </Comment>)}

                <Comment>
                    <Comment.Avatar src={props.profilePic} />
                    <Comment.Content>
                        <Comment.Author as='a'>Helen Peter</Comment.Author>
                        {/* <Comment.Metadata>
                                <div>Yesterday at 12:02AM</div>
                            </Comment.Metadata> */}
                        <Comment.Text>
                            <textarea rows='2' placeholder='Type your comment here' onChange={props.handleCommentChange} value={props.comment} />
                        </Comment.Text>
                        <Comment.Actions>
                            <button onClick={props.handleCommented}>Comment</button>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        </div>
    </React.Fragment>
);

export default PostComponent;
