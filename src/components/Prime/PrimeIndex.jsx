import React from 'react';
// import _get from 'lodash/get';
import Link from 'react-router-dom/Link';
import imglogo from '../../assets/images/bloom_logo_small.png';
import cancelAnytime from '../../assets/images/cancel-anytime.png';
import qualityConvenience from '../../assets/images/quality-convenience.png';
import monthlySavings from '../../assets/images/monthly-savings.png';

export default function PrimeSubIndex(props) {
  return (
    <div className='container container-main prime-parent' id='select-fav-offer'>

      <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding">
        <div className='prime-heading'>
          <h3>BKM PREMIUM MEMBERSHIP FEATURES AND BENEFITS</h3>
        </div>
        <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center no-padding">
          <div className="con-prime">
            <img src={`${process.env.APPLICATION_CLOUD_URL}/premium/Unlimited-Free-Shipping.jpg`}
              alt='Free Shipping' />
            <h3>Unlimited Free-Shipping</h3>
            <div className='con-prime-hr' />
            <div className='con-prime-div'>
              As a BKM Premium Member, you enjoy unlimited free shipping on
              every order every time for the entire year! You will pay for your entire
              year of membership fee with less than 10 orders.
                </div>
          </div>
        </div>

        <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center no-padding">
          <div className="con-prime">
            <img src={`${process.env.APPLICATION_CLOUD_URL}/premium/Loyalty-Savings-and-Rewards.jpg`}
              alt='Loyalty Savings and Rewards' />
            <h3>Loyalty Savings and Rewards</h3>
            <div className='con-prime-hr' />
            <div className='con-prime-div'>
              BKM Premium Members get exclusive access to our rewards<br />
              program that is as dynamic as your business! Earn one point for <br />
              every dollar you spend on our platform. It’s so easy; you shop, <br />
              you save, and you earn!
               </div>
          </div>
        </div>

        <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center no-padding">
          <div className="con-prime">
            <img src={`${process.env.APPLICATION_CLOUD_URL}/premium/Members-Only-Deals.jpg`}
              alt='Member’s-Only Deals' />
            <h3>Members-Only Deals</h3>
            <div className='con-prime-hr' />
            <div className='con-prime-div'>
              At BloomKonnect, we pride ourselves on delivering high quality <br />
              farm-direct fresh flowers at better than wholesale prices. As a<br />
              Premium Member, you can expect this but better, with amazing<br />
              members-only deals, and early-bird access to some of our<br />
              limited-availability items.
                 </div>
          </div>
        </div>

        <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center no-padding">
          <div className="con-prime">
            <img src={`${process.env.APPLICATION_CLOUD_URL}/premium/COMING-SOON-Concierge-Support-Program.jpg`}
              alt='Exclusive Features and Benefits' />
            <h3>COMING SOON – Exclusive Features and Benefits</h3>
            <div className='con-prime-hr' />
            <div className='con-prime-div'>
              Your satisfaction is our highest priority, which is why we carefully<br />
              select every grower that we invite on our platform and support you<br />
              with our relentless obsession to customer service. In addition, we<br />
              will be rolling out added features and benefits to make your journey<br />
              with us even better including special access to exclusive product.
                  </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 prime-line">
        As a <strong>BKM Premium Member</strong>, you will receive <strong>UNLIMITED</strong> Free-Shipping for the year, access to our Rewards Program, exclusive Members-Only Deals, and soon to be launched Concierge Support program.
      </div>

      <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
        <div className='prime-index'>
          <h3>BKM BONUS ADVANTAGES</h3>
        </div>
        <img className='annualSection-mobile' src='https://d2ob14u1yb5v44.cloudfront.net/media/premium/premium-icons.png' alt='Premium' />
      </div>
      <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 text-center annualSection">
        <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12">
          <div className="con-annual" id='prime-icon'>
            <img src={qualityConvenience} alt='Quality Convenience' />
            <h3>Quality and Convenience</h3>
            <div className='con-annual-hr' />
            <div className='con-annual-div'>
              Your satisfaction is our highest priority,<br />
              which is why we only source our <br />
              flowers from premium quality growers<br />
              and ship them direct from the farm<br />
              with convenient shipping services to fit<br />
              into your life.
              </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12">
          <div className="con-annual" id='prime-icon'>
            <img src={monthlySavings} alt='Monthly Savings' />
            <h3>Monthly Savings</h3>
            <div className='con-annual-hr' />
            <div className='con-annual-div'>
              At BloomKonnect, we pride ourselves on <br />
              delivering in-demand high quality fresh<br />
              flowers at better than wholesale prices,<br />
              and as a Premium Member, you can<br />
              expect this but better, with amazing<br />
              monthly savings and more!
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12">
          <div className="con-annual" id='prime-icon'>
            <img src={cancelAnytime} alt='Cancel Anytime' />
            <h3>Cancel Anytime</h3>
            <div className='con-annual-hr' />
            <div className='con-annual-div'>
              We know that the needs of our <br />
              customers change over time, sometimes<br />
              overnight which is why the BKM<br />
              Premium Membership can be cancelled<br />
              at anytime  without being penalized<br />
              with pesky cancellation fees!
            </div>
          </div>
        </div>
      </div>
      <Link to='/premium-member-benefits.html'>
        <img className='col-lg-12 col-sm-12  col-md-12 col-xs-12 annual-banners no-padding'
          src={`${process.env.APPLICATION_CLOUD_URL}/premium/BKM-Premium-Web-Page-Sub-Banner.jpg`}
          alt='BKM Premium' />
        <img className='col-lg-12 col-sm-12  col-md-12 col-xs-12 annual-banners-mobile'
          src={`${process.env.APPLICATION_CLOUD_URL}/premium/BKM-Premium-web-page-Sub-Banner-Mobile-Versions.jpg`}
          style={{ marginBottom: '10px' }}
          alt='BKM Premium' />
      </Link>
    </div >
  );
}

