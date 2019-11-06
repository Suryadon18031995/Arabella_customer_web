import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});


function DeleteTooltip(props) {
    const { classes } = props;
    return (
        <span id="tooltip-icon" title={props.title} placement="left">
            <IconButton ariaLabel={props.label} onClick={props.handleClick} >
                <DeleteIcon />
            </IconButton>
        </span>
    );
}

DeleteTooltip.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteTooltip);
