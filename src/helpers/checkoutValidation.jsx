import _get from 'lodash/get';

export function handleCheckOutValidation(field) {
    const errors = { formIsValid: true };

    if ((_get(field, 'firstname') === '') || (_get(field, 'firstname') === undefined)) {
        errors.formIsValid = false;
        errors.firstname = 'this is a required field';
    }

    if ((_get(field, 'lastname') === '') || (_get(field, 'lastname') === undefined)) {
        errors.formIsValid = false;
        errors.lastname = 'this is a required field';
    }

    if ((_get(field, 'company') === '') || (_get(field, 'company') === undefined)) {
        errors.formIsValid = false;
        errors.company = 'this is a required field';
    }

    if (((_get(field, 'Address1') === '') || (_get(field, 'Address1') === undefined))) {
        errors.formIsValid = false;
        errors.address1 = 'this is a required field';
    }

    if ((_get(field, 'Address2') === '') || (_get(field, 'Address2') === undefined)) {
        errors.formIsValid = false;
        errors.address2 = 'this is a required field';
    }

    if ((_get(field, 'zipcode') === '') || (_get(field, 'zipcode') === undefined)) {
        errors.formIsValid = false;
        errors.postcode = 'this is a required field';
    }

    if ((_get(field, 'city') === '') || (_get(field, 'city') === undefined)) {
        errors.formIsValid = false;
        errors.city = 'this is a required field';
    }

    if ((_get(field, 'region') === '') || (_get(field, 'region') === undefined)) {
        errors.formIsValid = false;
        errors.region = 'this is a required field';
    }

    if ((_get(field, 'telephone') === '') || (_get(field, 'telephone') === undefined)) {
        errors.formIsValid = false;
        errors.telephone = 'this is a required field';
    }

    if ((_get(field, 'countryId') === '') || (_get(field, 'countryId') === undefined)) {
        errors.formIsValid = false;
        errors.countryId = 'this is a required field';
    }

    // this.setState({ errors });
    return ({ ...errors });
}

export function handleEditCheckOutValidation(field) {
    const errors = { formIsValid: true };

    if ((_get(field, 'firstname') === '') || (_get(field, 'firstname') === undefined)) {
        errors.formIsValid = false;
        errors.firstname = 'this is a required field';
    }

    if ((_get(field, 'lastname') === '') || (_get(field, 'lastname') === undefined)) {
        errors.formIsValid = false;
        errors.lastname = 'this is a required field';
    }

    if ((_get(field, 'company') === '') || (_get(field, 'company') === undefined)) {
        errors.formIsValid = false;
        errors.company = 'this is a required field';
    }

    if (((_get(field, 'address_line1') === '') || (_get(field, 'address_line1') === undefined))) {
        errors.formIsValid = false;
        errors.address1 = 'this is a required field';
    }

    if ((_get(field, 'address_line2') === '') || (_get(field, 'address_line2') === undefined)) {
        errors.formIsValid = false;
        errors.address2 = 'this is a required field';
    }

    if ((_get(field, 'zipcode') === '') || (_get(field, 'zipcode') === undefined)) {
        errors.formIsValid = false;
        errors.postcode = 'this is a required field';
    }

    if ((_get(field, 'city') === '') || (_get(field, 'city') === undefined)) {
        errors.formIsValid = false;
        errors.city = 'this is a required field';
    }

    if ((_get(field, 'state') === '') || (_get(field, 'state') === undefined)) {
        errors.formIsValid = false;
        errors.region = 'this is a required field';
    }

    if ((_get(field, 'telephone') === '') || (_get(field, 'telephone') === undefined)) {
        errors.formIsValid = false;
        errors.telephone = 'this is a required field';
    }

    if ((_get(field, 'country_id') === '') || (_get(field, 'country_id') === undefined)) {
        errors.formIsValid = false;
        errors.countryId = 'this is a required field';
    }

    // this.setState({ errors });
    return ({ ...errors });
}

