import React from 'react';
import FormElement from '../FormElement/FormElement.jsx';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { replaceFieldBySeparator } from '../../helpers/commonUtil';

// pass in props of box with field config and return a sub form box
function FormBox(props = {
  boxHeading: '', boxes: [], htmlElements: {}, newObject: {}, submitHandler() {},
}) {
  return (
        <div className="col-xs-12 jumbotron">
        <h3>{props.boxHeading}</h3>
        <hr/>
            {props.boxes.map((val) => {
                const fieldKey = replaceFieldBySeparator({ value: val, separator: '.' });
                const elementObject = _get(props.htmlElements, val);

                const elementGrpWithOutFirstKey = fieldKey;
                return (
                        <div className="col-md-4">
                                <FormElement
                                    config={elementObject}
                                    groupName={elementGrpWithOutFirstKey}
                                    onClick={event => props.submitHandler(index1, index1)}
                                    newObject={props.newObject}
                                />
                        </div>
                        );
                })
            }
        </div>
  );
}

export default class FormWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.HTMLFields = this.props.HTMLFields;
    // console.log("HTMLFields value:"+HTMLFields);
    this.items = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      redirect: false,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {

  }

  setData(data) {
    const items = this.items;
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const item = items[key];
        item.setValue(data[key]);
      }
    }
  }

  getData() {
    const items = this.items;
    const data = {};
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const item = items[key];
        if (item.hasError()) {
          // Form Automatically shows Error Items
          return false;
        }
        data[key] = item.getValue();
      }
    }
    return data;
  }

  clearForm() {
    const items = this.items;
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const item = items[key];
        item.clearValue();
      }
    }
  }

  createControls() {
    return (
            <div className="btn-group">
                <button type="button" className="btn btn-default" onClick={this.props.onSaveClicked}>
                    <span className="glyphicon glyphicon-floppy-saved"/>&nbsp;Save
                </button>
                <button type="button" className="btn btn-default" onClick={this.clearForm.bind(this)}>
                    <span className="glyphicon glyphicon-refresh"/>&nbsp;Clear
                </button>
                {this.props.controls}
            </div>
    );
  }
    handleSubmit = () => {
      this.props.supplierRegistrationAPI(this.props.supplierRegisterRequestBody);
    }
    render() {
      if (this.state.redirect) {
        return <Redirect push to="/detailPage" />;
      }
      const newObject = {};


      const htmlElements = this.props.HTMLFields || [];
      const orderedFields = htmlElements.fieldsOrder || [];

      if (!htmlElements.fields) {
        return (
                <div> No fields </div>
        );
      }

      // @to1do: do it via core javascript
      orderedFields.forEach((value) => {
        const fields = _get(value, 'order', []);
        fields.forEach((val) => {
          const fieldKey = replaceFieldBySeparator({ value: val, separator: '.' });
          _set(newObject, fieldKey, undefined);
        });
      });


      this.props.supplierRegisterRequestBody.fields = newObject;
      // console.log(JSON.stringify(newObject));

      // onClick={(event) => this.handleSubmit(index1,index1)}

      return (
            <div className="container-fluid" style={{
                margin: 0,
            }}>
                <form role="form" className="row">
                        {
                            orderedFields.map((elementGrp, index) => {
                                const fields = _get(elementGrp, 'order', []);


                                return <FormBox boxHeading={_get(elementGrp, 'displayText')} boxes={fields} htmlElements={htmlElements} submitHandler={this.onClick} newObject = {newObject} />;
                            })

                        }
                        <div className="row">
                        <button type="button" className="btn btn-success btn col-md-offset-4 col-md-4 col-xs-12" onClick={this.handleSubmit}>
                            <span className="glyphicon glyphicon-floppy-saved"/>&nbsp;Submit
                        </button>
                        </div>
                    </form>
                </div>

      );
    }
}
