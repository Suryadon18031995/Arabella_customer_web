import React from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

class PrivacyPolicyContainer extends React.Component {
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
          name: 'PRIVACY POLICY',
        },
      ],
    };
  }
  componentDidMount() {
    document.title = 'Privacy Policy';
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className="container">
          <div className="page-title">
            <h1>Privacy Policy</h1>
            <br />
            <div class="std">
              <p>
                We appreciate the trust you place in BloomKonnect, and are
                committed to ensuring your privacy and the security of your
                personal information. Our privacy policy, updated October 01,
                2017, describes the information we collect and how we use it. We
                always welcome your questions and feedback. For privacy-related
                issues, please contact us at info@BloomKonnect.com.
            </p>
              <br />
              <p>
                <b>Information We Collect</b>
              </p>
              <p>
                We may collect information (including name, address, telephone
                number, email address and, when necessary, credit card
                information) when you:
            </p>
              <ul>
                <li> Place an order from our website</li>
                <li> Make a purchase at one of our retail stores</li>
                <li> Return an item or make an exchange</li>
                <li> Inquire about our services</li>
                <li> Request a catalogue</li>
                <li> Receive a gift package</li>
                <li> Create an account at BloomKonnect.com</li>
                <li>
                   Subscribe to our Email Newsletter for Preferred Customers
            </li>
                <li> Enter a contest or sweepstakes</li>
                <li> Are referred to us through a marketing promotion</li>
                <li> Participate in a marketing survey, promotion, or event</li>
              </ul>
              <br />
              <p>
                We maintain the data that you provide us, along with a record of
                your purchases, in a secure database. We also gather information
                about how visitors navigate through our website by using data
                gathered with "cookies" and/or other online tools such as "pixel
                tags." (See "Cookies and Pixel Tags" below for further
                information.)
            </p>
              <br />
              <br />
              <p>
                <b>Using Information We Collect </b>
              </p>
              <br />
              <p>
                {' '}
                We continuously strive to provide you with the best possible
                shopping experience and to fulfil your orders exactly as you've
                requested. In order to do this, we collect information that helps
                us to:
            </p>
              <br />
              <ul>
                <li>Process and track your order</li>
                <li>Provide the services you requested</li>
                <li>Contact you about the status of an order</li>
                <li>
                  {' '}
                  Send you promotional offers we believe will be of interest to
              you{' '}
                </li>
                <li>Send you the BloomKonnect Email Newsletter, if requested</li>
                <li>Identify your product and service preferences</li>
                <li> Customize our communications to you</li>
                <li>
                  {' '}
                  Provide information concerning product recalls or products you
              have purchased{' '}
                </li>
                <li> Improve our merchandise selection and customer service</li>
              </ul>{' '}
              <br />
              <p>
                {' '}
                <b>Information We Share with Others </b>
              </p>
              <br />
              <p>
                {' '}
                We contract with other companies to provide certain services,
                including credit card processing, shipping, email distribution,
                market research, and promotions management. We provide these
                companies with only the information they need to perform their
                services – we work closely with them to ensure that your privacy
                is respected and protected. These companies are prohibited by
                contract from using your information for their own marketing
                purposes or from sharing your information with anyone other than
                BloomKonnect.
            </p>
              <br />
              <p>
                {' '}
                On rare occasions, we may disclose specific information upon
                governmental request, in response to a court order, or when
                required by law to do so. We may also share information with
                companies assisting in fraud protection or investigation. We do
                not provide information to these agencies or companies for
                marketing or commercial purposes.
            </p>{' '}
              <br />
              <p>
                <b> BloomKonnect Email and Other Communications </b>
              </p>
              <br />
              <p>
                {' '}
                When you provide us your email address, we may send you emails
                necessary to process your order or to respond to a request. For
                example, after you place an order at BloomKonnect.com, you will
                receive an email confirmation and, in most cases, an email with
                package tracking information.
            </p>{' '}
              <br />
              <p>
                {' '}
                Additionally, if you have purchased from BloomKonnect or
                subscribed to one of our newsletters or otherwise have chosen to
                receive communications from us, we may occasionally update you on
                special opportunities via email or other methods.
            </p>
              <br />
              <p>
                {' '}
                You can choose to be removed from our mailing lists at any time by
                managing your subscription account at the following link: Manage
                Newsletter Subscription Account. You can also unsubscribe by using
                the link provided in each of our emails. As we only wish to send
                email to our opt-in customers and do not intentionally spam,
                please be certain that you have sent your unsubscribe request from
                the address you wish to be removed. If you have another email
                address you would like removed, please send another email from
                that address. Because we plan our mailings in advance, it may take
                several weeks for your request to become effective. If, due to
                human error, you continue to receive our communications, please
                contact us again and we will make every effort to correct the
                situation.
            </p>
              <br />
              <p>
                {' '}
                If you received an email from another company mentioning
                BloomKonnect and want to unsubscribe, please follow their
                unsubscribe procedures. If you have any questions or comments,
                please contact our Customer Care Center at info@bloomkonnect.com
                or at 1-800-BloomKonnect. You also may contact us at the address
                below.
            </p>{' '}
              <br />
              <p>
                {' '}
                We may also contact you if you have entered one of our contests or
                sweepstakes. If you choose not to receive updates when you enter a
                contest or sweepstakes, your chances of winning will not be
                affected.
            </p>{' '}
              <br />
              <p>
                {' '}
                <b> Cookies and Pixel Tags </b>
              </p>{' '}
              <br />
              <p>
                {' '}
                A cookie is a small data file that is stored by your web browser
                on your computer. Cookies enable you to place an order on our
                website. They also allow us to enhance and personalize your online
                shopping experience so that the information you receive is more
                relevant to you.
            </p>{' '}
              <br />
              <p>
                {' '}
                <b> For example, we use cookies to: </b>
              </p>{' '}
              <br />
              <ul>
                <li> Remember what items are in your shopping basket</li>
                <li> Recognize you when you return to our website</li>
                <li>
                   Enable you to use stored information, if you have created an
                  account
              </li>
                <li>
                   Study how our customers navigate through our website and which
                  products they request in site searches
              </li>
              </ul>{' '}
              <br />
              <p>
                If you have set your browser to refuse cookies, please call us at
                1-800-BloomKonnect if you wish to place an order.
            </p>{' '}
              <br />
              <p>
                {' '}
                We also use pixel tags – tiny graphic images – to tell us what
                parts of our website you have visited, or to measure the
                effectiveness of any searches you may do on our site. Pixel tags
                may also enable us to send you email in a format you can read.
                They also let us know when you have opened an email message from
                us.
            </p>{' '}
              <br />
              <p>
                {' '}
                We may contract with other companies who use cookies or other
                online tools such as pixel tags to measure the performance of a
                marketing effort on our behalf. We prohibit these companies from
                using this information for their own marketing purposes or from
                sharing this information with anyone other than BloomKonnect.
            </p>{' '}
              <br />
              <p>
                {' '}
                <b> Links to Other Sites </b>
              </p>{' '}
              <br />
              <p>
                {' '}
                Occasionally we provide links on our website to other sites we
                think you will enjoy. These sites operate independently of
                BloomKonnect and have established their own privacy and security
                policies. We have no control over other sites or their content and
                cannot guarantee, represent, or warrant that the content of these
                sites is accurate, legal and/or inoffensive. We do not endorse the
                content of other sites, and cannot warrant that these sites do not
                contain viruses or other features that may adversely affect your
                computer. For the best online experience, we strongly encourage
                you to review the policies at any site you visit.
            </p>{' '}
              <br />
              <p>
                {' '}
                <b> Feedback </b>
              </p>{' '}
              <br />
              <p>
                {' '}
                We welcome all comments, feedback, information, or materials
                ("feedback"), which you submit to us through or in conjunction
                with our site. Please note that feedback shall be considered
                non-confidential and become the property of BloomKonnect. By
                submitting feedback to us, you agree to a no-charge assignment to
                us of all rights, title, and interest in copyrights and other
                intellectual property rights on a worldwide basis to your
                feedback. We shall be free to use your feedback on an unrestricted
                basis.
            </p>{' '}
              <br />
              <p>
                {' '}
                <b> Updating or Reviewing Your Information </b>
              </p>{' '}
              <br />
              <p>
                {' '}
                To update your customer information (name, address, telephone
                number, and email address), please visit the My Account area of
                this site. To protect your privacy, we will need to validate your
                identity (log in) before you can update or review your
                information.
            </p>{' '}
              <br /> <b> Privacy of Children on Our website </b> <br />
              <p>
                {' '}
                Our website is not intended for use by children under the age of
                13, and we do not knowingly collect personal information from
                children under the age of 13. In addition, we do not knowingly
                solicit data from children, nor do we knowingly market to
                children. BloomKonnect requires that children under the age of 18
                use our service only in conjunction with their parents or
                guardians.
          </p>{' '}
              <br />
              <p>
                {' '}
                <b> Policy Changes </b>
              </p>{' '}
              <br />
              <p>
                {' '}
                From time to time, we may use customer information for
                unanticipated uses not previously disclosed in our privacy notice.
                If our information practices change, we will post these changes on
                our website. We encourage you to review our privacy policy
                periodically.
            </p>{' '}
              <br />
              <p>
                <b> Questions or Comments? </b>
              </p>
              <br />
              <p>
                {' '}
                If you have any comments or questions, please do not hesitate to
                contact us at info@BloomKonnect.com or at 1-800-BloomKonnect, or
                write us at:
            </p>{' '}
              <br />
              <p>BloomKonnect.com, LTD</p>
              <p>305 Harvard Street</p>
              <p>Brookline, MA 02446</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrivacyPolicyContainer;
