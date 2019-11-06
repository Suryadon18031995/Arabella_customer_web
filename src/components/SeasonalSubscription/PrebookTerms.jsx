import React from 'react';
import imglogo from '../../assets/images/bloom_logo_small.png';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

const breadCrumbsList = [
    {
        link: '/',
        name: 'HOME PAGE',
    },
    {
        link: '/prebook-flower-subscription.html',
        name: 'SUBSCRIPTION',
    },
    {
        link: undefined,
        name: 'SUBSCRIPTION TERMS',
    },
];

function SubscriptionTerms() {
    window.scrollTo(0, 0);
    return (
        <React.Fragment>
            <BreadCrumbs
                list={breadCrumbsList} />
            <div className='container'>
                <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12'>
                    <div className='annual-heading prebook-heading'>
                        <h3>CHRISTMAS GREENS PRE-BOOK PROGRAM</h3>
                    </div>
                    <div className='col-lg-6 col-sm-12 col-md-6 col-xs-12'>
                        <div className='prebook-terms-block-mobile'>
                            <div className='inner-div'>
                                <span className='inner-div-terms'>Holiday Pre-Book</span>
                                <span className='inner-div-terms-sub'>starts now and ends October 4th, 2019</span>
                                <img src={imglogo} alt='logo' />
                                <span className='inner-div-terms-week'>Select your delivery day to arrive</span>
                                <span className='inner-div-terms-week'>between Dec. 2nd-Dec.5th</span>
                            </div>
                        </div>
                        <div className='faq-block-annual'>
                            <div className='faq-annual-desc'>
                                By electronically agreeing, I hereby subscribe to the items indicated on this order.  You may charge my credit or debit card for the one-time charge approximately one week ahead of my first shipment.  I further agree:
                    </div>
                            <ol>
                                <li>
                                    I will notify BloomKonnect at 877-356-6572 of a replacement card if my account is changed or the card otherwise becomes unusable. If my card becomes unusable and I fail to replace it, my order may be cancelled  or I will pay you directly by credit or debit when you call me.
                                </li>
                                <li>
                                    Any claims must be filed within 24 hours of receiving any shipment in question.
                                </li>
                                <li>
                                    BloomKonnect and the grower are not liable for any acts of God or other items outside of their control which may delay or make fulfillment impossible.  BloomKonnect reserves the right to substitute growers with equivalent growers and product.
                                </li>
                                <li>
                                    Any damages to all partied are limited to the amount paid or agreed to be paid.
                                </li>
                                <li>
                                    This offer is subject to acceptance by BloomKonnect and the corresponding growers.
                                </li>
                                <li>
                                    Credit Cards will be charged 7 days before delivery date.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <div className='prebook-terms-block'>
                            <div className='inner-div'>
                                <span className='inner-div-terms'>Holiday Pre-Book</span>
                                <span className='inner-div-terms-sub'>starts now and ends October 4th, 2019</span>
                                <img src={imglogo} alt='logo' />
                                <span className='inner-div-terms-week'>Select your delivery day to arrive</span>
                                <span className='inner-div-terms-week'>between Dec. 2nd-Dec.5th</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SubscriptionTerms;
