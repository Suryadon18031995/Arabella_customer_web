import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Button from 'react-bootstrap/lib/Button';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

const rowsVendor = [
  {
    title: 'About us',
    titleText: 'about us',
    content: <span>Our Innovative Online Marketplace, Removes the Middleman and Connects You Directly With Flower Farms
                Around the Globe, for Unbeatable Prices, Fresher Product, and Larger Product Selection.</span>,
  },
  {
    title: 'How does your program work?',
    titleText: 'how does your program work?',
    content: <ul>
      <li>Our Online Marketplace Connects you Directly to the Farm.</li>
      <li>Floral Growers Set the Price and You Save Money</li>
      <li>You Get Fresher Product</li>
      <li>We Provide Customer Assistance to Walk You Through Your First Online Order.</li>
    </ul>,
  },
  {
    title: 'Features and Benefits',
    titleText: 'features and benefits',
    content: <ul>
      <li>Do You Want the Best Way to Buy Flowers?</li>
      <li>Are You Tired of Overpaying for Flowers?</li>
      <li>Are You Tired of Getting Old Flowers?</li>
      <li>Are You Tired of Not Seeing a Grower’s Complete Product Selection?</li>
      <li>Use our services and get benefited and answers for all above questions.</li>
    </ul>,
  },
  {
    title: 'Pricing and Shipping',
    titleText: 'pricing and shipping',
    content: <ul>
      <li> Use Your Own Trucking Company From Miami.</li>
      <li> Otherwise, We Provide Delivery to These Areas: Chicago, Boston, New York, Philadelphia and Miami.</li>
      <li> Air Cargo: Pick Up at Your Local Airport, (10 Boxes or More).</li>
      <li> Express Shipping from Farms around the Globe: 1 Box or more delivered straight to your shop. Maintained in Cold-Chain Until Morning of Delivery.</li>
    </ul>,
  },
  {
    title: 'Login / Register',
    titleText: 'login / register',
    content: <div><h4>Set Up Your Account Today In 3 Easy Steps :</h4>
      <ol>
        <li>“Register on BloomKonnect.com/register”</li>
        <li> “Place Order”</li>
        <li> “Contact Us if You have Any Questions: 877-356-6572”</li>
      </ol></div>,
  },
  {
    title: 'Place an order',
    titleText: 'place an order',
    content: <div><h4>Please order in simple steps</h4>
      <ol>
        <li> Search.</li>
        <li> Add to cart.</li>
        <li> Pay and get confirmation.</li>
      </ol>
    </div>,
  },
  {
    title: 'What is BKM for vendors?',
    titleText: 'what is bkm for vendors?',
    content: <p>Vendors anywhere in the world can sell flowers, to florists directly.</p>,
  },
  {
    title: 'How can I register?',
    titleText: 'how can i register?',
    content: <div>
      <div className="media-content">
        <ol>
          <li> Access to <a href="https://uat.bloomkonnect.com/test/"><b>http://bloomkonnect.com/marketplace/dev/myfi/vendor/</b></a></li>
          <li> Click on " register new account "</li>
          <li> Redirects to new page</li>
          <li> Enter all mandatory fields</li>
          <li> Click on submit to create account.</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/Vendor _Registration.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to create a store?',
    titleText: 'how to create a store?',
    content: <div>
      <div className="media-content">
        <ol>
          <li> Login to vendor account using credentials</li>
          <li> navigate to Location and Shipping settings</li>
          <li> Click on ""add new location""</li>
          <li> Enter all the fields and click on "Save location settings"</li>
          <li> A new block is generated and when clicked the details are previously entered details are seen.
                        Multiple tabs are provided to add, logistics, fee, user, products offers.</li>
          <li> update details and save them.</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/Vendor_and_store_creation.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to add Products?',
    titleText: 'how to add products?',
    content: <div>
      <div className="media-content">
        <ol>
          <li> Login to vendor account using credentials.</li>
          <li> Navigate to ""Product Manager.</li>
          <li> Click on "" get product list.</li>
          <li> When we see all products click on the product that needs to be added and click on on pop up.</li>
          <li> Then admin will get a notification and then approve the product.</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/Vendor_adding_products.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to upload offer?',
    titleText: 'how to upload offer?',
    content: <div>
      <div className="media-content" >
        <ol>
          <li> Login to vendor account using credentials.</li>
          <li> Navigate to Upload offer.</li>
          <li> Download the sample offer file.</li>
          <li> Please enter the prices and quantity in the sheet as per the offers. Save as csv file.</li>
          <li> Select the effective and expiry date and time of offer. Choose the csv and click on submit.</li>
          <li> So new offers are uploaded.</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/Vendor_login_offer_uplaod.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How will logistics work?',
    titleText: 'how will logistics work?',
    content: <p>UPS &amp; FedEx are the major partners. we also work with K&amp;N and others. Logistics works from farm to customer. Depending on both the locations logistics cost is calculated.</p>,
  },
  {
    title: 'How will it benefit Vendor?',
    titleText: 'how will it benefit vendor?',
    content: <p>Vendor can manage all his farms and sell his products with single login.</p>,
  },
  {
    title: 'How Will BKM Work?',
    titleText: 'how will bkm work?',
    content: <ul>
      <li> Our Online Marketplace Connects you Directly to the Farm.</li>
      <li> Floral Growers Set the Price and You Save Money.</li>
      <li> You Get Fresher Product.</li>
      <li> We Provide Customer Assistance to Walk You Through Your First Online Order.</li>
    </ul>,
  },
];

class FAQVendorContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchString: '',
      rowsVendor: [],
      expandIndex: undefined,
      expandAll: false,
      breadCrumbsList: [
        {
          link: '/',
          name: 'home',
        },
        {
          link: undefined,
          name: 'FAQ VENDOR',
        },
      ],
    };
  }

  componentDidMount() {
    document.title = 'FAQ Vendor';
    this.setState({ rowsVendor });
  }

  handleChange = (event) => {
    const searchString = event.target.value.trim().toLowerCase();
    let rowsFiltered = rowsVendor;
    if (searchString.length > 0) {
      rowsFiltered = rowsVendor.filter(eachValue =>
        eachValue.titleText.match(searchString));
    }
    this.setState({
      searchString,
      rowsVendor: rowsFiltered,
    });
  }

  handleCollapse = (index) => {
    this.setState({
      expandIndex: this.state.expandIndex === index ? undefined : index,
      expandAll: false,
    });
  }

  handleExpand = () => {
    this.setState({
      expandAll: !this.state.expandAll,
      expandIndex: undefined,
    });
  }

  render() {
    return (
      <div>
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
              <div className="search_option">
                <span>
                  <input
                    type="text"
                    className="form-control search-box"
                    value={this.state.searchString}
                    onChange={this.handleChange}
                    placeholder="Search"
                  />
                </span>
              </div>
              <div className="expand_collapse">
                <Button onClick={this.handleExpand}>
                  {this.state.expandAll ? 'Collapse All' : 'Expand All'}
                </Button>
              </div>

            </div>
            <br /><br />
            <ul>
              {this.state.rowsVendor && this.state.rowsVendor.length &&
                this.state.rowsVendor.map((object, indexVendor) => (
                  <div className="accordionItem" key={indexVendor}>
                    <li>
                      <PanelGroup>
                        <Panel eventKey={indexVendor} expanded={(indexVendor === this.state.expandIndex) || this.state.expandAll}
                          onToggle={() => this.handleCollapse(indexVendor)}>
                          <div className="accordionItemHeading">
                            <Panel.Heading>
                              <Panel.Title onClick={() => this.handleCollapse(indexVendor)}>
                                {object.title}
                              </Panel.Title>
                            </Panel.Heading>
                          </div>{' '}
                          <div>
                            <Panel.Body collapsible>
                              <div className="borderbody-black">
                                {object.content}
                              </div>
                            </Panel.Body>
                          </div>
                        </Panel>
                      </PanelGroup>
                    </li>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default FAQVendorContainer;
