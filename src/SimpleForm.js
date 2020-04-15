import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import Review from './Review';

class SimpleForm extends Component {
    render() {
      return (
        <ChatBot toggleFloating='true'
        headerComponent={this.state.floating && (
         <div className="rsc-data">
           <div ></div>
            <h4>Covid 19</h4>
           <a style={{marginRight:'13px'}} onClick={() => this.hideChat()}>X</a>
           </div>
        )}
         handleEnd='true'
          steps={[
            {
              id: '1',
              message: 'What is your name?',
              trigger: 'name',
            },
            {
              id: 'name',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Hi {previousValue}! What is your gender?',
              trigger: 'gender',
            },
            {
              id: 'gender',
              options: [
                { value: 'male', label: 'Male', trigger: '5' },
                { value: 'female', label: 'Female', trigger: '5' },
              ],
            },
            {
              id: '5',
              message: 'How old are you?',
              trigger: 'age',
            },
            {
              id: 'age',
              user: true,
              trigger: 'a',
              validator: (value) => {
                if (isNaN(value)) {
                  return 'value must be a number';
                } else if (value < 0) {
                  return 'value must be positive';
                } else if (value > 120) {
                  return `${value}? Come on!`;
                }
  
                return true;
              },
            },
            {
              id: 'a',
              message: 'Mobile Number',
              trigger: 'mobileNumber',
            },
            {
              id: 'mobileNumber',
              user: true,
              trigger: 'b',
            },
            {
              id: 'b',
              message: 'Zip Code',
              trigger: 'zipCode',
            },
            {
              id: 'zipCode',
              user: true,
              trigger: 'c',
            },
            {
              id: 'c',
              message: 'Have you travelled Intenrationally in last 14 Days?',
              trigger: 'travel',
            },
            {
              id: 'travel',
              options: [
                { value: 'Yes', label: 'Yes', trigger: 'd' },
                { value: 'No', label: 'No', trigger: 'd' },
              ],
            },
            {
              id: 'd',
              message: 'Have you come in contact with any COVID-19 positive patient?',
              trigger: 'covid',
            },
            {
              id: 'covid',
              options: [
                { value: 'Yes', label: 'Yes', trigger: 'e' },
                { value: 'No', label: 'No', trigger: 'e' },
                { value: 'Not Sure', label: 'Not Sure', trigger: 'e' },
              ],
            },
            {
              id: 'e',
              message: 'Are you a Doctor Nurse or Hospital staff?',
              trigger: 'staff',
            },
            {
              id: 'staff',
              options: [
                { value: 'Yes', label: 'Yes', trigger: 'f' },
                { value: 'No', label: 'No', trigger: 'f' },
              ],
            },
            {
              id: 'f',
              message: 'Are you currently Hospitalized?',
              trigger: 'hospitalized',
            },
            {
              id: 'hospitalized',
              options: [
                { value: 'Yes', label: 'Yes', trigger: 'g' },
                { value: 'No', label: 'No', trigger: 'g' },
              ],
            },
            {
              id: 'g',
              message: 'Are you experiencing any of the following?',
              trigger: 'exp',
            },
            {
              id: 'exp',
              options: [
                { value: 'Cough', label: 'Cough', trigger: '7' },
                { value: 'Fever', label: 'Fever', trigger: '7' },
                { value: 'Difficulty Breathing', label: 'Difficulty Breathing', trigger: '7' },
                { value: 'None of these', label: 'None of these', trigger: '7' },
              ],
              trigger: '7',
            },

            {
              id: '7',
              message: 'Great! Check out your summary',
              trigger: 'review',
            },
            {
              id: 'review',
              component: <Review />,
              asMessage: true,
              trigger: 'end-message',
            },
            {
              id: 'end-message',
              message: 'Thanks! Your data was submitted successfully!',
              end: true,
            },
          ]}
        />
      );
    }
  }
  
  export default SimpleForm;