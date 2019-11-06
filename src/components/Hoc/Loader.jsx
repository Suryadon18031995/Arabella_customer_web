/** Render hijacking HOC for inducing loader */
import React from 'react';

const rectLoader = () => (<div className='loader-wrapper'>
    <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
    </div>
</div>);

const withLoader = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {
        render() {
            if (this.props.isLoading) {
                return rectLoader();
            }
            return super.render();
        }

    };
};



export {
    rectLoader,
    withLoader
};

export default withLoader;
