import React from 'react';
import Button from 'material-ui/Button';
import _get from 'lodash/get';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import Slide from 'material-ui/transitions/Slide';
import Checkbox from 'material-ui/Checkbox';
import FormGroup from 'material-ui/Form/FormGroup';
import FormControlLabel from 'material-ui/Form/FormControlLabel';

export default class FormDialog extends React.Component {
//   state = {
//     open: this.props.open,
//   };


  handleSubmit = () => {
    this.props.onSubmit();
  }

  handleChange = (event) => {
    this.props.onInputChange(event.target.name, event.target.value);
  }

  handleCheckBox = (event, checked) => {
    const name = event.target.id;
    const value = Boolean(checked);
    this.props.onInputChange(name, value);
  }


  handleClose = () => {
    this.props.onCancel();
  };

  render() {
    const { index, containerState, open } = this.props;
    const data = { ...this.props.data } || {};

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          transition={Slide}
          className="supplier-dialog"
        >
          <DialogTitle id="form-dialog-title" className="dialog-title">Edit Tax Details</DialogTitle>
          <DialogContent>
            <div className="row d-flex">
              <div className="col-sm-4 form-d">
                <label className="control-label">Site Name</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  // label="Site Name"
                  type="text"
                  value={_get(data, 'siteName')}
                  disabled
                />
              </div>
              <div className="col-sm-4 form-d">
                <label className="control-label">Site Id</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  // label="Site Id"
                  type="text"
                  value={_get(data, 'siteId')}
                  disabled
                  />
              </div>
              <div className="col-sm-4 form-d">
                <label className="control-label">Operation Unit</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  // label="Operation Unit"
                  type="text"
                  value={_get(data, 'operationUnitId')}
                  disabled
                />
              </div>
              <div className="col-sm-4 form-d form-control-label12">
                <FormControlLabel
                  control={
                    <Checkbox
                    onChange={this.handleCheckBox}
                    id = 'allowWitholdingTax'
                    checked={!(_get(data, 'allowWitholdingTax') == 'false' || _get(data, 'allowWitholdingTax') == false)}
                    />
                  }
                  label="Allow Witholding Tax"
              />
              </div>

              <div className="col-sm-4 form-d form-control-label12">
                <FormControlLabel
                  control={
                    <Checkbox
                    onChange={this.handleCheckBox}
                    id ='taxReportableOnState'
                    checked={_get(data, 'taxReportableOnState')}
                    />
                  }
                label="Tax Reportable On State"
              />
              </div>

              <div className="col-sm-4 form-d form-control-label12">
                <FormControlLabel
                  control={
                    <Checkbox
                    onChange={this.handleCheckBox}
                    id = 'taxReportableOnFederal'
                    checked={_get(data, 'taxReportableOnFederal')}
                    />
                  }
                  label="Tax Reportable On Federal"
              />
              </div>

              <div className="col-sm-4 form-d form-control-label12">
                <FormControlLabel
                  control={
                    <Checkbox
                    onChange={this.handleCheckBox}
                    id ='invoiceWitholdingTaxGrp'
                    checked={_get(data, 'invoiceWitholdingTaxGrp')}
                    />
                  }
                label="Invoice Witholding Tax Group"
              />
              </div>

              <div className="col-sm-4 form-d form-control-label12">
                <FormControlLabel
                  control={
                    <Checkbox
                    onChange={this.handleCheckBox}
                    id = 'paymentWitholdingTaxGrp'
                    checked={_get(data, 'paymentWitholdingTaxGrp')}
                    />
                  }
                  label="Payment Witholding Tax Group"
                  style={{ fontSize: '14px' }}
              />
              </div>
            </div>

            <div className="row d-flex">
              <div className="col-sm-4 form-d">
                  <label className="control-label">Tax Payer Id</label>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    // label="Tax Payer Id"
                    type="text"
                    name="taxPayerId"
                    value={_get(data, 'taxPayerId')}
                    onChange={this.handleChange}
                    />
                </div>
            </div>

          </DialogContent>
          <DialogActions className="dialog-footer">
            <Button onClick={this.handleClose} className="btn btn-default" style={{ background: '#585858', fontSize: '14px', color: '#FFF' }} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} className="btn btn-info" style={{ fontSize: '14px' }} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
