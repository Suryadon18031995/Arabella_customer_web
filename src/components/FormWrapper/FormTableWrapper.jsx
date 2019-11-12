import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import FormElement from '../FormElement/FormElement.jsx';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { replaceFieldBySeparator } from '../../helpers/commonUtil';


// pass in props of box with field config and return a sub form box
function FormTableBox(props = {
  baseKeyName: '', baseKey: '', boxHeading: '', tableHeaderKeys: [], boxKeys: [], htmlElements: {}, newObject: {}, submitHandler() {},
}) {
  const rowData = _get(props, `htmlElements.${props.baseKey}`, []);
  const baseKeyWithoutField = `${props.baseKeyName}.${replaceFieldBySeparator({ value: props.baseKey })}`;


  return (
        <div className="col-xs-12 jumbotron" >
        <h3>{props.boxHeading}</h3>
        <hr/>
        <div id="listView">
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        {
                            props.tableHeaderKeys.map((val) => {
                                const displayText = _get(props, `htmlElements.${val}.displayText`);
                                const el = (<th>{displayText}</th>);
                                return el;
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rowData.map(val => (
                                <tr>
                                    {
                                    props.boxKeys.map((boxKey) => {
                                        const columnVal = val[boxKey];
                                        return (<td>
                                            <FormElement
                                                config={columnVal}
                                                groupName={`${baseKeyWithoutField}.${boxKey}`}
                                                onClick={event => props.submitHandler(index1, index1)}
                                                newObject={props.newObject}
                                            />
                                        </td>);
                                        })

                                    }
                                </tr>
                            ))
                    }

                </tbody>
            </Table>
        </div>

        </div>
  );
}

export default class FormTableWrapper extends React.Component {
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

    makeHeaderObject(orderedObject = []) {
      return orderedObject.find(data => (data.isData == 0));
    }

    makeBodyObject(orderedObject = []) {
      return orderedObject.find(data => (data.isData == 1));
    }
    render() {
      if (this.state.redirect) {
        return <Redirect push to="/detailPage" />;
      }
      const newObject = {
        [this.props.baseKeyName]: {},
      };


      const htmlElements = this.props.HTMLFields || [];
      const orderedFields = htmlElements.fieldsOrder || [];

      if (!htmlElements.fields) {
        return (
                <div> No fields </div>
        );
      }


      // onClick={(event) => this.handleSubmit(index1,index1)}
      const elementGrp = this.makeBodyObject(orderedFields);
      const fields = _get(elementGrp, 'order', []);
      const headerObject = this.makeHeaderObject(orderedFields);
      const baseKey = _get(elementGrp, 'baseArrayKey');
      const innerKeys = _get(elementGrp, 'order');

      // @to1do: do it via core javascript
      orderedFields.forEach((value) => {
        const fields = _get(value, 'order', []);
        const secondBaseName = _get(value, 'baseArrayKey', '');
        fields.forEach((val) => {
          const fieldKey = replaceFieldBySeparator({ value: secondBaseName, separator: '.' });
          _set(newObject[this.props.baseKeyName], `${fieldKey}.${val}`, []);
        });
      });

      this.props.supplierRegisterRequestBody.fields = newObject;
      console.log(JSON.stringify(newObject));

      return (
            <div className="container-fluid" style={{
                margin: 0,
            }}>
                <form role="form" className="row">
                        {
                            <FormTableBox baseKey={baseKey} baseKeyName={this.props.baseKeyName} boxHeading={_get(headerObject, 'displayText')} tableHeaderKeys={_get(headerObject, 'order')} boxKeys={innerKeys} htmlElements={htmlElements} submitHandler={this.onClick} newObject = {newObject} />

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
