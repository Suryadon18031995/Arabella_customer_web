// eslint-disable-next-line no-unused-vars
import React from 'react';
import _get from 'lodash/get';
import { Tabs, Tab } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import MetaTags from 'react-meta-tags';
import { LoaderListingPage } from '../../components/Loader/Loader.jsx';
import ProductComponent from './Product.jsx';
import ProductGridComponent from './ProductGridComponent.jsx';
// import '../../assets/stylesheets/ProductListing.css';
import iDescArrow from '../../assets/images/i_desc_arrow.png';
import iAscArrow from  '../../assets/images/i_asc_arrow.png';

export default function ListingComponent(props) {
    console.log(props);
    // if (_get(props, 'isLoading') && props.pageNo === 1) {
    //     return (
    //         <div className="text-center">
    //             <LoaderListingPage />
    //         </div>
    //     );
    // }
    if (props.totalProductCount === 0 && !_get(props, 'isLoading')) {
        return (
            <div className="no-products-to-display">
                There are no products matching the selection.
            </div>
        );
    }
    return (
        <div>
        <div className="listingComponent row" >
            <br/>
             <MetaTags>
            {/* <title>Page 1</title> */}
            <meta name="description" content={props.metaDesc} />
            {/* <meta property="og:title" content="MyApp" /> */}
          </MetaTags>

            {
                props.viewType === 'grid' &&
                props.productDetails && props.productDetails.map((thisData, index) =>
                    <ProductGridComponent index={index} key={index}
                        thisData={thisData}
                        unitQty={props.unitQty}
                        dateObjectArray={props.dateObjectArray}
                        totalAmount={props.totalAmount}
                        showMaxQtyAlert={props.showMaxQtyAlert}
                        productId={props.productId}
                        apiToken={props.apiToken}
                        blinkText={props.blinkText}
                        inputValid={props.inputValid}
                        deliveryData={props.displayData[index]}
                        handleInuputChange={props.handleInuputChange}
                        handleAddCartClick={props.handleAddCartClick}
                        resetMoreDetails={props.resetMoreDetails}
                    />)
            }
        </div>
        <br/>
        </div> 
    );
}
