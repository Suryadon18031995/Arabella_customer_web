import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Review = (props)  => {
  const [state, setState] = useState({ name: '', gender: '', age: '',mobileNumber:'',zipCode:'', travel:'', covid:'', staff:'', hospitalized:'',
  exp:''});
  
  useEffect(() => {
    const { steps } = props;
    const { name, gender, age , mobileNumber , zipCode, travel, covid, staff, hospitalized, exp } = steps;
    setState({ name, gender, age, mobileNumber, zipCode, travel, covid, staff, hospitalized, exp  });
  }, [props])

    const { name, gender, age, mobileNumber, zipCode, travel, covid, staff, hospitalized, exp } = state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td>{mobileNumber.value}</td>
            </tr>
            <tr>
              <td>Zip Code</td>
              <td>{zipCode.value}</td>
            </tr>
            <tr>
              <td>Have you travelled Intenrationally in last 14 Days</td>
              <td>{travel.value}</td>
            </tr>
            <tr>
              <td>Have you come in contact with any COVID-19 positive patient?</td>
              <td>{covid.value}</td>
            </tr>
            <tr>
              <td>Are you a Doctor Nurse or Hospital staff?</td>
              <td>{staff.value}</td>
            </tr>
            <tr>
              <td>Are you currently Hospitalized?</td>
              <td>{hospitalized.value}</td>
            </tr>
            <tr>
              <td>Are you experiencing any of the following?</td>
              <td>{exp.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

export default Review;