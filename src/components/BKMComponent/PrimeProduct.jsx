import React from 'react';
// import _get from 'lodash/get';

export default function PrimeProduct(props) {
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 prime-product">
            {/* <li key={props.index} className="item" > */}
            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                <img className="prod-image-size prime-image" alt={props.name} src={props.image} />
            </div>
            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <h2 className="prod-name-prime">
                    {props.name}
                </h2>
                <div className='prime-price'>
                    Total amount payable $ {parseFloat(props.price, 10)}
                </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 prime-button">
                <button type="button" onClick={() => props.handleAddCartClick(props.id, props.cart_format)}
                    title={props.apiToken ? 'Add to Cart' : 'Please login to add items into the cart'} className={`button btn-cart add-crt-btn ${props.apiToken ? '' : 'disableBtn'}`}
                // disabled={!(!_get(props.inputValid, props.pid) && props.apiToken)}
                >
                    Add to Cart
                                </button>
            </div>
            {/* </li> */}
        </div>
    );
}
