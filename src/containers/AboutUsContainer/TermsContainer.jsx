import React from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

class TermsContainer extends React.Component {
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
          name: 'TERM & CONDITIONS',
        },
      ],
    };
  }
  componentDidMount() {
    document.title = 'Terms & Conditions';
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <BreadCrumbs
          list={this.state.breadCrumbsList} />
        <div className="container container-main">
          <div className="em-inner-main">
            <div className="em-main-container em-col1-layout">
              <div className="row">
                <div className="em-col-main col-sm-24">
                  <div className="page-title">
                    <h1>Terms and Conditions</h1>
                  </div>
                  <div className="std">
                    <p>Welcome to BloomKonnect.com. These Terms of Use govern the use of the websites provided by
                      BloomKonnect with a homepage located at http://www.BloomKonnect.com&nbsp;("Site"). Sale items,
                      prices and special offers shown on the Site are only available through the Site and do not
                      necessarily represent sales items, prices or special offers available in any BloomKonnect retail
                      store, for cash and carry or for in-store delivery. YOUR ACCESS TO, OR USE OF, THIS SITE SIGNIFIES
                      THAT YOU AGREE TO BE BOUND BY THESE TERMS OF USE AND BloomKonnect’s PRIVACY POLICY. IF YOU DO NOT
                      AGREE TO BE BOUND BY THESE TERMS OF USE AND AGREE TO THE PRIVACY POLICY, YOU SHOULD IMMEDIATELY
                    CEASE USE OF THE SITE, THE SERVICES, THE MATERIALS, THE SOFTWARE, AND THE HARDWARE.</p>
                    <p><strong>Terms and Conditions of Use</strong></p>
                    <p>The following rules ("Terms and Conditions") govern the use of the Web site located at URL
                      www.BloomKonnect.com and the services offered on the site, Track/Modify an Order, Affiliate Programs,
                      rporate Account, and the ability to order products and receive newsletters and promotional emails, and
                      links (collectively, our "Site"). Please read the following Terms and Conditions carefully.
                    <br /><br />By using our Site, you understand and agree to be legally bound by these Terms and Conditions
                        and to follow these Terms and Conditions and all applicable laws and regulations governing our Site.
                        The Terms and Conditions shall supersede any terms or conditions included with any purchase order,
                        whether or not such terms or conditions are signed by BloomKonnect, BloomKonnect LLC ("BloomKonnect," “
                        BloomKonnect”, "we" or "us"). We reserve the right to change these Terms and Conditions at any time,
                    effective immediately upon posting on our Site.</p><p><strong>Copyrights and Trademarks of
                    BloomKonnect</strong>&nbsp;</p>
                    <p>Our Site is owned and operated by us. Unless otherwise specified,
                      all materials appearing on our Site, including the text, site design, graphics, logos, icons and
                      images, as well as the selection, assembly and arrangement thereof, are the sole property of
                      BloomKonnect. All audio and video clips are the sole property of BloomKonnect or our respective
                      content providers. The content and software on our Site is the property of BloomKonnect and/or its
                      suppliers and is protected by U.S. and international copyright laws. You may view, download, print
                      and retain a copy of pages of our Site only for your own personal use. Except as expressly provided
                      above, you may not use, download, upload, copy, print, display, perform, reproduce, republish,
                      license, post, transmit or distribute any information from our Site in whole or in part without our
                      prior written permission. If you wish to obtain permission to reprint or reproduce any materials
                      appearing on our Site you may contact us at&nbsp;info@BloomKonnectExpress.com. All rights not
                    expressly granted herein are reserved.</p>
                    <p>We post legal notices and various credits on pages of
                      our Site. If you duplicate, publish or otherwise distribute material on our Site, you may not remove
                    his notice or these credits or any additional information accompanying the notices and credits.</p>
                    <p>The following is a list of registered trademarks, trademarks, trade names and service marks owned by
                    BloomKonnect:</p>
                    <p>BLOOMKONNECT ®&nbsp;<br /><br />The absence of a trademark, trade name and service mark
                      from the above list does not constitute a waiver of our intellectual property rights concerning that
                      trademark, trade name or service mark. All custom graphics, icons, logos and service names are trade
                      names, trademarks or service marks of BloomKonnect. All other trade names, trademarks or service marks
                      are property of their respective owners. The use of any BloomKonnect trade name, trademark or service
                      mark without our express written consent is strictly prohibited. In order to maintain the value of
                      these marks, it is important that they are used correctly. If you have any questions, you may contact
                    us at&nbsp;info@BloomKonnect.com.</p>
                    <p><strong>Ownership and Use of Marks</strong>&nbsp;</p>
                    <p>Except as otherwise permitted in these Terms of Use, you may not use, modify, or delete any copyright,
                      trademark, service mark, logo, proprietary notice, or other intellectual property that is found on the
                      Site, or is affixed to, or placed on, any BloomKonnect Materials. You agree that all copyrights,
                      trademarks, service marks, logos, proprietary notices, and other intellectual property found on the
                      Site, or affixed to, or placed on, any BloomKonnect Materials are the sole and exclusive property of
                    BloomKonnect or its licensors.&nbsp;</p>
                    <p>Notwithstanding anything to the contrary in these Terms of Use, you agree that your permitted access
                      to, and use of, the Site, and the Materials do not grant to you any right, title, or interest in or to
                      the design or layout of this Site. Elements of this Site are protected by trade dress and other laws and
                    may not be copied or imitated in whole or in part.</p><p><strong>Accounts</strong>&nbsp;
                    <br />You agree that you will not misuse or abuse account access and passwords. You agree that you will
                    use only your password and that you will take all reasonable precautions to protect its secrecy.</p>
                    <p><strong>Typographical Errors</strong>&nbsp;<br />In the event a product (including, but not limited to,
                      flowers, plants and floral arrangements) is listed at an incorrect price or with incorrect information
                      due to typographical error or error in pricing or product information received from our suppliers, we
                      shall have the right to refuse or cancel any orders placed for products listed at the incorrect price.
                      We shall have the right to refuse or cancel any such orders whether or not the order has been confirmed
                      and your credit card charged. If your credit card has already been charged for the purchase and your order
                      is cancelled, we shall immediately issue a credit to your credit card account in the amount of the charge.
                  </p><p><strong>Links and Search Results</strong>&nbsp;<br />Our Site may link to other sites. We have no
                        control over other sites or their content and cannot guarantee, represent or warrant that the content of
                        these sites is accurate, legal and/or inoffensive. We do not endorse the content of other sites, and cannot
                        warrant that these sites do not contain viruses or other features that may adversely affect your computer.
                        By using our Site to search for or link to another site, you agree and understand that you may not make any
                        claim against us for any damages or losses resulting from your use of our Site to obtain search results
                        and/or to link to another site. However, if you have a problem with a link from our Site, please notify us
                    at&nbsp;info@BloomKonnectExpress.com. We will investigate the link and take appropriate action.</p>
                    <p><strong>Violation of the Terms and Conditions</strong>&nbsp;<br />By using our Site, you understand and agree
                      that we, at our sole discretion and without prior notice, may terminate your access to our Site and to any
                      services offered on our Site, and may remove any User Content you have provided if we believe that the User
                      Content violates or is inconsistent with these Terms and Conditions or their intent, that your conduct is
                    disruptive, or you have violated the law or the rights of BloomKonnect or another user.</p>
                    <p><strong>Compliance With Laws</strong>&nbsp;<br />You agree to comply with all applicable laws, statutes,
                      ordinances and regulations regarding your use of our Site and your purchase of products or services through
                      our Site. We may, in our sole discretion, report actual or perceived violations of law to law enforcement or
                      appropriate authorities. If we become aware, through a complaint or otherwise, of any potential or suspected
                      violation of these Terms and Conditions or of our&nbsp;privacy policy&nbsp;("Privacy Policy"), we may (but are
                      not obligated to) conduct an investigation to determine the nature and extent of the suspected violation and
                      the appropriate enforcement action, during which investigation we may suspend services to any customer being
                      investigated and/or remove any material from our servers. You agree to cooperate fully with any such
                      investigation. You acknowledge that violations of the Terms and Conditions or the privacy policy&nbsp;could
                    be subject to criminal or civil penalties.</p>
                    <p><strong>Export</strong>&nbsp;<br />The United States export control laws regulate the export and re-export of
                      technology originating in the United States. This includes the electronic transmission of information and software
                    to foreign countries and to certain foreign nationals. You agree to abide by these laws and their regulations.</p>
                    <p><strong>Privacy</strong>&nbsp;<br />We respect and make efforts to protect the privacy of all users of our Site.
                      Our current&nbsp;privacy policy&nbsp;is available online and is incorporated herein by reference and made a part
                    of the Terms and Conditions.</p>
                    <p><strong>Feedback</strong>&nbsp;<br />We welcome all comments, feedback, information, or materials ("Feedback"),
                      which you submit to us through or in conjunction with our Site. Please note that Feedback shall be considered
                      non-confidential and become the property of BloomKonnect. By submitting Feedback to us, you agree to a no charge
                      assignment to us of all right, title and interest in copyrights and other intellectual property rights on a
                    worldwide basis to the Feedback. We shall be free to use Feedback on an unrestricted basis.</p>
                    <p><strong>Restrictions</strong>&nbsp;<br />You must be 18 years or older and have a valid credit card, with full
                      authority to use it, to submit an order through this Site. You agree not to use this Site or any content
                    contained in it for any illegal or inappropriate activities.</p><p><strong>Disclaimer and Limitation of
                      Liability as to Our Site</strong>&nbsp;<br />WHILE WE ENDEAVOR TO PROVIDE THE MOST ACCURATE, UP-TO-DATE
                      INFORMATION AVAILABLE, THE DIRECTORIES AND INFORMATION IN OUR SITE MAY BE OUT OF DATE OR INCLUDE OMISSIONS,
                      INACCURACIES OR OTHER ERRORS. OUR SITE AND THE MATERIALS THEREIN ARE PROVIDED "AS IS" AND "AS AVAILABLE."
                      WE DO NOT PROMISE THAT OUR SITE OR ANY SERVICES OFFERED ON OUR SITE, WILL BE ERROR-FREE OR UNINTERRUPTED,
                      OR THAT THE USE OF OUR SITE OR ANY CONTENT, SEARCH OR LINK ON IT WILL PROVIDE ANY SPECIFIC RESULTS. WE MAKE
                      NO REPRESENTATIONS OR WARRANTIES, EITHER EXPRESS OR IMPLIED, OF ANY KIND WITH RESPECT TO OUR SITE, ITS
                      OPERATIONS, CONTENTS, INFORMATION OR MATERIALS. WE EXPRESSLY DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
                      OF ANY KIND WITH RESPECT TO OUR SITE OR ITS USE, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY AND FITNESS
                      FOR A PARTICULAR PURPOSE.</p>
                    <p>YOU AGREE THAT BLOOMKONNECT, ITS DIRECTORS, OFFICERS, EMPLOYEES OR OTHER REPRESENTATIVES SHALL NOT BE
                      LIABLE FOR DAMAGES ARISING FROM THE OPERATION, CONTENT OR USE OF OUR SITE. YOU AGREE THAT THIS LIMITATION
                      OF LIABILITY IS COMPREHENSIVE AND APPLIES TO ALL DAMAGES OF ANY KIND, INCLUDING WITHOUT LIMITATION DIRECT,
                      INDIRECT, COMPENSATORY, SPECIAL, INCIDENTAL, PUNITIVE AND CONSEQUENTIAL DAMAGES, DAMAGES FOR LOSS OF PROFITS,
                      REVENUE, DATA AND USE, INCURRED BY YOU OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT OR TORT, ARISING
                      FROM YOUR ACCESS TO, AND USE OF, OUR SITE OR ANY OTHER HYPER-LINKED WEB SITE.</p>
                    <p><strong>Applicable Law</strong>&nbsp;<br />You agree that any legal action brought against us shall be governed
                      by the laws of Massachusetts, without regard to conflict of law principles. You agree that the sole
                      jurisdiction and venue for any litigation arising from your use of or orders made on our Site shall be an
                      appropriate federal or state court located in Massachusetts. We make no representations that the content in
                      our Site is appropriate for access outside the United States. Those who choose to access our Site from outside
                      the United States do so on their own initiative and are responsible for compliance with local laws. If any
                      provision within the Terms and Conditions is held to be invalid or unenforceable, such provision shall be
                      struck and all remaining provisions shall be enforced.</p>
                    <p><strong>Indemnity</strong>&nbsp;<br />By using our Site, you agree to indemnify and hold BloomKonnect, its
                      subsidiaries, affiliates, officers, agents and other partners and employees, harmless from any loss, liability,
                      claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your
                      use of our Site, including providing a link to another site or uploading any content to our Site.</p>
                    <p><strong>Miscellaneous&nbsp;</strong><br />All rights not expressly granted are reserved to BloomKonnect.
                      The headings used in these Terms of Use and the&nbsp;privacy policy&nbsp;are intended for
                      convenience only, and shall not affect the construction and interpretation hereof or thereof.
                      A party's failure to insist upon or enforce strict performance of any provision of the Terms of
                      Use or the&nbsp;privacy policy&nbsp;shall not be construed as a waiver of such or any future
                      provision or right. If any provision of these Terms of Use or the&nbsp;privacy policy&nbsp;is
                      held to be invalid or unenforceable, such determination shall not affect such provision in any
                      other respect or any other provision of these Terms of Use or the privacy policy&nbsp;, which
                      shall remain in full force and effect. These Terms of Use and the&nbsp;privacy policy&nbsp;
                      constitute the entire agreement and understanding between the parties with respect to the subject
                      matter contained herein and therein and supersedes and replaces any and all prior written or oral
                      agreements related to the subject matter hereof. You may not publicly use BloomKonnect’s name,
                      trademarks, service marks, logos, images, or any other intellectual property owned or used by
                      BloomKonnect without the prior written consent of BloomKonnect.</p>
                    <p><strong>How to Contact Us</strong>&nbsp;<br />If you have any comments or questions, please do not
                      hesitate to&nbsp;contact us&nbsp;at info@BloomKonnect.com&nbsp;or at 1-877-893-9984, or write us
                      at:</p>
                    <p>BloomKonnect.com
                      <br />305 Harvard Street
                      <br />Brookline, MA 02446</p>
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
export default TermsContainer;
