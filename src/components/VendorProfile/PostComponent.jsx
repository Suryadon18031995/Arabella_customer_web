import React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import bg6 from '../../assets/images/bg6.jpg';

const PostComponent = (props) => {
    return (
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
                <img src={bg6} alt='Post' width='100%'/>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 marginCustom1 spanCustom'>
                <span><i className="glyphicon glyphicon-thumbs-up" style={{ fontSize: '20px', cursor: 'pointer', color: props.liked ? 'blue' : '' }} onClick={props.handleLikeClick}/> {props.liksesCount} Likes</span>
                <span onClick={props.handleShareClick}> <i className="glyphicon glyphicon glyphicon-share-alt" style={{ fontSize: '20px' }}/> Share</span>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 marginCustom1'>
                Post Desc: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <Comment.Group>
                    <h3>
                        Comments
                    </h3>
                    <Comment>
                        <Comment.Avatar src={props.profilePic} />
                        <Comment.Content>
                            <Comment.Author as='a'>Elliot Fu</Comment.Author>
                            <Comment.Metadata>
                                <div>Yesterday at 12:30AM</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>This has been very useful for my research. Thanks as well!</p>
                            </Comment.Text>
                            {/* <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions> */}
                        </Comment.Content>
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src={props.profilePic} />
                                <Comment.Content>
                                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Just now</div>
                                    </Comment.Metadata>
                                    <Comment.Text>Elliot you are always so right :)</Comment.Text>
                                    {/* <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions> */}
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    </Comment>
                    <Comment>
                        <Comment.Avatar src={props.profilePic} />
                        <Comment.Content>
                            <Comment.Author as='a'>John Joseph</Comment.Author>
                            <Comment.Metadata>
                                <div>Yesterday at 12:02AM</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>Nice!</p>
                            </Comment.Text>
                            {/* <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions> */}
                        </Comment.Content>
                    </Comment>
                    <Comment>
                        <Comment.Avatar src={props.profilePic} />
                        <Comment.Content>
                            <Comment.Author as='a'>Helen Peter</Comment.Author>
                            {/* <Comment.Metadata>
                                <div>Yesterday at 12:02AM</div>
                            </Comment.Metadata> */}
                            <Comment.Text>
                            <textarea rows='2' placeholder='Type your comment here' onChange={props.handleCommentChange} value={props.comment}/>
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
};

export default PostComponent;
