import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import withStyles from 'material-ui/styles/withStyles';

const style = {
  position: 'relative',
};

class PositionedSnackbar extends React.Component {
handleClose = () => {
  this.props.handleClose();
};

render() {
  const {
    message, vertical, horizontal, handleClose, open,
  } = this.props;
  return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          classes={'snackbar'}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          style={style}
          message={message}
        />
      </div>
  );
}
}

export default PositionedSnackbar;
