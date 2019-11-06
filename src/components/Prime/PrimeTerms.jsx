import React from 'react';
// import imglogo from '../../assets/images/bloom_logo_small.png';
import MetaTags from 'react-meta-tags';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

const breadCrumbsList = [
    {
        link: '/',
        name: 'HOME PAGE',
    },
    {
        link: '/premium-membership.html',
        name: 'My Premium Membership',
    },
    {
        link: '/premium-member-benefits.html',
        name: 'Premium Membership Details',
    },
    {
        link: undefined,
        name: 'BKM Premium Terms and Conditions',
    },
];

function SubscriptionTerms() {
    window.scrollTo(0, 0);
    return (
        <React.Fragment>
            <BreadCrumbs
                list={breadCrumbsList} />
            <div className='container'>
                <MetaTags>
                    <title>Premium Membership Program Terms</title>
                    <meta name="description" content='Premium membership program terms and conditions' />
                </MetaTags>
                <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12'>
                    <div className='annual-heading prebook-heading'>
                        <h3>BKM PREMIUM TERMS AND CONDITIONS</h3>
                    </div>
                    <div className='col-lg-6 col-sm-12 col-md-6 col-xs-12'>
                        <div className='prime-terms-block-mobile'>
                            {/* <div className='inner-div'>
                                <span className='inner-div-terms'>Holiday Pre-Book</span>
                                <span className='inner-div-terms-sub'>starts now and ends October 4th, 2019</span>
                                <img src={imglogo} alt='logo' />
                                <span className='inner-div-terms-week'>Select your delivery day to arrive</span>
                                <span className='inner-div-terms-week'>between Dec. 2nd-Dec.5th</span>
                            </div> */}
                        </div>
                        <div className='faq-block-annual prime-block'>
                            {/* <div className='faq-annual-desc'>
                                By electronically agreeing, I hereby subscribe to the items indicated on this order.  You may charge my credit or debit card for the one-time charge approximately one week ahead of my first shipment.  I further agree:
                            </div> */}
                            <ol>
                                <li>
                                    Customers may become a Premium Member by going to our Premium Membership Page and selecting the Annual Premium Membership option.
                                </li>
                                <li>
                                    Our current Annual Premium Membership cost is at $99.99.
                                </li>
                                <li>
                                    Customers will be given a 15-Day trial when first purchasing the Annual Premium Membership. Their credit or debit card will be authenticated for $0.
                                </li>
                                <li>
                                    After completing checkout customer will immediately become a Premium Member.
                                </li>
                                <li>
                                    Customers will be able to see their Premium Membership program under My Accounts - My Premium Membership – with the Auto-Renewal option will be on by default enabled.
                                </li>
                                <li>
                                    In case a customer wishes to opt-out of Premium Membership while a trial member, they may disable the Auto-Renewal option and after 15-days of trial they will become a Non-Premium Member and their card will not be charged.
                                </li>
                                <li>
                                    If the Auto-Renewal option is on, then on 15th Day from when the day customer started their trial the authenticated card will be charged $99.99.  As long as the Auto-Renewal option is enabled the system will automatically charge the customer the then current Premium fee every 12 months on the anniversary of the first charge.
                                </li>
                                <li>
                                    A Premium Member will not be charged the normal Shipping and Handling fee for each order they place at BloomKonnect.
                                </li>
                                <li>
                                    Premium Members will receive one point per dollar they spend on products at BloomKonnect. Refunds will be charged back for the points earned. Points may be redeemed at the then current rate which is currently, one dollar in savings for every one hundred points earned. BloomKonnect may offer other rewards in addition at its discretion.
                                </li>
                                <li>
                                    BloomKonnect may alter the terms of this Premium Member program at any time without notice.
                                </li>
                                <li>
                                    Premium Members may cancel the plan at any time. They will receive a pro-rata refund for the remaining months they have in their membership.  They may cancel the membership by clicking on the Cancel Membership button under My Account–My Premium Membership page.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <div className='prime-terms-block'>
                            {/* <div className='inner-div'>
                                <span className='inner-div-terms'>Holiday Pre-Book</span>
                                <span className='inner-div-terms-sub'>starts now and ends October 4th, 2019</span>
                                <img src={imglogo} alt='logo' />
                                <span className='inner-div-terms-week'>Select your delivery day to arrive</span>
                                <span className='inner-div-terms-week'>between Dec. 2nd-Dec.5th</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SubscriptionTerms;
