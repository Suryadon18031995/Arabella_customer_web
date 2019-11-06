import React from 'react';


const ElementWithAsterik = (WrappedComponent) => {
    return class ElementWithAsterik extends React.Component {

        render() {
            return <WrappedComponent {...this.props}>{this.props.children} <em> * </em></WrappedComponent>
        }


    };
};

const SpanWithAsterik = ElementWithAsterik('span');

const DivWithAsterik = ElementWithAsterik('div');

export {
    SpanWithAsterik,
    DivWithAsterik
}

export default ElementWithAsterik;