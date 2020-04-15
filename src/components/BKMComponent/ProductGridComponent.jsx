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
        <div className='col-lg-4 col-sm-4 col-md-4 col-xs-4'>
            <div className='text-center' style={{border: '3px solid #2fafcc',padding: '5px',height: '380px',width:'255px',marginBottom: '10px'}}>
               <img style={{height:'170px',width:'170',padding:'3px',marginTop:'10px'}}
                    alt={props.thisData.name} src={props.thisData.image}/>
                        <div style={{padding:'5px'}}>
                        <h5>
                        {props.thisData.name}
                        </h5>
                        </div>
                        <div className="row">
                             <div className="col-sm-5">
                                 <div style={{color:'#fff',fontSize: '12px', borderRadius: '2px', display: 'inline-flex', alignItems: 'center', padding: '1px 5px', cursor: 'pointer',
                                  position: 'relative', marginRight: '5px',backgroundColor: 'black'}}>
                                     <span style={{fontWeight:'700'}}>{props.thisData.product_rating} <i class="fa fa-star-o"></i></span>
                                  &nbsp;
                                  </div>
                                  </div>
                                 <div className="col-sm-7" style={{marginLeft:'-34px'}}>
                                    <span>{props.thisData.product_rating_count} Ratings</span>
                                </div>                     
                        
                        </div>
                        <br/>
                        <div><span>MRP : RS.{props.thisData.price_range}</span></div>
                     { props.thisData.prescription === 'No' ?
                        <div class="ribbon"><span>NO PRESC</span></div> 

                          : <div class="ribbon1"><span>PRESC</span></div>
                     } 
            </div>
        </div>
    );
}
