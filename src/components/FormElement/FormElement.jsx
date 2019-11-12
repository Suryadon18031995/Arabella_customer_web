import React from 'react';
import Datetime from 'react-datetime';
import Label from 'react-bootstrap/lib/Label';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import _get from 'lodash/get';
import _set from 'lodash/set';


const errorStyle = {
  border: '1px solid red',
};

const elementData = {};


export default class FormElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      hasError: false,
    };
    this.isRequired = this.props.config.isRequired;
    this.onClick = this.props.onClick.bind(this);
  }

  clearValue() {
    this.setState({
      value: '',
      hasError: false,
    });
  }

  getValue() {
    return this.state.value;
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //     this.setState({ value: ''});
  // }

  hasError() {
    let errors = this.state.hasError;
    if (this.isRequired && !this.state.value) {
      errors = true;
    }
    this.setState({ hasError: errors });
    return errors;
  }

  hasErrors(value) {
    if (this.isRequired && !value) {
      return true;
    }
    if (this.props.config.pattern) {
      const re = new RegExp(this.props.config.pattern);
      return value.match(re) == null;
    }
    return false;
  }

  onValueChanged(event) {
    const value = event.target.value;
    const key = event.target.getAttribute('data-key');
    const name = event.target.getAttribute('name');


    this.setState({
      value,
      hasError: this.hasErrors(value),
    });
    const elVal = _get(this.props.newObject, key);

    if (Array.isArray(elVal)) {
      this.props.newObject.key.push({ value });

      return;
    }
    _set(this.props.newObject, key, { value });
  }

  onDateValueChanged(date) {
    const dateValue = moment(date).format('YYYY-MM-DD');
    this.setState({
      value: dateValue,
      hasError: this.hasErrors(dateValue),
    });
    // this.props.onClick && this.props.onClick(dateValue);
  }

  onDateTimeValueChanged(date) {
    const dateTime = moment(date).format('YYYY-MM-DD hh:mm:ss');
    this.setState({
      value: dateTime,
      hasError: this.hasErrors(dateTime),
    });
    // this.props.onClick && this.props.onClick(dateTime);
  }

  isMandatory(val) {
    return (
            <span>{ val == 1 ? '*' : '' }</span>
    );
  }

  displayTitle(title, field) {
    return (
            <label className="control-label" htmlFor={field}>{title || field}</label>
    );
  }

  render() {
    const configuration = this.props.config;

    const isRequired = _get(configuration, 'validations.isRequired');

    const elementType = (configuration && configuration.uiComponentType) ? configuration.uiComponentType : 'not';
    const err = this.state.hasError;

    switch (elementType) {
      case 'number':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(configuration.validations.isRequired)}
                        <input type="number" className="form-control" name={configuration.field} value={this.state.value}
                               onChange={this.onValueChanged.bind(this)}
                               placeholder={configuration.value}
                        />
                    </div>
        );
      case 'email':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(configuration.validations.isRequired)}
                        <input type="email" className="form-control" name={configuration.field} value={this.state.value}
                               onChange={this.onValueChanged.bind(this)}
                               placeholder={configuration.value}
                        />
                    </div>
        );
      case 'password':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(configuration.validations.isRequired)}
                        <input type="password" className="form-control" name={configuration.field} value={this.state.value}
                               onChange={this.onValueChanged.bind(this)}
                               placeholder={configuration.value}
                        />
                    </div>
        );
      case 'checkbox':
        return (
                    <div className="checkbox" style={err ? errorStyle : {}}>
                        <label className="control-label"><input type="checkbox" name={configuration.field}
                                                                onChange={this.onValueChanged.bind(this)}
                                                                value={this.state.value}

                        />{configuration.displayName}</label>{this.isMandatory(configuration.validations.isRequired)}
                    </div>
        );
      case 'textarea':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(configuration.validations.isRequired)}
                        <textarea className="form-control" name={configuration.field} value={this.state.value}
                                data-key={this.props.groupName}
                                  onChange={this.onValueChanged.bind(this)}
                                  placeholder={configuration.value}
                        />
                    </div>
        );
      case 'datetime':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(configuration.validations.isRequired)}
                        <Datetime name={configuration.field} value={this.state.value}
                                  onChange={this.onDateTimeValueChanged.bind(this)}
                                  dateFormat="YYYY-MM-DD"
                                  timeFormat="hh:mm:ss"
                                  closeOnSelect={true}
                        />
                    </div>
        );
      case 'date':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(configuration.validations.isRequired)}
                        <Datetime name={configuration.field} value={this.state.value}
                                  onChange={this.onDateValueChanged.bind(this)}
                                  dateFormat="YYYY-MM-DD"
                                  timeFormat={false}
                                  closeOnSelect={true}
                        />
                    </div>
        );
      case 'select':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(configuration.validations.isRequired)}
                        <select className="form-control selectpicker" name={configuration.field} value={this.state.value}
                                data-key={this.props.groupName}
                                onChange={this.onValueChanged.bind(this)}
                        >
                            <option value="" disabled>Select...</option>
                            {configuration.defaultValues.map(opt => <option key={opt.name} value={opt.name}>{opt.title}</option>)}
                        </select>
                    </div>
        );
      case 'dropdown':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(isRequired)}
                        <select className="form-control selectpicker" name={configuration.field} value={this.state.value}
                                data-key={this.props.groupName}
                                onChange={this.onValueChanged.bind(this)}
                        >
                            <option value="" disabled>Select...</option>
                            {/* {configuration.data.map((opt) => { */}
                            {configuration.defaultValues.map((opt) => {
                                { /* return <option key={opt.name} value={opt.name}>{opt.title}</option> */ }
                                return <option key={opt.key} value={opt.key}>{opt.value}</option>;
                            })}
                        </select>
                    </div>
        );
      case 'textbox':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayName, configuration.field)}
                        {this.isMandatory(configuration.validations.isRequired)}
                        <input type="text" className="form-control" name={configuration.field} value={this.state.value} data-key={this.props.groupName}
                               onChange={this.onValueChanged.bind(this)}
                               placeholder={configuration.value}
                               required={configuration.validations.isRequired}
                        />
                    </div>
        );

      case 'label':
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        <h3>
                            <Label bsStyle="success">
                                {this.displayTitle(configuration.value, configuration.field)}
                            </Label>
                        </h3>

                    </div>
        );
      default:
        return (
                    <div className={`form-group ${err ? 'has-error' : ''}`}>
                        {this.displayTitle(configuration.displayText, configuration.field)}
                        {/* <span>{configuration.validations.isRequired == 1 ? '*' : ''}</span> */}
                        <input type="text" className="form-control" name={configuration.field} value={this.state.value} data-key={this.props.groupName}
                               onChange={this.onValueChanged.bind(this)}
                               placeholder={configuration.value}
                               required={configuration.validations.isRequired}
                        />
                    </div>
        );
    }
  }
}
