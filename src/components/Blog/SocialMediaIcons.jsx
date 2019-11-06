// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../../assets/stylesheets/blog.css';

export default function SocialMediaIcons() {
    return (
        <div className="asocial-area">
            <span className="asocial-icon facebook">
                <a href="https://www.facebook.com/BloomKonnect" target="_blank">
                    <i className="fa fa-facebook"></i>
                </a>
            </span>
            <span className="asocial-icon twitter">
                <a href="https://twitter.com/BloomKonnect" target="_blank">
                    <i className="fa fa-twitter"></i>
                </a>
            </span>
            <span className="asocial-icon youtube">
                <a href="https://youtu.be/9XhPEaXsono" target="_blank">
                    <i className="fa fa-youtube"></i>
                </a>
            </span>
            <span className="asocial-icon instagram">
                <a href="https://www.instagram.com/BloomKonnect/" target="_blank">
                    <i className="fa fa-instagram"></i>
                </a>
            </span>
            <span className="asocial-icon pinterest">
                <a href="https://www.pinterest.com/bloomkonnect/" target="_blank">
                    <i className="fa fa-pinterest"></i>
                </a>
            </span>
        </div>
    );
}
