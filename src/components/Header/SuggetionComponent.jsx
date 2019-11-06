import React from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
// import { Link } from 'react-router-dom';

const Suggetion = (props) => {
    // console.log('test:', _get(props.searchedData, 'productIdlist'));
    // console.log('tested:', Object.values(_get(props.searchedData, 'productIdlist')));
    const prodListData = _get(props.searchedData, 'searchProdResult');
    const sortOrder = Object.values(_get(props.searchedData, 'productIdlist'));
    const sortedProducts = [];
    const abcd = sortOrder && sortOrder.length > 0 && sortOrder.map((each) => {
        let temp = _find(prodListData, { productId: each });
        if (temp) {
            sortedProducts.push(temp);
        }
    });
    // console.log('sortedProducts', sortedProducts);
    if (props.searchedData.length === 0) {
        return null;
        // eslint-disable-next-line no-else-return
    } else {
        return (
            <div className="AutoCompleteText">
                <ul>
                    {Array.isArray(sortedProducts) && sortedProducts.map((item, index) => {
                        return (
                            <li
                                key={index}

                            // data-url="https://uat.bloomkonnect.com/test/rose-premium-yellow-high-exotic-40-cm-hb-15616"
                            > {/* <NavLink to="/about">About</NavLink> */}
                                {/* <Link to='/'>Home</Link> */}
                                <a
                                    onClick={() => props.showProductDetailPage(item.productId, item.url_key)}
                                    href={`/${item.url_key}.html`}
                                >
                                    <div className="searchautocomlete-image-name" title={item.productId}>
                                    <div className="searchautocomlete-image">
                                        <img
                                            className="img-responsive"
                                            src={item.thumbnailUrl}
                                            style={{ width: 60, height: 60 }}
                                        />
                                    </div>
                                    <a
                                        href={`/${item.url_key}.html`}
                                        title={item.productName}
                                        onClick={() => props.showProductDetailPage(item.productId, item.url_key)}
                                        className="name highlight"
                                    >
                                        <strong>{((item.productName).split(' '))[0]}</strong>{' '}
                                        {(item.productName).substr((item.productName).indexOf(' ') + 1)}
                                        {/* <strong>Rose</strong>Premium Yellow High Exotic 40 cm HB */}
                                    </a>
                                    </div>
                                    <div className="extra-detail">
                                        <span><b>BoxType :</b>HB</span>|
                                        <span><b>Pack Unit :</b>Stem</span>|
                                        <span><b>Grade :</b>20 LBS</span>|
                                        <span><b>Color :</b>Antique Blue</span>|
                                        <span><b>Length :</b>60 Cm</span>|
                                        <span><b>Variety :</b>Carmine Rose</span>
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <div className="all">
                    <span
                        className="cursor-click all-result text-right"
                        onClick={props.handleAllResultRedirection}
                    >All search results →</span>
                    {/* <a
                        onClick={props.handleAllResultRedirection}
                    >All search results →</a> */}
                </div>
            </div>
        );
    }
};
export default Suggetion;
