import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import Button from 'react-bootstrap/lib/Button';

class RegisterSuccessContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: undefined,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <div className="reg-success">
          <h1>You have registered successfully !</h1>
          <p><strong>To Explore More .</strong></p>
          <p><Button id="myButton" className="btn btn-primary" href="/login" type="button">Click Here</Button></p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = (state) => {
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSuccessContainer);
