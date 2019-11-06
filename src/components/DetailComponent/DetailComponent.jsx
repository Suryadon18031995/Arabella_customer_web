import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import './DetailComponentStyle.css';

export default function DetailComponent(props) {
  return (
    <div className="container">

      <div className="tab-wrapper">
        <div className="panel panel-default " style={{ padding: '50px' }}>
          <Button
            type="submit"
            className="btn btn-info"
            onClick={props.handleAddNewClick}>
            {/* <span className="glyphicon glyphicon-plus-sign"></span> */}
            Click me for data!
            </Button>
          <br />
          <br />
        </div>
        <div className="panel panel-default " style={{ padding: '50px' }}>
          <Button
            type="submit"
            className="btn btn-info"
            onClick={props.handleRedirectClick}>
            Redirect me!
            </Button>
          <br />
          <br />
        </div>
        <div className="panel panel-default " style={{ padding: '50px' }}>
          <Button
            type="submit"
            className="btn btn-info"
            onClick={props.handleBkmClick}>
           BKM List
            </Button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
