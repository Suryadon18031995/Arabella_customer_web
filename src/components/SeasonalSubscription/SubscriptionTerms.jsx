import React from 'react';
import MetaTags from 'react-meta-tags';
import imglogo from '../../assets/images/bloom_logo_small.png';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

const breadCrumbsList = [
    {
        link: '/',
        name: 'HOME PAGE',
    },
    {
        link: '/annual-flower-subscription.html',
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
            <MetaTags>
                    <title>Annual Subscription Program Terms</title>
                    <meta name="description" content='Annual subscription program terms and conditions' />
                </MetaTags>
                <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12'>
                    <div className='annual-heading'>
                        <h3>ANNUAL SUBSCRIPTION PROGRAM</h3>
                    </div>
                    <div className='col-lg-6 col-sm-12 col-md-6 col-xs-12'>
                    <div className='annual-terms-block-mobile'>
                            <div className='inner-div'>
                            <span className='inner-div-terms'>Begins in <span>1-2 weeks.</span></span>
                            <span className='inner-div-terms'>Ends by 2nd Week of Sep, 2020.</span>
                            <img src={imglogo} alt='logo'/>
                            <span className='inner-div-terms-week'>First week of delivery is 9/30/19. If you sign up after the first week, your first order is then on a rolling date basis.</span>
                        </div>
                    </div>
                    <div className='faq-block-annual'>
                    <div className='faq-annual-desc'>
                            By electronically agreeing, I hereby subscribe to the items indicated on this order weekly ending by 2nd Week of Sep 2020.  You may charge my credit or debit card for the weekly charge approximately a week ahead.  I further agree
                    </div>
                        <ol>
                            <li>
                                I will notify BloomKonnect at 877-356-6572 of a replacement card if my account is changed or the card otherwise becomes unusable.  If my card becomes unusable and I fail to replace it, my subscription will be cancelled and I will be responsible for paying the early termination fee.
                        </li>
                            <li>
                                Unless I file a claim within 24 hours of receiving the first or second shipment, I may not cancel the program without an early cancellation fee of $199.99 per weekly box ordered.  Early cancellation fees will be charged automatically to my credit or debit card.
                        </li>
                            <li>
                                In an unforeseen situation, I may skip one week up to two-times for a $10 fee per box each time on at least 8-days notice.
                        </li>
                            <li>
                                BloomKonnect and the grower are not liable for any acts of God or other items outside of their control which may delay or make fulfillment impossible.  BloomKonnect reserves the right to substitute growers with equivalent growers and product.
                        </li>
                            <li>
                                Any damages to all partied are limited to the amount paid or agreed to be paid.
                        </li>
                            <li>
                                This offer is subject to acceptance by BloomKonnect and the corresponding growers.
                        </li>
                            <li>
                                Orders for delivery on holidays (e.g. Thanksgiving, Christmas, New Years) will be delivered one or two days early.
                        </li>
                        </ol>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <div className='annual-terms-block'>
                            <div className='inner-div'>
                            <span className='inner-div-terms'>Begins in <span>1-2 weeks.</span></span>
                            <span className='inner-div-terms'>Ends by 2nd Week of Sep, 2020.</span>
                            <img src={imglogo} alt='logo'/>
                            <span className='inner-div-terms-week'>First week of delivery is 9/30/19. If you sign up after the first week, your first order is then on a rolling date basis.</span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SubscriptionTerms;
