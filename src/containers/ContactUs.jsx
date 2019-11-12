import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Iframe from 'react-iframe';
import _get from 'lodash/get';
import { fetchContactData } from '../actions/contact';
import BreadCrumbs from '../components/Common/BreadCrumbs.jsx';
import Loader from '../components/Loader/Loader.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

class ContactUsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: _get(props.loginData[0], 'result.cust_name', ''),
            email: '',
            telephone: '',
            comment: '',
            sucessMessage: undefined,
            errors: {},
            showMsg: false,
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'CONTACT US',
                },
            ],
        };
    }

    componentDidMount() {
        document.title = 'Contact Us';
    }

    handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        // Name
        if (!this.state.name) {
            formIsValid = false;
            errors.name = 'This is a required field.';
        }

        if (this.state.name) {
            if (!this.state.name.match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors.name = 'Name is not valid';
            }
        }

        // //telephone
        // if (this.state.telephone) {
        //     if (!this.state.telephone.match(/^[0-9]+$/)) {
        //         formIsValid = false;
        //         errors.telephone = 'Telephone is not valid';
        //     }
        // }

        // Email
        if (!this.state.email) {
            formIsValid = false;
            errors.email = 'This is a required field.';
        }

        if (!this.state.comment) {
            formIsValid = false;
            errors.comment = 'This is a required field.';
        }

        if (this.state.email) {
            const lastAtPos = this.state.email.lastIndexOf('@');
            const lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 &&
                lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors.email = 'Please enter a valid email address. For example johndoe@domain.com.';
            }
        }

        this.setState({ errors });
        return formIsValid;
    }

    contactSubmit = () => {
        if (this.handleValidation()) {
            this.props.getContactData({
                name: this.state.name,
                email: this.state.email,
                telephone: _get(this.state, 'telephone', ''),
                comment: this.state.comment,
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!_isEmpty(_get(nextProps, 'contactData'))) {
            if (_get(nextProps.contactData, 'status') === 'success') {
                this.setState({
                    showMsg: true,
                    sucessMessage: _get(nextProps.contactData, 'message'),
                    name: _get(this.props.loginData[0], 'result.cust_name', ''),
                    email: '',
                    telephone: '',
                    comment: '',
                });
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    render() {
        if (_get(this.props, 'isLoading')) {
            return (
                <div className="container" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }
        return (
            <div>
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container ">
                    {this.state.showMsg ? <ul className='review-success contact-us-success'>
                        <li className='success-msg'>
                            <ul>
                                <li className='review-success-li'>
                                    <span>
                                        <span className='glyphicon glyphicon-ok icon-span' />
                                        {this.state.sucessMessage}
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul> : ''}
                    <div className="title"><h1>Contact Us</h1></div>
                    <div className="em-col-main col-sm-24">
                        <Iframe url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3132359.2178934165!2d-74.86845!3d39.94263!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c134b55414727f%3A0x55f5411d481d60aa!2s2+Pin+Oak+Ln+%23100%2C+Cherry+Hill%2C+NJ+08003%2C+USA!5e0!3m2!1sen!2sin!4v1541762207278"
                            height="450px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                            allowFullScreen />
                    </div>
                    <div className="em-col-main col-sm-24">
                        <div className="block form fieldset col-lg-6 col-xs-12 col-sm-7">
                            <h2 className="legend">Contact Information</h2>
                            <div>
                                <div className="fieldL">
                                    <label className="required"><em>*</em>Name</label>
                                    <div className="input-box">
                                        <input name="name"
                                            id="name" title="Name"
                                            className={this.state.errors && this.state.errors.name ? 'input-text required-entry validation-failed' : 'input-text required-entry'}
                                            type="text" onChange={this.handleChange} value={this.state.name} />
                                        {this.state.errors && this.state.errors.name && <span className='error-color'>{this.state.errors.name}</span>}
                                    </div>
                                </div>
                                <div className="fieldR">
                                    <label className="required"><em>*</em>Email</label>
                                    <div className="input-box">
                                        <input name="email"
                                            id="email" title="Email"
                                            className={this.state.errors && this.state.errors.email ? 'input-text required-entry validation-failed' : 'input-text required-entry'}
                                            type="text" onChange={this.handleChange} value={this.state.email} />
                                        {this.state.errors && this.state.errors.email && <span className='error-color'>{this.state.errors.email}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="fields">
                                <label >Telephone</label>
                                <div className="input-box">
                                    <input name="telephone"
                                        id="telephone" title="Telephone"
                                        className="input-text telephone"
                                        type="text"
                                        onChange={this.handleChange}
                                        value={this.state.telephone} />
                                </div>
                            </div>
                            <div className="fields">
                                <label className="required"><em>*</em>Comment</label>
                                <div className="input-box">
                                    <textarea name="comment"
                                        id="comment" title="Comment"
                                        className={this.state.errors && this.state.errors.comment ? 'input-text required-entry validation-failed' : 'input-text required-entry'}
                                        cols="5" rows="3"
                                        onChange={this.handleChange}
                                        value={this.state.comment} />
                                    {this.state.errors && this.state.errors.comment && <span className='error-color'>{this.state.errors.comment}</span>}
                                </div>
                            </div>
                            <div className="buttons-set fields">
                                <button type="submit" title="Submit" className="button" onClick={this.contactSubmit.bind(this)} >
                                    <span>
                                        <span>Submit</span>
                                    </span>
                                </button>
                                <p className="required">* Required Fields</p>
                            </div>

                        </div>

                        <div className="block col-sm-5">
                            <div className="em-maps-wrapper"></div>
                            <ul>
                                <li>
                                    <span className="fa fa-map-marker">&nbsp;Adress: 2 Pin Oak Lane, Suite 100, Cherry Hill, NJ 08003.</span>
                                </li>
                                <li>
                                    <span className="fa fa-phone">&nbsp;Phone: 877-356-6572</span>
                                </li>
                                <li>
                                    <span className="fa fa-envelope">&nbsp;Email: Help@bloomkonnect.com</span>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getContactData: data => dispatch(fetchContactData(data)),
});

const mapStateToProps = (state) => {
    const { contactReducer, loginReducer } = state;

    const {
        loginData,
        error: loginError,
    } = loginReducer || [];

    const {
        contactData,
        isFetching: isLoading,
        error: contactError,
    } = contactReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(contactError) || _isError(contactError);

    return {
        contactData,
        loginData,
        isLoading,
        error,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactUsContainer));

// export default ContactUsContainer;