export function handleValidation(field) {
    const errors = { formIsValid: true };

    //  FirstName
    if (field.firstname === undefined) {
        errors.formIsValid = false;
        errors.firstname = 'This is a required field';
    }

    //  lastName
    if (field.lastname === undefined) {
        errors.formIsValid = false;
        errors.lastname = 'This is a required field';
    }

    //  address
    if (field.address_line1 === undefined) {
        errors.formIsValid = false;
        errors.address = 'This is a required field';
    }

    //  city
    if (field.city === undefined) {
        errors.formIsValid = false;
        errors.city = 'This is a required field';
    }

    //  state
    if (field.state === undefined) {
        errors.formIsValid = false;
        errors.state = 'This is a required field';
    }

    //  zipcode
    if (field.zipcode === undefined) {
        errors.formIsValid = false;
        errors.zipcode = 'This is a required field';
    }

    if (field.zipcode !== undefined) {
        if (field.zipcode.length < 5) {
            errors.formIsValid = false;
            errors.zipcode = 'Please lengthen this text to 5 characters or more';
        }
    }

    if (field.zipcode !== undefined) {
        const re = /^[0-9\b]+$/;
        if (re.test(field.zipcode)) {
            // formIsValid = true;
        } else {
            errors.formIsValid = false;
            errors.zipcode = 'Please Provide Numeric value';
        }
    }

    //  country
    if (field.country_name === undefined) {
        errors.formIsValid = false;
        errors.country = 'This is a required field';
    }

    //  phone
    if (field.telephone === undefined) {
        errors.formIsValid = false;
        errors.phone = 'This is a required field';
    }

    // //  creditnumber
    // if (field.creditnumber === undefined) {
    //     errors.formIsValid = false;
    //     errors.creditnumber = 'This is a required field';
    // }

    // if (field.creditnumber !== undefined) {
    //     if (field.creditnumber.length < 15) {
    //         errors.formIsValid = false;
    //       errors.creditnumber = 'Please provide valid number';
    //     }
    //   }

    // if (field.creditnumber !== undefined) {
    //     const re = /^[0-9*\b]+$/;
    //     if (re.test(field.creditnumber)) {
    //       // formIsValid = true;
    //     } else {
    //         errors.formIsValid = false;
    //       errors.creditnumber = 'Please Provide valid number';
    //     }
    //   }

    //  expirymonth
    // if (field.expirymonth === undefined) {
    //     errors.formIsValid = false;
    //     errors.expirymonth = 'This is a required field';
    // }

    // if (field.expirymonth !== undefined) {
    //     if (field.expirymonth.length < 2) {
    //         errors.formIsValid = false;
    //       errors.expirymonth = 'Please provide valid Month';
    //     }
    //   }

    // if (field.expirymonth !== undefined) {
    //     const re = /^[0-9\b]+$/;
    //     if (re.test(field.expirymonth)) {
    //       // formIsValid = true;
    //     } else {
    //         errors.formIsValid = false;
    //       errors.expirymonth = 'Please Provide valid Month';
    //     }
    //   }

    //  expiryyear
    // if (field.expiryyear === undefined) {
    //     errors.formIsValid = false;
    //     errors.expiryyear = 'This is a required field';
    // }

    // if (field.expiryyear !== undefined) {
    //     if (field.expiryyear.length < 4) {
    //         errors.formIsValid = false;
    //       errors.expiryyear = 'Please provide valid Year';
    //     }
    //   }

    // if (field.expiryyear !== undefined) {
    //     const re = /^[0-9\b]+$/;
    //     if (re.test(field.expiryyear)) {
    //       // formIsValid = true;
    //     } else {
    //         errors.formIsValid = false;
    //       errors.expiryyear = 'Please Provide valid Year';
    //     }
    //   }

    //  //  cvv
    //  if (field.cvv === undefined) {
    //     errors.formIsValid = false;
    //     errors.cvv = 'This is a required field';
    // }

    // if (field.cvv !== undefined) {
    //     if (field.cvv.length < 3) {
    //         errors.formIsValid = false;
    //       errors.cvv = 'Please provide valid CVV';
    //     }
    //   }

    // if (field.cvv !== undefined) {
    //     const re = /^[0-9\b]+$/;
    //     if (re.test(field.cvv)) {
    //       // formIsValid = true;
    //     } else {
    //         errors.formIsValid = false;
    //       errors.cvv = 'Please Provide valid CVV';
    //     }
    //   }

    return ({ ...errors });
}
