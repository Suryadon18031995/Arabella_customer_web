// eslint-disable-next-line no-unused-vars
import React from 'react';
// import moment from 'moment';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
// import _reverse from 'lodash/reverse';
import StarRatings from 'react-star-ratings';
import '../../assets/stylesheets/recents.css';

export default function RecentReviews(props) {
    // const productsData = _reverse(_get(props.recentViewsData, 'products'));
    const productsData = Array.from(_get(props.recentViewsData, 'products')).reverse();
    const ordersData = {
        // 1234: {
        //     orderId: 1234,
        //     productId: 45678,
        //     productName: 'xyz test lily',
        // },
    };// _get(props.recentViewsData, 'orders');
    return (
        <div>
            {props.recentViewsData &&
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading"><b>Recently Viewed Products</b></div>
                        <div className="panel-body"><ul>
                            {props.recentViewsData && !_isEmpty(productsData) && productsData.map((obj, index) =>
                                <li key={index}>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <img src={_get(obj, 'img')} width="100%" />
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <p>{_get(obj, 'name')}</p>
                                            <StarRatings
                                                rating={_get(obj, 'ratings') ? parseInt(_get(obj, 'ratings'), 10) : 0}
                                                starDimension="12px"
                                                starSpacing="1px"
                                                starEmptyColor="#434343"
                                                starRatedColor="#fdb927"
                                            /><span>({_get(obj, 'ratings')})</span>
                                            <p>{_get(obj, 'price')}</p>
                                        </div>
                                    </div>
                                </li>)
                            }
                        </ul></div>
                    </div>
                    {props.apiToken && <div className="panel panel-default">
                        <div className="panel-heading"><b>My Orders</b></div>
                        <div className="panel-body">
                            <p>Last Ordered Items</p>
                            <ul>
                                {props.recentViewsData && !_isEmpty(ordersData) && Object.keys(ordersData).map((key, index) =>
                                    <li key={index}>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <input type="checkbox" value={_get(ordersData[key], 'orderId')} name="orderId" />  {_get(ordersData[key], 'productName')}
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <button type="button" className="btn btn_cart btn-sm">
                                                    <span className="glyphicon glyphicon-shopping-cart"></span>
                                                </button>
                                                <button onClick={props.handleViewAllClick} type="button" className="btn btn-default btn-sm">View All</button>
                                            </div>
                                        </div>
                                    </li>)
                                }
                            </ul></div>
                    </div>}
                </div>
            }
        </div>

    );
}
