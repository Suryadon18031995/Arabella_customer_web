import React from 'react';
// import Link from 'react-router-dom/Link';
// import Redirect from 'react-router/Redirect';

export default class FilterLabelList extends React.Component {
    state = {
        redirect: false,
        url: this.props.location.url ? this.props.location.url.toLowercase() : '',
    };
    // eslint-disable-next-line class-methods-use-this
    componentWillMount() {
        const url = this.props.location.pathname ? this.props.location.pathname.toLowerCase() : undefined;
        if (url && (url === '/admin' || url === '/index.php/admin')) {
            window.location = 'https://bloomkonnect.com:8443/index.php/admin';
        } else if (url && url === '/bkm/vendor') {
            window.location = 'https://bloomkonnect.com:8443/bkm/vendor';
        } else if (url && url === '/whm') {
            window.location = 'https://bloomkonnect.com:2087';
        } else if (url && url === '/cpanel') {
            window.location = 'https://bloomkonnect.com:2083';
        }
    }
    render() {
        if (this.state.redirect) {
            return (
                <div>
                    {/* // <Redirect to='/' /> */}
                </div>
            );
        }
        return (
            // <a href="https://bloomkonnect.com/admin" id="admin" target="_blank">abc</a>
            null
        );
    }
}
