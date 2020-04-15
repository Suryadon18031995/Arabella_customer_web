import React , { Fragment } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import StarRatings from 'react-star-ratings';
import Datetime from 'react-datetime';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import MetaTags from 'react-meta-tags';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  TimePicker ,
} from '@material-ui/pickers';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../assets/stylesheets/DatePickerReact.css';
import '../../assets/stylesheets/mediversal.css';
import freshDeal from '../../assets/images/fresh-deals.png';
import TdComponenet from './rowComponent.jsx';
import imageBack from '../../assets/svg/62.png';
import lefthr from '../../assets/svg/lefthr.jpg';
import righthr from '../../assets/svg/righthr.jpg';
import revButton from '../../assets/svg/revButton.jpg';
import post from '../../assets/svg/post.jpg';
import MaModal from '../Common/MaterialUIModal.jsx';
import ReviewComponent from '../ProductComponent/reviewComponent.jsx';

export default function GCProductDetailComponent(props) {
    console.log(props);
    const renderDay = (inputProps, currentDate) => {
        inputProps.className = `${inputProps.className} customTdCls`;
        const formattedDate = currentDate.format('DD-MMM-YYYY');
        if (props.datesArr && Object.keys(props.datesArr).length && props.datesArr[formattedDate]) {
            inputProps.className = `${inputProps.className} hasDatePrice`;
            return <td {...inputProps} onClick={() => props.resetMoreDetails(formattedDate)}>
                {currentDate.date()}
                <div>{props.datesArr[formattedDate]}</div>
            </td>;
        }
        inputProps.className = `${inputProps.className} rdtDisabled`;
        return <td {...inputProps}>{currentDate.date()}</td>;
    };
    const renderInput = (inputProps, openCalendar) => {
        function clear() {
            inputProps.onChange({ target: { value: '' } });
        }
        return (
            <div>
                <div className="delivery-opinion">
                    <b className='deliveryTitles'>Delivery Date:</b><br />
                    <span style={{ float: 'left' }}>
                        {_get(props.dataToShow, 'delivery_date_form')}
                        <span className="calendar" onClick={openCalendar}>
                            <input type="date" className="hasDatepicker" placeholder="+" style={{ border: '0px' }} />
                        </span>
                    </span>
                </div>
            </div>
        );
    };
    if (props.productDetails && props.productDetails.info) {
        const { info } = props.productDetails;
        const avaId = Object.keys(info)[0];

        // console.log('ava', info[avaId].is_special);
        // console.log('ispsecial', _get(info, [avaId, 'is_special'], 0));
        
        return (
            <div>
                 <MetaTags>
                <meta name="description" content={info.meta_description} />
                {/* <meta property="og:title" content={props.metaTitle} /> */}
                </MetaTags>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12" style={{height:'400px'}}>
                       <center>
                        <div style={{backgroundImage:`url(${imageBack})`,width:'350px',height:'350px',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',marginTop:'50px'}}>
                           
                            <center>
                                 <div>  
                                     <div style={{paddingTop:'25%'}}>
                                      <center>

                                         <b><h2>{info.meta_title}</h2></b>
                                         <br/><br/>
                                         <b>MRP : {info.price}</b>
                                      </center>

                                         
                                    </div>                                 
                                    
                                </div>
                            </center>
                            
                        </div>
                    </center>
                        {/* <img src={info.image} width="100%"></img> */}
                        {/*!_isEmpty(info.product_images) &&
                            <div className="row">
                                {info.product_images.map((img, ind) =>
                                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-12" key={ind} onClick={() => props.toggleImgModalFn(img, info.product_images.length, ind + 1)}>
                                        <img src={img} width="100%"></img>
                                    </div>)
                                }
                            </div>*/

                        }
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">
                        <div className="product-view-detail">
                            <div>
                                <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding">

                                    <ul className='list-inline'>
                                        <li><h1 className="prod-product-name">{info.meta_title}</h1></li>
                                    </ul>  
                                    <br/>
                                    {info.short_description}

                                    <br/>
                                    <br/>
                                    <b>MRP</b> : {info.price}
                                    <br/> 
                                    <br/>
                                    <b>Date And Time</b>
                                    <br/><br/>
                                    <div>
                                                {/*<Datetime
                                                    renderDay={renderDay}
                                                    renderInput={renderInput}
                                                    closeOnSelect={true}
                                                />*/}
                                               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <Grid >
                                                <div style={{paddingTop: '10px'}}>
                                                    <KeyboardDatePicker
                                                        clearable
                                                        value={props.selectedDate}
                                                        placeholder="10/10/2018"
                                                        onChange={date => props.handleDateChange(date)}
                                                        minDate={new Date()}
                                                        format="MM/dd/yyyy"
                                                        style={{ fontSize: '50px' }}
                                                    />
                                                    </div>
                                                    </Grid>
                                                    </MuiPickersUtilsProvider>
                                            </div>
                                    
                                    <br/><br/>

                                    <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                                                    <Grid >
                                        <TimePicker
                                            clearable
                                            ampm={false}
                                            label="24 hours"
                                            value={props.selectedStartTime}
                                            onChange={props.handleStartTimeChange}
                                        />
                                        </Grid>
                                        </MuiPickersUtilsProvider>
                                        <br/>
                                    <div>
                                      <button className="btn"
                                       style={{borderRadius: '15px',border: '#2fafcc 3px solid',background: '#4de2ac',marginTop:'0px',
                                       color: '#fff',fontWeight: '700'}}
                                       onClick={props.addProductToCart}>ADD</button>
                                    </div>
                            </div>
                        </div >
                    </div >
                </div >
                </div>
                <br/>
                <div class="row" style={{paddingLeft:'120px',paddingRight:'120px'}}>
                    <b>MORE DETAILS </b> : {info.description}

                </div>
               <br/>
                <div className="divider">
                    <center><img src={lefthr} style={{width:'140px'}}/>Related Product&nbsp;<img src={righthr} style={{width:'140px'}}/></center>
                  </div>
                  <br/>
                  <div className="row">
                    <div className="relatedProd hp-carousel">
                        <AliceCarousel
                            items={props.children}
                            responsive={props.responsive}
                            dotsDisabled
                            infinite={false}
                        />
                    </div>
                </div>
             {props.upsellChildrens && !_isEmpty(props.upsellChildrens) &&
                                <div>
                                <div className="divider">
                                    <center><img src={lefthr} style={{width:'140px'}}/>Upsell Product&nbsp;<img src={righthr} style={{width:'140px'}}/></center>
                                </div>
                                <br/>
                                <div className="row">
                                <div className="relatedProd hp-carousel">
                                <AliceCarousel
                                    items={props.upsellChildrens}
                                    responsive={props.responsive}
                                    dotsDisabled
                                    infinite={false}
                                />
                            </div>
                        </div>
                        </div>
                    }
                    {props.productReviewData && props.productReviewData.result && props.productReviewData.result.length > 0 &&
                 <div className="container">
                   <div className="row cust-reviews-div">
                        <div className='col-xs-12' id="review-list">
                        <center><p style={{fontSize:'20px'}}>{props.productReviewData.result.length} customer reviews</p></center>
                        <br/>
                        {props.productReviewData && props.productReviewData.result &&
                                        props.productReviewData.result.map((eachReview, index) => {
                                            if (index < props.showData) {
                                            return (
                                        <div key={index} style={{marginLeft:'150px',marginRight:'150px',marginTop: '10px'}}>
                                            <div class="row">
                                               <div className="col-sm-1">
                                                   <img src={righthr} style={{height:'40px',width:'40px',borderRadius: '50%'}}/>
                                                </div>
                                                <div className="col-sm-11" style={{marginTop: '10px'}}>
                                                  <b>{eachReview.nickname}</b>
                                                </div> 
                                            </div>
                                            <div class="row">
                                               <div className="col-sm-1">
                                                   
                                                </div>
                                                <div className="col-sm-11" style={{marginTop: '10px'}}>
                                                        <div class="row">
                                                               <div className="col-sm-3">
                                                               <StarRatings
                                                                        rating={Number(eachReview.rating_value) ? Number(eachReview.rating_value) : 0}
                                                                        starDimension="20px"
                                                                        starSpacing="1px"
                                                                        starEmptyColor="#434343"
                                                                        starRatedColor="#fdb927"
                                                                    />
                                                                </div>
                                                                <div className="col-sm-9">
                                                                     <b>{eachReview.title}</b>
                                                                </div> 
                                                        </div>
                                                </div> 
                                            </div>
                                            <div class="row">
                                               <div className="col-sm-1">
                                                   
                                                </div>
                                                <div className="col-sm-11">
                                                   {eachReview.created_at}
                                                </div>
                                                </div>
                                            <div class="row">
                                               <div className="col-sm-1">
                                                   
                                                </div>
                                                <div className="col-sm-11">
                                                   {eachReview.detail}
                                                </div>
                                                </div>
                                         
                                       </div> 
                           );
                            }
                        })
                    }                     
                        </div>
                    </div>
                 </div>
                }
                <br/>
                <div style={{marginLeft:'280px',marginTop: '10px'}}>
                <div class="row">
                 <div class="col-sm-6">
                <a onClick={() => props.toggleReviewModalFn()} >
                <img style={{height:'40px',width:'135px'}} src={revButton}/>
                </a>
                </div>
                <div class="col-sm-6" style={{paddingLeft:'150px'}}>
                {_get(props.productReviewData, 'total_reviews') > 3 &&
                                             <a onClick={() => props.focusReview(_get(props.productReviewData, 'total_reviews'))}>
                                            <span className="more-reviews"><b>See {Number(_get(props.productReviewData, 'total_reviews')) - 3} more reviews >></b></span>
                                         </a>
                                        }
                </div>
                 </div>
                 </div>
                  <br/>
               
                {
                     props.showReviewModal &&
                    <MaModal open={props.showReviewModal} handleCloseModal={() => props.toggleReviewModalFn()}>
                   <div style={{backgroundColor:'#0077bf',marginTop:'-20px',height:'64px'}}>
                            <center><h3 style={{color:'white',paddingTop:'20px'}}>Rate and  Review</h3></center>
                    </div> 
                    <br/>
                    <div>
                        <h3 style={{paddingLeft: '150px'}}>Alice Reid</h3>
                        <br/>
                      
                    <center>   <p>Your Review Will Be Publically Posted On The Web. <b style={{color:'blue'}}>Learn More</b></p>
                        <br/> 
                    <StarRatings
                                rating={props.rating}
                                starRatedColor="yellow"
                                starDimension="25px"
                                starSpacing="1px"
                                changeRating={props.changeRating}
                                numberOfStars={5}
                                name='rating'
                                className="field-input"
                            />
                            <br/><br/><br/>
                       <div>
                         <input style={{width:'400px'}} type="text" className="no-outline" placeholder="Enter Title"/>
                       </div>
                       <br/>
                       <br/>
                       <br/>
                       <div>
                         <input style={{width:'400px'}} type="text" className="no-outline" placeholder="Sharer Details Of Your own Experience At This Place"/>
                       </div>
                       <br/><br/><br/>
                       <button type="button" style={{height:'50px',width:'200px'}} className="btn-primary">Post</button>
                       </center>
                     </div>
                  </MaModal>
                }
                {
                    props.showImageModal &&
                    <Modal
                        bsSize="small"
                        aria-labelledby="contained-modal-title-sm" show={props.showImageModal} onHide={() => props.toggleImgModalFn()} className="imgDetailModal">
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div>
                                    <img src={_get(props.productImageUrl, 'url')} width="100%" />
                                </div>
                                <p>Image {_get(props.productImageUrl, 'ind') + 1} of {_get(props.productImageUrl, 'length') + 1}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => props.toggleImgModalFn()}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                }
            </div >
        );
    }
    return (<div> '' </div>);
}
     