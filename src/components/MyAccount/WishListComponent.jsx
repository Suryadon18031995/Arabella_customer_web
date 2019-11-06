// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
import _get from 'lodash/get';
// import _isEmpty from 'lodash/isEmpty';
import { Button } from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import OneColumLeft from './OneColumnLeftMyAccount.jsx';

export default function WishListComponent(props) {
    return (
        <Fragment>
            <div className="col-md-3 col-sm-3 col-xs-12">
                <OneColumLeft
                    salesRepUser={props.salesRepUser}
                    primeUser={props.primeUser}
                    rewardsPointAmount={props.rewardsPointAmount}
                />
            </div>
            <div className="col-md-9 col-sm-9 col-xs-12">
                <div className="mywishlist-heading"><p>My Wishlist</p></div>
                <div>
                    {_get(props.state.result, 'result') ? <div class='table'><table className="MywishlistTable" >
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Product Details and Comment</th>
                                <th className="wishlist-th-addcart">Add to Cart</th>
                                <th className="wishlist-remove-btn"></th>
                            </tr>
                            {_get(props.state.result, 'result') && Object.entries(_get(props.state.result, 'result')).map((item, index) => {
                                return <tr key={index}>
                                    <td className="wishlist_image">
                                        <Link to={`/${item[1].url_key}`}>
                                            <img className='img-responsive' src={item[1].image} />
                                        </Link></td>
                                    <td className="productdetails">
                                        <p className="productname" onClick={() => props.handleCartClick(item[1].product_id, item[1].url_key)}>
                                            <Link to={`/${item[1].url_key}.html`}>
                                                {item[1].name}
                                            </Link>
                                        </p>
                                        {/* <p>{item[1].name}</p> */}
                                        <h5>Product Features</h5>
                                        <p className="details">
                                            <b>Farm Name:</b>
                                            &nbsp;
                                            <span>{item[1].location}({item[1].state},)</span> &nbsp;|&nbsp;
                                    </p>
                                        <p className="details">
                                            <b>Box Type:</b>
                                            &nbsp;
                                            <span>{item[1].box_type}</span> &nbsp;|&nbsp;
                                    </p>
                                        <p className="details">
                                            <b>Pack Unit: </b>
                                            &nbsp;
                                            <span>{item[1].pack_unit}</span> &nbsp;|&nbsp;
                                    </p>
                                        {item[1].grade &&
                                            <p className="details">
                                                <b>Grade: </b>
                                                &nbsp;
                                                <span>{item[1].grade}</span> &nbsp;|&nbsp;
                                    </p>
                                        }
                                        {item[1].color &&
                                            <p className="details">
                                                <b>Color: </b>
                                                &nbsp;
                                                <span>{item[1].color}</span> &nbsp;|&nbsp;
                                    </p>
                                        }
                                        {item[1].length &&
                                            <p className="details">
                                                <b>Length: </b>
                                                &nbsp;
                                                <span>{item[1].length}</span> &nbsp;|&nbsp;
                                    </p>
                                        }
                                        {item[1].variety &&
                                            <p className="details">
                                                <b>Variety: </b>
                                                &nbsp;
                                                <span>{item[1].variety}</span> &nbsp;|&nbsp;
                                    </p>
                                        }

                                    </td>
                                    <td>
                                        <Link to={`/${item[1].url_key}.html`}>
                                            <Button className="wishlist-btn">
                                                <span className="wishlist-btn-cont">
                                                    ADD TO CART
                                                </span>
                                             </Button>
                                        </Link>
                                    </td>
                                    <td className="removefromwish">
                                        <span className="cross" onClick={e =>
                                            window.confirm('Are you sure you wish to delete this item?') &&
                                            props.handleRemoveWishlist(item[1].product_id)
                                        } >
                                            {/* <span className="glyphicon glyphicon-remove-circle"></span> */}
                                            <span className="fa fa-times"></span>
                                        </span>
                                    </td>
                                </tr>;
                            })}
                        </tbody>
                    </table></div> : 'You have no items in your wishlist.'}
                    <br />
                    <br />
                    <Button className="wishlist-back-btn" onClick={() => props.handleBackButtonClick()}>Back</Button>

                </div>
            </div >   </Fragment>
    );
}
