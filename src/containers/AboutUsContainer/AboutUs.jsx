import React from 'react';
import ReactDOM from 'react-dom';
import _get from 'lodash/get';
import MetaTags from 'react-meta-tags';
import ExploreImage from '../../assets/images/Explore.png';
import GrowerImage from '../../assets/images/Grower.png';
import DeliveryImage from '../../assets/images/Delivery.png';
import DeliveredImage from '../../assets/images/Delivered.png';
import SustainabilityImage from '../../assets/images/sustainability-seal.png';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

class AboutUsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadCrumbsList: [
        {
          link: '/',
          name: 'home',
        },
        {
          link: undefined,
          name: 'BUY BULK FLOWERS DIRECTLY FROM FARMS WITH WHOLESALE MARKET PRICE| BLOOMKONNECT.C...',
        },
      ],
    };
  }
  componentDidMount() {
    document.title = 'Buy Bulk Flowers Directly From Farms With Wholesale Market Price, Wholesale Flower | Bloomkonnect.com';
    // document.title = 'About Us';
    // const meta = document.createElement('meta');
    // // meta.httpEquiv = 'X-UA-Compatible';
    // meta.content = 'width=device-width, initial-scale=1';
    // meta.name = 'about';
    // meta.description = 'about';
    // meta.title = 'bhavitha';
    // document.getElementsByTagName('head')[0].appendChild(meta);
    this.scrollToDiv();
  }
  componentDidUpdate(prevProps) {
    if (_get(prevProps, 'location.hash') !== _get(this.props, 'location.hash')) {
      this.scrollToDiv();
    }
  }
  scrollToDiv = () => {
    const hashId = this.props.history.location.hash;
    switch (hashId) {
      // eslint-disable-next-line no-case-declarations
      case '#howitwork':
        const howitworkNode = ReactDOM.findDOMNode(this.refs.howitwork);

        // Scroll certain amounts from current position
        window.scrollTo({
          top: howitworkNode.offsetTop - 80, // could be negative value
          behavior: 'smooth',
        });
        break;
      // eslint-disable-next-line no-case-declarations
      case '#features':
        const featuresNode = ReactDOM.findDOMNode(this.refs.features);

        window.scrollTo({
          top: featuresNode.offsetTop - 80, // could be negative value
          behavior: 'smooth',
        });
        break;
      // eslint-disable-next-line no-case-declarations
      case '#pricing':
        const pricingNode = ReactDOM.findDOMNode(this.refs.pricing);

        window.scrollTo({
          top: pricingNode.offsetTop - 80, // could be negative value
          behavior: 'smooth',
        });
        break;
      // eslint-disable-next-line no-case-declarations
      default:
        const aboutusNode = ReactDOM.findDOMNode(this.refs.aboutus);

        window.scrollTo({
          top: aboutusNode.offsetTop - 50, // could be negative value
          behavior: 'smooth',
        });
    }
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    // document.getElementsByTagName('META')[2].content = 'At BloomKonnect, we pride ourselves in revolutionizing the floral business by removing the middleman and extra costs that come with it. ';
    // document.getElementsByTagName('META')[2].title = 'At BloomKonnect, we pride ourselves in revolutionizing the floral business by removing the middleman and extra costs that come with it. ';
    // document.getElementsByTagName('META')[2].name = 'about-us';
    // document.getElementsByTagName('META')[2].description = 'At BloomKonnect, we pride ourselves in revolutionizing the floral business by removing the middleman and extra costs that come with it.';
    return (
      <div>
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className="container container-main">
          <MetaTags>
            {/* <title>Page 1</title> */}
            <meta name="description" content="At BloomKonnect, we pride ourselves in revolutionizing the floral business by removing the middleman and extra costs that come with it." />
            {/* <meta property="og:title" content="MyApp" /> */}
          </MetaTags>
          <div className="em-inner-main">
            <div className="em-main-container em-col1-layout">

              <div className="em-col-main col-sm-24">
                <div className="std">
                  <div className="howitwork-mainblock">
                    <div ref="aboutus" className="howitwork aboutus-block">
                      <div className="title">
                        <hr />
                        <h3>About Us</h3>
                      </div>
                      <div className="aboutus1">
                        <div className="cont">
                          <p>At BloomKonnect, we pride ourselves in revolutionizing the floral business by removing the
                          middleman and extra costs that come with it.  We want industry professionals to get the most
                          fresh and best product from around the world while experiencing savings from our streamlined
                          supply chain. Because of this, we offer flowers for a longer period of time at a better price,
                          all while helping farmers do better for their communities. Currently, our marketplace offers
                          flowers from Holland, locations across North and South America, Ethiopia, Kenya, Thailand, and
                          Vietnam, based on seasonal demands.</p><p> Our supply chain uses traditional transportation
                          channels, including temperature-controlled airfreight and refrigerated trucks, as well as
                          cutting edge small package delivery services using a cold-chain service through the morning
                          of delivery.  These methods cut up to 80% of travel time from the farms to the florists,
                          taking an average of two days instead of the typical ten.</p><p> Currently, we only sell to
                          florists, event planners, and industry professionals. Headquartered in the United States,
                          we also have a global presence in Colombia, India, and Singapore to work directly with our
                          global suppliers. Interested in what we have to offer? Register for a membership with us to
                          place an order within minutes! and you’ll be placing an order within minutes! We look forward
                          to helping all your floral needs!</p>
                        </div>
                      </div>
                    </div>
                    <div ref="howitwork" className="howitwork howitwork-block">
                      <div className="title">
                        <hr />
                        <h3>How it Works</h3>
                      </div>
                      <div className="howitworks1">
                        <p> We have worked diligenty to streamline the flower-buying process for you! We connect you
                        directly with the grower for fresher product, faster shipping with more affordable prices.
                        Take a look to see how the flowers will go from the farm to you!</p>
                        <div className="howitworks-img-content">

                          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                            <img className="img-responsive" src={ExploreImage} alt="" />
                            <br />
                            <label>Explore the Products</label>
                            <br />
                            <span>See our extensive list of <br />vendors and select your<br />grower of choice</span>
                          </div>
                          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                            <img className="img-responsive" src={GrowerImage} alt="" />
                            <br />
                            <label>Get Grower-Direct Prices</label>
                            <br />
                            <span>Farm growers set the prices<br />and you save money</span>
                          </div>
                          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                            <img className="img-responsive" src={DeliveryImage} alt="" />
                            <br />
                            <label>Delivery Options</label>
                            <br />
                            <span>Choose available delivery<br />method for you desired<br />delivery dates</span>
                          </div>
                          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                            <img className="img-responsive" src={DeliveredImage} alt="" />
                            <br />
                            <label>Products Gets Delivered!</label>
                            <br />
                            <span>After you checkout, your product<br />will arrive as fast as 24-hours<br />(depends on origin)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div ref="features" className="howitwork features-block">
                      <div className="title">
                        <hr />
                        <h3>Features and Benefits</h3>
                      </div>
                      <div className="feature-content">
                        <p> Our Marketplace combines years of expertise to give you a more efficient flower-buying experience and
                            great customer service.Take a look to see our helpful features and benefits below</p>
                      </div>
                      <div className="features1">
                      </div>
                    </div>
                    <div ref="pricing" id="price" className="howitwork pricing-block">
                      <div className="title">
                        <hr />
                        <h3>Pricing and Shipping</h3>
                      </div>
                      <div className="pricing1">
                        <section className="about-block5-bg1 col-xs-4 col-sm-4 col-md-4 col-lg-4">
                          <h1>Farm Price</h1>
                          <p>We show you farm prices set by the growers</p>
                        </section>
                        <span>+</span>
                        <section className="about-block5-bg2 col-xs-7 col-sm-7 col-md-12 col-lg-6">
                          <h1>Landing Price</h1>
                          <p>Farm price + cost of shipping from farm to port of entry.</p>
                        </section>
                        <span>+</span>
                        <section className="about-block5-bg3 col-xs-7 col-sm-7 col-md-12 col-lg-6">
                          <h1>Delivery Price</h1>
                          <p>Land price + cost of delivery <br />to your door.</p>
                        </section>
                      </div>
                    </div>
                    <div id="sustainability" className="howitwork sustainability-block">
                      <div className="title">
                        <hr />
                        <h3>Sustainability</h3>
                      </div>
                      <div className="sustainability-content">
                        <p>BloomKonnect is targeting complete sustainability by 2020, and our Sustainable Floral Fund strives to
                            help partner farms receive certification to help both social and environmental welfare.</p>
                      </div>
                      <div className="sustainability1">
                        <img src={SustainabilityImage} />
                        <p>Environmental and social welfare are very important causes to us. Too often flower farms are uncertified,
                        putting their employees’ safety and well-being at risk while damaging the environment and product while not
                        using ecological materials. Because these issues are all too rampant in the industry, we have developed the
                        Sustainable Floral Fund. Aiming to achieve complete sustainability in our partner farms by 2020, we hope to
                        positively influence the floral industry by implementing more environmentally-friendly and socially-conscious
                        practices to protect the welfare of the farms and their employees. We are working hard to develop ways to
                        improve for everyone’s benefit as well as looking after the well-being of our planet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AboutUsContainer;
