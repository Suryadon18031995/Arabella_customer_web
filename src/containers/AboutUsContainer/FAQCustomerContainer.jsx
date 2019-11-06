import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Button from 'react-bootstrap/lib/Button';
import CartImage from '../../assets/images/cart.png';
import CartNtAllowedImage from '../../assets/images/cart-not-allowed.png';
import WishlistImage from '../../assets/images/wishlist.png';
import FavouriteImage from '../../assets/images/favourite.png';
import CompareImage from '../../assets/images/compare.png';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

const rowsCustomer = [
  {
    title: 'What is BKM for customers?',
    titleText: 'what is bkm for customers?',
    content: <p>Customers anywhere in the world can buy flowers, from flower growers directly.</p>,
  },
  {
    title: <div><p>What is "Add to cart"</p><img src={CartImage} className="media-object  " /></div>,
    titleText: 'what is add to cart?',
    content: <p>Add to Cart is a way to create a temporary list of items by adding them to your cart, which will keep track of the items until you leave our website.</p>,
  },
  {
    title: <div><p>Why am I not able to "add to cart"?</p><img src={CartNtAllowedImage} className="media-object " /></div>,
    titleText: 'why am i not able to add to cart?',
    content: <p>It looks your zip code don't have an exact logistics. Please create an account or contact our team.</p>,
  },
  {
    title: 'How can I buy flowers through the marketplace?',
    titleText: 'how can i buy flowers through the marketplace?',
    content: <ol>
      <li> Search,</li>
      <li> Add to cart.</li>
      <li> Add billing address and shipping address.</li>
      <li> Make Payment...just these 4 steps to place an order.</li>
    </ol>,
  },
  {
    title: 'What is Landing Price?',
    titleText: 'what is landing price?',
    content: <p>Landing price is the cost involved to get the product to the country you live. You won't be charged for this if your vendor is from same country.</p>,
  },
  {
    title: 'What is Delivery Price?',
    titleText: 'what is delivery price?',
    content: <p>Delivery price is the cost involved to get the product to your shipping address from your port of entry or from farm in case the vendor is from same country.</p>,
  },
  {
    title: 'What is Total Price?',
    titleText: 'what is total price?',
    content: <p>Sum of Product cost, Landing price, Delivery cost.</p>,
  },
  {
    title: 'How many days will it take to reach me?',
    titleText: 'how many days will it take to reach me?',
    content: <p>It depends on the vendor farming dates, shipping days and delivery dates. Please login to get the exact dates of delivery.</p>,
  },
  {
    title: 'Can I buy from anywhere in the world?',
    titleText: 'can i buy from anywhere in the world?',
    content: <p>Yes, customer can buy from anywhere in the world, as far as you are comfortable with pricing and products.</p>,
  },
  {
    title: 'How am I protected, if I get wrong flowers?',
    titleText: 'how am i protected, if i get wrong flowers?',
    content: <p>We gaurantee on quality on freshness of flowers and their exact ordered type. We have the special certified vendors called “Sustainably Certified". The vendors holding this certificate are most trusted. Even for other vendor we maintain their ratings and reviews to find their quality.</p>,
  },
  {
    title: 'How can I reach my vendor?',
    titleText: 'how can i reach my vendor?',
    content: <p>Payments are very secured, in bank transfer mode and by Credit/Debit card mode.</p>,
  },
  {
    title: 'How can I pay?',
    titleText: 'how can i pay?',
    content: <p>Can be paid by card, bank transfer. You also can get credit limit based on your purchases and trust.</p>,
  },
  {
    title: 'How to get a credit limit?',
    titleText: 'how to get a credit limit?',
    content: <p>It depends per each customer, please contact our customer care.</p>,
  },
  {
    title: 'Do I always need to login to make a purchase?',
    titleText: 'do i always need to login to make a purchase?',
    content: <p>Not really, if you have shipping through UPS/FedEx logistics throughout the delivery process.</p>,
  },
  {
    title: <div><p>What is "wishlist"?</p><img src={WishlistImage} className="media-object " /></div>,
    titleText: 'what is wishlist?',
    content: <p>Online wish lists are digital collections of items that shoppers would like to own. Users add products to a list connected to their profile on a specific website. The list is saved on the site so the customer can refer back to it later or move merchandise into their shopping cart to purchase.</p>,
  },
  {
    title: <div><p>What is "My Favorites"?</p><img src={FavouriteImage} className="media-object " /></div>,
    titleText: 'what is my favorites?',
    content: <p>Online Favorite lists are digital collections of items that shoppers would favorite. Users add products to a list connected to their profile on a specific website. The list is saved on the site so the customer can refer back to it later or move merchandise into their shopping cart to purchase.</p>,
  },
  {
    title: 'Do I get the exact product seen in image?',
    titleText: 'do i get the exact product seen in image?',
    content: <p>No Image of the product is only for representing the flower.</p>,
  },
  {
    title: 'Can I buy from anywhere to anywhere?',
    titleText: 'can i buy from anywhere to anywhere?',
    content: <p>Yes customer can buy from anywhere.</p>,
  },
  {
    title: 'I am a vendor , can I buy and resell here?',
    titleText: 'i am a vendor , can i buy and resell here?',
    content: <p>Yes, you can buy from the site and sell as a vendor, but should maintained the flower standards.</p>,
  },
  {
    title: 'Will you deliver to my Office or Home? or my friends address?',
    titleText: 'will you deliver to my office or home? or my friends address?',
    content: <p>Yes shipping address to be mentioned and the products are delivered to the respective address.</p>,
  },
  {
    title: 'Do I need to pay completely before delivery?',
    titleText: 'do i need to pay completely before delivery?',
    content: <p>Yes all the payments needs to be completely made, then only order will get placed.</p>,
  },
  {
    title: 'Do you accept part payments?',
    titleText: 'do you accept part payments?',
    content: <p>No, at this point of time.</p>,
  },
  {
    title: 'What to do if I do not get the delivery before delivery date?',
    titleText: 'what to do if i do not get the delivery before delivery date?',
    content: <p>We always have strict policy for vendors and customers, please get back to our team if you have any issues in the process.</p>,
  },
  {
    title: 'What is Sustainably certified?',
    titleText: 'what is sustainably certified?',
    content: <p>Sustainability standards and certifications are voluntary, usually third party-assessed, norms and standards relating to environmental, social, ethical and food safety issues, adopted by companies to demonstrate the performance of their organizations or products in specific areas.</p>,
  },
  {
    title: <div><p>How to compare products?</p><img src={CompareImage} className="media-object " /></div>,
    titleText: 'how to compare products?',
    content: <p>Please click on the button in the products block to compare products.</p>,
  },
  {
    title: 'How to register a customer?',
    titleText: 'how to register a customer?',
    content: <div>
      <div className="media-content">
        <ol>
          <li>Access <a href="https://uat.bloomkonnect.com/test/"><b>http://bloomkonnect.com/marketplace</b></a> from your browser.</li>
          <li>Click on login on right top of screen.</li>
          <li>Click on "register" on the popup, this expands a new page.</li>
          <li>Please fill all the fields and click on "Submit" to create account.</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://bloomkonnect.com/skin/frontend/em0131/default/images/faq-media-customer/customer_registration_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to Login to my Account?',
    titleText: 'how to login to my account?',
    content: <div>
      <div className="media-content">
        <ol>
          <li>Access <a href="https://uat.bloomkonnect.com/test/"><b>http://bloomkonnect.com/marketplace</b></a> from your browser.</li>
          <li>Click on login on right top of screen.</li>
          <li>Enter username and password and click on "Login".</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_login_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to search for products after logging?',
    titleText: 'how to search for products after logging?',
    content: <div>
      <div className="media-content">
        <ol>
          <li>Access <a href="https://uat.bloomkonnect.com/test/"><b>http://bloomkonnect.com/marketplace</b></a> from your browser.</li>
          <li>Click on login on right top of screen.</li>
          <li>Enter username and password and click on "Login"</li>
          <li>Click on all flowers or take your cursor on all flowers on menu.</li>
          <li>This displays the categories of flowers available.</li>
          <li>Click on particular category or ""All flowers "" which lands on search results page."</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_login_and_search_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to search for products without logging?',
    titleText: 'how to search for products without logging?',
    content: <ol>
      <li>Please navigate to Login</li>
      <li>On pop up Please enter Country and ZipCode.</li>
      <li>Click "Enter"</li>
      <li> Click on "All flowers"</li>
      <li>Will display all flowers for that zipcode customer.</li>
    </ol>,
  },
  {
    title: 'How to add products to wishlist?',
    titleText: 'how to add products to wishlist?',
    content: <div>
      <div className="media-content">
        <ol>
          <li>From search results click on " Add to Wishlist " Icon.
                        <img src={WishlistImage} />
          </li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_loggedin custtomer_add_to_wishlist_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to add products to cart?',
    titleText: 'how to add products to cart?',
    content: <div>
      <div className="media-content">
        <ol>
          <li>From search results click on " Add to Cart " Icon.
                      <img src={CartImage} />
          </li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_loggedin custtomer_add_to_cart_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to mark products as favorites?',
    titleText: 'how to mark products as favorites?',
    content: <div>
      <div className="media-content">
        <ol>
          <li>From search results click on "Add to Favorites" Icon.
                  <img src={FavouriteImage} />
          </li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_loggedin custtomer_add_to_favorite_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to add billing and shipping address?',
    titleText: 'how to add billing and shipping address?',
    content: <div>
      <div className="media-content">
        <h4><b>Logged In User:- </b></h4>
        <ol>
          <li> Go to " My Account"</li>
          <li> Click on "Address" Menu from left panel</li>
          <li> Enter billing and shipping address and save</li>
        </ol>
        <h4><b>Not logged in user :-</b></h4>
        <ul>
          <li> Complete your shopping as guest, on the process you will be asked to enter billing and shipping address before payment.</li>
        </ul>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_loggedin customer_add billing and shipping address_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to place order after logging in?',
    titleText: 'how to place order after logging in?',
    content: <div>
      <div className="media-content">
        <ol>
          <li> From search results , choose a product and click on " add to cart ".</li>
          <li> Click on " cart " on right top.</li>
          <li> Confirm your cart.</li>
          <li> Add billing and shipping address.</li>
          <li> Complete payment.</li>
          <li> Your order is completed.</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_loggedin customer_place_an_order_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to see My orders?',
    titleText: 'how to see my orders?',
    content: <div>
      <div className="media-content">
        <ol>
          <li> Login to customer account.</li>
          <li> Click on My account icon, on right top.</li>
          <li> Redirects to My account page.</li>
          <li> Click on the tab which reads " My orders ".</li>
          <li> This will display all orders.</li>
          <li> Click on "View Order" to see order in detail.</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_my_orders_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to rate my vendors?',
    titleText: 'how to rate my vendors?',
    content: <div>
      <div className="media-content">
        <ol>
          <li> Login to customer account.</li>
          <li> Click on My account icon, on right top.</li>
          <li> redirects to My account page.</li>
          <li> click on the tab which reads " My Vendor pending reviews ".</li>
          <li> This will display all orders with pending reviews.</li>
          <li> Submit your reviews.</li>
        </ol>
      </div>
      <div className="media-player">

        <video width="500" id="v1" controls>
          <source
            src="https://uat.bloomkonnect.com/test/skin/frontend/em0131/default/images/faq-media-customer/customer_vendor_pending_reviews_720mp_final_20dec2016_v1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>,
  },
  {
    title: 'How to place order as guest?',
    titleText: 'how to place order as guest?',
    content: <ol>
      <li> Please navigate to Login</li>
      <li> On pop up Please enter Country and Zip Code.</li>
      <li> Click "Enter"</li>
      <li> Click on "All flowers"</li>
      <li> Follow the same process as logged in customer.</li>
      <li> Enter "Billing address and Shipping Address" at checkout.</li>
    </ol>,
  },
];

class FAQCustomerContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchString: '',
      rowsCustomer: [],
      expandIndex: undefined,
      expandAll: false,
      breadCrumbsList: [
        {
          link: '/',
          name: 'home',
        },
        {
          link: undefined,
          name: 'FAQ CUSTOMER',
        },
      ],
    };
  }

  componentDidMount() {
    document.title = 'FAQ Customer';
    this.setState({ rowsCustomer });
  }

  handleChange = (event) => {
    const searchString = event.target.value.trim().toLowerCase();
    let rowsFiltered = rowsCustomer;
    if (searchString.length > 0) {
      rowsFiltered = rowsCustomer.filter(eachValue =>
        eachValue.titleText.match(searchString));
    }
    this.setState({
      searchString,
      rowsCustomer: rowsFiltered,
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
              {this.state.rowsCustomer && this.state.rowsCustomer.length &&
                this.state.rowsCustomer.map((object, indexCustomer) => (
                  <div className="accordionItem" key={indexCustomer}>
                    <li>
                      <PanelGroup>
                        <Panel eventKey={indexCustomer} expanded={(indexCustomer === this.state.expandIndex) || this.state.expandAll}
                          onToggle={() => this.handleCollapse(indexCustomer)}>
                          <div className="accordionItemHeading">
                            <Panel.Heading>
                              <Panel.Title onClick={() => this.handleCollapse(indexCustomer)}>
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
export default FAQCustomerContainer;
