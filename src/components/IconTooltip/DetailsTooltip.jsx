import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DetailIcon from 'material-ui-icons/Dehaze';
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


function SimpleTooltips(props) {
    const { classes, handleClick } = props;
    return (
        <span id="tooltip-icon" title={props.title} placement="left">
            <IconButton aria-label={props.label} onClick={() => props.handleClick()}>
                <DetailIcon />
            </IconButton>
        </span>
    );
}

SimpleTooltips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTooltips);
