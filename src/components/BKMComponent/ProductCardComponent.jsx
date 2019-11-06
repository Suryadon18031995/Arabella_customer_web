// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const productCardComponent = props => (
        <div className="col-lg-3 col-sm-3 col-md-3 col-xs-6 responsive-homepage">
            <div className="hp-product-cart col-lg-12 thumbnail">
                <Link to={{
                    pathname: `/wholesale-flowers/all-flowers/${props.name}.html`,
                    // pathname: `/wholesale-flowers/all-flowers/${props.name.charAt(0).toUpperCase() + props.name.slice(1)}`,
                    state: { catId: props.catId },
                }}>
                    <img alt={props.name} src={props.image} />
                </Link>
                <h2 className="col-lg-12 col-sm-12 col-md-12 col-xs-12">{props.name}</h2>
            </div>
        </div>
    );

export default productCardComponent;
