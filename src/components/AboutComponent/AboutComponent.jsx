import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default function AboutComponent(props) {
  return (
    <div className="container">
    <div className="panel panel-default " style={{ padding: '50px' }}>
          Hello!
          <br />
          Welcome to data page
        </div>
        <div className="panel panel-default " style={{ padding: '50px' }}>
          {props.supplierList && JSON.stringify(props.supplierList)}
        </div>
      <div className="tab-wrapper">
        <div className="panel panel-default " style={{ padding: '50px' }}>
          <Button
            type="submit"
            className="btn btn-info"
            onClick={props.handleRedirectAboutPage}>
            Redirect me to home!
            </Button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
