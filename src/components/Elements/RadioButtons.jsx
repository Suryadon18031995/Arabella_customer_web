import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Radio from 'material-ui/Radio/Radio';
import RadioGroup from 'material-ui/Radio/RadioGroup';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import FormControl from 'material-ui/Form/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {

  // handleChange = name => event => this.props.handleChange(name, event.target.value)
  render() {
    const { classes, data = [] } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" required className={classes.formControl}>
          <RadioGroup
            aria-label="gender"
            name={this.props.name}
            className={classes.group}
            value={this.props.value}
            onChange={this.props.handleChange}
          >{
            data.map(d => (
              <FormControlLabel value={d.value} name={this.props.plantationType} control={<Radio style={{color: '#004771'}}/>} label={d.label} disabled={d.disabled} />
            ))
          }
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
