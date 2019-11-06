// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import LogoImage from '../../assets/images/logo.jpg';
import GraphImage from '../../assets/images/Graph.png';
import HandsImage from '../../assets/images/Hands.png';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

class SustainabilityContainer extends Component {
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
          name: 'SUSTAINABLE FLORAL FUND',
        },
      ],
    };
  }
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    document.title = 'Sustainable Floral Fund';
    window.scrollTo(0, 0);
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className="container">
          <div className='container-block'>
            <div className="row">
              <div className="sustain-block1">
                <img
                  alt=""
                  src={LogoImage}
                />
                <br />
                <h2>SUSTAINABLE FLORAL FUND</h2>
                <span className="subtitle">
                  Empowering Communities Through Flowers
            </span>
              </div>
              <div className="sus-block1 sustainable">
                <h2>ENHANCING MARKET ACCESS FOR SMALL AND MEDIUM-SIZED FARMS</h2>
                <section className="left">
                  <p>
                    We source our flowers from farms using our marketplace
                    technology platform, which connects growers directly to buyers,
                    allowing buyers to set their own prices, build their own brands,
                    and compete more effectively.
              </p>
                  <p className="eq">
                    No Intermediaries + Known Brand = Growers Make More Money
                  </p>
                </section>{' '}
                <section className="right">
                </section>
              </div>
              <div className="sus-block2 sustainable">
                <section className="left">
                  <h2>
                    TARGETING 100%
                <br />
                    SUSTAINABILITY BY 2020
              </h2>
                  <p>
                    We enhance the environmental and social welfare of our partner
                    farms and their employees by helping them become sustainably
                    certified. We are committed to achieving 100% sustainability
                    among our partner farms by 2020.
              </p>
                  <span className="eq">
                    Sustainability Certification = Higher Price + Cleaner
                    Environment + Improved Living Conditions
              </span>
                </section>{' '}
                <section className="right">
                  <img
                    alt=""
                    src={GraphImage}
                  />{' '}
                </section>
              </div>
              <div className="sus-block3 sustainable">
                <section className="left">
                </section>
                <section className="right">
                  <h2>
                    LEADING INDUSTRY-WIDE EFFORT TO INCREASE CERTIFICATION AMONG CUT
                    FLOWER FARMS
              </h2>
                  <p>
                    Given that most small and medium-sized farms lack the financial
                    and operational resources to become certified, we have
                    established an independent non-profit organization, the
                    Sustainable Floral Fund (SFF), to provide technical assistance
                    to farms seeking certification. SFF will be financed through
                    contributions from KaBloom as well as other industry players,
                    government agencies, and non-profits.
              </p>
                  <span className="eq">
                    Operational Support + Financial Support = Sustainability
                    Certification
              </span>
                </section>
              </div>
              <div className="sus-block4 sustainable">
                <section className="left">
                  <h2>SUPPORTING CAUSES BEYOND FLOWERS</h2>
                  <p>
                    We regularly partner with non-profits outside of the floral
                    industry to develop cause marketing campaigns that raise money
                    in support of important causes. In 2015, we ran campaigns for
                    several prominent non-profit organizations, including the
                    American Red Cross of Massachusetts, Big Sisters of Greater
                    Boston, and the Muscular Dystrophy Association.
              </p>{' '}
                  <span className="eq">
                    Cause Marketing = Great Product for the Customer + Fundraising
                    for the Non-Profit
              </span>
                </section>
                <section className="right">
                  <img
                    alt=""
                    src={HandsImage}
                  />
                </section>
              </div>
              <div className="sus-block5 sustainable">
                <section className="right">
                  <h2>INCREASING THE USE OF RECYCLABLE PACKAGING</h2>
                  <p>
                    We are committed to reducing the use of plastic in our packaging
                    materials, so our custom boxes and carrying cases are all made
                    from recycled materials. We are constantly looking for new ways
                    to reduce waste and carbon emissions, and implementing
                    environmentally-conscious practices to ensure a cleaner planet
                    for future generations.
              </p>{' '}
                  <span className="eq">
                    Recycled Packaging = Cleaner Environment + Responsible Business
              </span>
                </section>
              </div>

              <div className="sus-block6 sustainable">
                <section>
                  <h2>SOCIAL IMPACT OF CERTIFICATION</h2>
                  <p>
                    Sustainably-Certified farms must meet the basic labor conditions
                    set out by the ILO and national laws to ensure safe, healthy,
                    and equitable work environments. Certified farms adhere to
                    maximum working hours and promote worker training and
                    development. They are also encouraged to provide social security
                    coverage and support local communities through a variety of
                    initiatives, such as local purchasing, hiring, and
                    infrastructure improvements. Given that women make up the vast
                    majority of farm workers, certified farms are also required to
                    protect the rights of women and mothers.
              </p>
                </section>
              </div>
              <div className="sus-block7 sustainable">
                {' '}
                <section>
                  <h2>ENVIRONMENT IMPACT OF CERTIFICATION</h2>
                  <p>
                    Sustainably-Certified farms must reduce the environmental impact
                    of cut flower farming by encouraging growers to implement
                    efficient and sustainable farming techniques focused on reducing
                    pesticide use, conserving water, and sustaining healthy
                    ecosystems. Certified farms must implement pest control
                    practices that minimize environmental harm, including avoiding
                    the use of banned chemicals and reducing the use of dangerous
                    chemical product through alternative pest control and
                    fertilization practices. Farms are also encouraged to conserve
                    natural resources by implementing water efficient irrigation
                    technologies, monitoring and optimizing water usage, and
                    implementing other environmentally-sustainable practices around
                    energy use, greenhouse gas reduction, and product packaging.
                    Finally, certified farms are encouraged to take steps to protect
                    wildlife and habitat; provide safe storage, handling, and
                    disposal of chemicals; and recycle or compost waste when
                    possible.
              </p>{' '}
                </section>
              </div>
              <div className="sus-block8 sustainable">
                <h2 className="video-title">Watch Sustainability Video</h2>{' '}
                {/* <video id="video" class="media-object" width="100%" height="100%">
              {" "}
              <source
                src="https://bloomkonnect.com/skin/frontend/em0131/default/images/sustainable/BloomKonnect_Split1.mp4"
                type="video/mp4"
              />{" "}
            </video> */}
                <video width="400" controls autoplay="autoplay">
                  <source
                    src="https://bloomkonnect.com:8443/skin/frontend/em0131/default/images/sustainable/BloomKonnect_Split1.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    );
  }
}

export default SustainabilityContainer;
