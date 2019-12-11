import React, { Fragment } from 'react';
import _get from 'lodash/get';
import Datetime from 'react-datetime';
import '../../assets/stylesheets/DatePickerReact.css';

export default function ProductGridComponent(props) {
    const renderDay = (inputProps, currentDate, selectedDate) => {
        inputProps.className = `${inputProps.className} customTdCls`;
        const formattedDate = currentDate.format('DD-MMM-YYYY');
        if (props.dateObjectArray && Object.keys(props.dateObjectArray[props.index]).length && props.dateObjectArray[props.index][formattedDate]) {
            inputProps.className = `${inputProps.className} hasDatePrice`;
            return <td {...inputProps} onClick={() => props.resetMoreDetails(formattedDate, props.index)}>
                {currentDate.date()}
                <div>{props.dateObjectArray[props.index][formattedDate]}</div>
            </td>;
        }
        inputProps.className = `${inputProps.className} rdtDisabled`;
        return <td {...inputProps}>{currentDate.date()}</td>;
    };
    const renderInput = (inputProps, openCalendar, closeCalendar) => {
        function clear() {
            inputProps.onChange({ target: { value: '' } });
        }
        return (
            <div>
                <div className="delivery-opinion">
                        <b className='delivery-by-grid'>Delivery By{' '}</b>
                        <span className='del-date'>
                        {_get(props.deliveryData, 'delivery_date_form')}
                        </span>
                        <span className="grid-calendar" onClick={openCalendar}>
                        {/* // commented temporarily */}
                            {/* <input type="date" className="datepicker59662 hasDatepicker" placeholder="+" id="dp1542198135597" style={{ border: '0px' }} /> */}
                        </span>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <div className='col-lg-4 col-sm-4 col-md-4 col-xs-4'>
                <div className='product-grid-view text-center'>
            <img className='carouselImgDiv grid-images img-responsive'
                    alt={props.thisData.name} src={props.thisData.image}/>
                <h4 className='grid-product-name'>
                        {props.thisData.name}
                        </h4>
                        <div>
                            Description
                        </div>
                        <div>
              <button type="button" className="btn custom-class-button">VIEW & ORDER</button>
           </div>
            </div>
            </div>
                {/* <div className="carouselParentDiv"> */}
                {/* <a href={`/${props.thisData.url_key}.html`}>
                <div className="carouselImgDiv">
                    <img className='carouselImgDiv grid-images img-responsive'
                    alt={props.thisData.name} src={props.thisData.image}/>
                </div>
                </a> */}
                {/* <div className="product-grid carouselTextDiv">
                    <div className='f-fix'> */}
                        {/* <h2 className='grid-product-name'>
                        <a href={`/${props.thisData.url_key}.html`}>
                        {props.thisData.name}
                        </a>
                        </h2> */}
                        {/* <div className='label-grid'> */}
                        {/* <div className='product-grid-per'>
                            <span className='product-grid-price'>{_get(props.deliveryData, 'total_price_format')} </span>
                            per {' '}
                            <span>{_get(props.deliveryData, 'avail_id') && _get(props.thisData, _get(props.deliveryData, 'avail_id')).pack_unit}</span>
                        </div> */}
                            {/* <br /> */}
                            {/* {props.apiToken &&
                                <Datetime renderDay={renderDay}
                                    renderInput={renderInput}
                                    closeOnSelect={true}
                                />
                        } */}
                        {/* </div> */}
                        {/* <div >
                        {props.apiToken && <span className="qty-grid-cart">
                                <input type="text" name='orderQuantity' value={_get(props.unitQty, [props.thisData.pid])}
                                    maxLength="12" title="Input here No. of Qty" className="input-text qty"
                                    onChange={event => props.handleInuputChange(event, props.thisData, props.deliveryData)} />
                                <button type="button" onClick={() => props.handleAddCartClick(props.thisData, props.deliveryData)}
                                 title="Add to Cart"
                                  className={`button btn-cart${!_get(props.inputValid, props.thisData.pid) && props.apiToken ? '' : ' disableBtn'}`}
                                  disabled={!(!_get(props.inputValid, props.thisData.pid) && props.apiToken)}>
                                    Add to Cart
                                </button>
                            </span>}
                            {!props.apiToken && <span className='add-cart-button-grid' style={!props.apiToken && { width: '100%' }}>
                                <button type="button" onClick={() => props.handleAddCartClick(props.thisData, props.deliveryData)} title="Add to Cart" className="button btn-cart">
                                    Add to Cart
                                </button>
                            </span>}
                            {props.apiToken && <span className={`error-msg-qty ${props.blinkText[props.thisData.pid]}`} >
                                Qty in multiple of {_get(props.deliveryData, 'qty_per_box')}
                            </span>}
                        </div>
                    </div>
                </div>
                </div>
            </div> */}
        </Fragment>
    );
}
