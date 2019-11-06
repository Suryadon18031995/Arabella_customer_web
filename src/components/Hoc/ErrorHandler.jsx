/** Render hijacking HOC for inducing loader */
import React from 'react';

const errDiv = () => (<div className='col-lg-12 col-md-12 col-sm-12'>
    <div className="errorDiv">
        <p>OOPs! something went wrong, Please reload the page.</p>
    </div>
</div>);

const ErrorHandler = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {
        render() {
            if (this.props.error) {
                return errDiv();
            }
            return super.render();
        }

    };
};

export default ErrorHandler;
