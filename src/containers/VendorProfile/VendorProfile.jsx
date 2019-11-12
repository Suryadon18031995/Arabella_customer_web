import React from 'react';
import PostComponent from '../../components/VendorProfile/PostComponent.jsx';
import profilePic from '../../assets/images/profile.png';

class VendorProfile extends React.Component {
    state = {
        liked: false,
        liksesCount: 8,
        comment: '',
        replyComment: '',
        id1: '',
        id2: '',
        commentsData: [
            {
                id: '1',
                profilePic: 'https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg',
                name: 'Aneesh',
                timestamp: 'Yesterday at 12:30AM',
                comment: 'This has been very useful for my research. Thanks as well!',
                replies: [
                    {
                        id: '11',
                        profilePic: 'https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg',
                        name: 'Sumith',
                        timestamp: 'Today at 12:45AM',
                        comment: 'Elliot you are always so right :)',
                    },
                ],
            },
            {
                id: '2',
                profilePic: 'https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg',
                name: 'Anju',
                timestamp: 'Yesterday at 01:30AM',
                comment: 'Cool!',
                replies: [
                    {
                        id: '21',
                        profilePic: 'https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg',
                        name: 'Sanju',
                        timestamp: 'Few Minutes BAck',
                        comment: 'Thank you:)',
                    },
                ],
            },
            {
                id: '3',
                profilePic: 'https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg',
                name: 'Sony',
                timestamp: 'Today at 01:30AM',
                comment: 'Great!',
                replies: [],
            },
        ],
    };

    handleLikeClick = () => {
        console.log('Liked!');
        this.setState(prevState => ({
            liked: !prevState.liked,
            liksesCount: prevState.liked ? prevState.liksesCount - 1 : prevState.liksesCount + 1,
        }));
    }

    handleShareClick = () => {
        console.log('Shared!');
    }

    handleCommentClick = () => {
        const commentsData = [...this.state.commentsData];
        commentsData.push({
            id: commentsData.length + 1,
            profilePic: 'https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg',
            name: `Star ${commentsData.length}`,
            timestamp: 'Just Now',
            comment: this.state.comment,
            replies: [],
        });
        this.setState({ commentsData, comment: '' });
    }

    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value,
        });
    }

    handleReplyComment = (id1, id2) => {
        // debugger
        // console.log('clicked reply:', this.state.comment);
        this.setState({
            id1: id2 ? '' : id1,
            id2: id2 || '',
            replyComment: '',
        });
    }

    handleReplyCommentChange = (event) => {
        this.setState({
            replyComment: event.target.value,
        });
    }

    handleRepliedComment = (id) => {
        console.log('clicked! replied!', this.state.replyComment, id);
    }

    render() {
        return (
            <div className='container'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 marginCustom'>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
                        <img src={profilePic}></img>
                    </div>
                    <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10 text-center'>
                        <h2>Name</h2>
                        <div>Bio Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2'>

                    </div>
                    <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10'>
                        <PostComponent profilePic={profilePic}
                            commentsData={this.state.commentsData}
                            id1={this.state.id1}
                            id2={this.state.id2}
                            liked={this.state.liked}
                            liksesCount={this.state.liksesCount}
                            comment={this.state.comment}
                            replyComment={this.state.replyComment}
                            handleLikeClick={this.handleLikeClick}
                            handleShareClick={this.handleShareClick}
                            handleCommented={this.handleCommentClick}
                            handleCommentChange={this.handleCommentChange}
                            handleReplyComment={this.handleReplyComment}
                            handleRepliedComment={this.handleRepliedComment}
                            handleReplyCommentChange={this.handleReplyCommentChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default VendorProfile;