export function PrimeBenefits(props) {
  return (
    <div className='container container-main prime-parent' id='select-fav-offer'>

      <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding">
        <div className='prime-heading'>
          <h3>BKM PREMIUM MEMBERSHIP & BKM REWARDS PROGRAM</h3>
        </div>

        <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 text-center sub-div-cent no-padding">
          <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center first-half no-padding">
            <img src={`${process.env.APPLICATION_CLOUD_URL}/premium/1-Year-Membership.jpg`}
              alt='1-Year Membership' />
          </div>
          <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center second-half">
            <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12 cent-div'>
              <h3>1-Year Membership</h3>
              <img src={imglogo} alt='logo' />
              <div>
                For a small one-time fee of $99.99 saves you<br />thousands on shipping and handling fees.
            </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 text-center sub-div-cent no-padding">
          <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center first-half no-padding">
            <img src={`${process.env.APPLICATION_CLOUD_URL}/premium/BKM-Member-Free-Trial.jpg`}
              alt='BKM Member Free Trial' />
          </div>
          <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center second-half">
            <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12 cent-div'>
              <h3>BKM Member Free-Trial</h3>
              <img src={imglogo} alt='logo' />
              <div>
                We know once you try our 15-day free trial program,<br />
                you would never leave. However, for any reason,<br />
                you do not wish to continue after the free trial period,<br />
                please remember to cancel the membership.
            </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 text-center sub-div-cent no-padding">
          <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center first-half no-padding">
            <img src={`${process.env.APPLICATION_CLOUD_URL}/premium/Your-Member-Account.jpg`}
              alt='Your Member Account' />
          </div>
          <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12 text-center second-half">
            <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12 cent-div'>
              <h3>Your Member Account</h3>
              <img src={imglogo} alt='logo' />
              <div>
                To view membership status and your Reward points <br />
                details, please go to My Account-My Premium<br />
                Membership page.
            </div>
            </div>
          </div>
        </div>

      </div>

      <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 prime-line-ben">
        {/* <span>BKM Premium was built to fit your floral business needs, for a hassle free life!</span> */}
        <span>What are you waiting for?  Sign-up today and start saving and earning those rewards.</span>
        <span><Link target='_blank' to='/premium-terms.html'><u>Terms and conditions*</u></Link></span>
      </div>

      <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding">
        <div className='prime-heading-subb'>
          <h3>BKM REWARDS PROGRAM-HOW IT WORKS</h3>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding faq-block-annual rewards-section'>
          <h2>
            As a BKM Premium Member, <i>SAVE, EARN, AND GROW</i> your points portfolio!
          </h2>
          <div className='descr-elements'>
            Our flexible points program was designed specifically to give you more freedom over your earned points, so whether you choose to cash out at checkout, or to watch your points grow with every additional dollar you spend, the choice is yours!
          </div>
          <div className='li-elememnts'>
            <ol>
              <li>
                Every dollar you spend, is rewarded with an additional point.
              </li>
              <li>
                Once you reach 100 points, you earn another additional dollar so you are earning and saving simultaneously!
              </li>
              <li>
                To redeem your points, select the option at checkout.
              </li>
              <li>
                This unique and innovative customer facing rewards program is available to BKM Premium Members only.
              </li>
            </ol>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding'>
          <img src={`${process.env.APPLICATION_CLOUD_URL}/premium/BKM-Rewards-Program-How-It-Works-Banner-page-2.jpg`} alt='Rewards' />
        </div>
      </div>
    </div >
  );
}

// export default AnnualSubIndex;
