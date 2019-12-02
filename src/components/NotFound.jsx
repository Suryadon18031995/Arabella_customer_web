import React from 'react';
import Link from 'react-router-dom/Link';

const NotFoundComponent = () => (
        <div className="not-found">
            Sorry. The page which you are looking for is not found.<br/>
            To go back to home please <Link to='/'>click here</Link>.
            To continue shopping please <Link to='/'>click here</Link>.
        </div>
    );

export default NotFoundComponent;
