import React from 'react';
import PostComponent from '../../components/VendorProfile/PostComponent.jsx';
import profilePic from '../../assets/images/profile.png';

class VendorProfile extends React.Component {
    state = {
        liked: false,
        liksesCount: 8,
        comment: '',
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

    handleCommented = () => {
        console.log('Commented!', this.state.comment);
    }

    handleCommentChange = (event) => {
        // console.log('value:', event.target.value);
        this.setState({
            comment: event.target.value,
        });
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
                        liked={this.state.liked}
                        liksesCount={this.state.liksesCount}
                        comment={this.state.comment}
                        handleLikeClick={this.handleLikeClick}
                        handleShareClick={this.handleShareClick}
                        handleCommented={this.handleCommented}
                        handleCommentChange={this.handleCommentChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default VendorProfile;
